import 'dotenv/config';
import cors from 'cors';
import crypto from 'crypto';
import express from 'express';
import fs from 'fs';
import path from 'path';
import Stripe from 'stripe';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.API_PORT || 3001);
const ENTITLEMENTS_FILE = path.join(__dirname, 'entitlements.json');

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const adminSessions = new Map();

const AZURE_AI_ENDPOINT = process.env.AZURE_AI_ENDPOINT || '';
const AZURE_AI_KEY = process.env.AZURE_AI_KEY || '';
const AZURE_AI_MODEL = process.env.AZURE_AI_MODEL || 'Kimi-K2.5';
const AZURE_API_VERSION = process.env.AZURE_AI_API_VERSION || '2024-12-01-preview';

function loadEntitlements() {
    try {
        if (!fs.existsSync(ENTITLEMENTS_FILE)) {
            return {};
        }

        return JSON.parse(fs.readFileSync(ENTITLEMENTS_FILE, 'utf8'));
    } catch (error) {
        console.error('Failed to load entitlements:', error);
        return {};
    }
}

function saveEntitlements(data) {
    try {
        fs.writeFileSync(ENTITLEMENTS_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Failed to save entitlements:', error);
    }
}

function generateSessionToken() {
    return crypto.randomBytes(32).toString('hex');
}

function getAllowedOrigins() {
    const configuredOrigins = (process.env.CORS_ORIGINS || '')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);

    if (configuredOrigins.length > 0) {
        return configuredOrigins;
    }

    return [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:4173',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:4173',
    ];
}

function isAdminBypassConfigured() {
    return Boolean(process.env.ADMIN_BYPASS_USERNAME && process.env.ADMIN_BYPASS_PASSWORD);
}

function requireStripe(res) {
    if (stripe) {
        return true;
    }

    res.status(503).json({
        error: 'Stripe is not configured on the server.',
    });

    return false;
}

async function createAzureChatCompletion(messages, temperature = 0.7, maxTokens = 2048) {
    if (!AZURE_AI_ENDPOINT || !AZURE_AI_KEY) {
        throw new Error('Azure AI is not configured on the server.');
    }

    const baseEndpoint = AZURE_AI_ENDPOINT.replace(/\/$/, '');
    const url = `${baseEndpoint}/openai/deployments/${AZURE_AI_MODEL}/chat/completions?api-version=${AZURE_API_VERSION}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': AZURE_AI_KEY,
        },
        body: JSON.stringify({
            messages,
            temperature,
            max_tokens: maxTokens,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || `Azure AI request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
}

app.use(cors({
    origin(origin, callback) {
        const allowedOrigins = getAllowedOrigins();

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error('Origin not allowed by CORS.'));
    },
    credentials: true,
}));

app.use((req, res, next) => {
    if (req.path === '/api/stripe/webhook') {
        next();
        return;
    }

    express.json({ limit: '1mb' })(req, res, next);
});

app.post('/api/admin/bypass', (req, res) => {
    if (!isAdminBypassConfigured()) {
        res.status(503).json({
            success: false,
            error: 'Admin bypass is not configured on the server.',
        });
        return;
    }

    const { username, password, userEmail } = req.body;
    const validUsername = process.env.ADMIN_BYPASS_USERNAME;
    const validPassword = process.env.ADMIN_BYPASS_PASSWORD;

    if (username === validUsername && password === validPassword) {
        const token = generateSessionToken();

        adminSessions.set(token, {
            userEmail,
            isAdmin: true,
            createdAt: Date.now(),
            expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        console.log(`Admin bypass granted for ${userEmail}`);
        res.json({
            success: true,
            is_admin: true,
            token,
        });
        return;
    }

    console.warn(`Admin bypass denied for ${userEmail}`);
    res.status(401).json({
        success: false,
        error: 'Invalid admin credentials.',
    });
});

app.get('/api/billing/status', (req, res) => {
    const userEmail = req.query.email;
    const adminToken = req.query.token;

    if (!userEmail || typeof userEmail !== 'string') {
        res.status(400).json({ error: 'Email required.' });
        return;
    }

    let isAdmin = false;

    if (typeof adminToken === 'string' && adminSessions.has(adminToken)) {
        const session = adminSessions.get(adminToken);

        if (session.expiresAt > Date.now()) {
            isAdmin = true;
        } else {
            adminSessions.delete(adminToken);
        }
    }

    const entitlements = loadEntitlements();
    const entitled = entitlements[userEmail]?.entitled === true;

    res.json({
        entitled,
        is_admin: isAdmin,
        email: userEmail,
    });
});

app.post('/api/stripe/create-checkout-session', async (req, res) => {
    if (!requireStripe(res)) {
        return;
    }

    const { userEmail } = req.body;

    if (!userEmail) {
        res.status(400).json({ error: 'Email required.' });
        return;
    }

    if (!process.env.STRIPE_PRICE_ID) {
        res.status(503).json({ error: 'STRIPE_PRICE_ID is not configured.' });
        return;
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            customer_email: userEmail,
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            success_url: `${req.headers.origin || 'http://localhost:5173'}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin || 'http://localhost:5173'}/paywall?canceled=true`,
            metadata: { userEmail },
        });

        console.log(`Checkout session created for ${userEmail}`);
        res.json({ url: session.url, sessionId: session.id });
    } catch (error) {
        console.error('Stripe checkout error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post(
    '/api/stripe/webhook',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
        if (!requireStripe(res)) {
            return;
        }

        const signature = req.headers['stripe-signature'];
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!webhookSecret) {
            res.status(503).send('Stripe webhook secret is not configured.');
            return;
        }

        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
        } catch (error) {
            console.error('Webhook signature verification failed:', error.message);
            res.status(400).send(`Webhook Error: ${error.message}`);
            return;
        }

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const userEmail = session.customer_email || session.metadata?.userEmail;

                if (userEmail) {
                    const entitlements = loadEntitlements();
                    entitlements[userEmail] = {
                        entitled: true,
                        stripeCustomerId: session.customer,
                        subscriptionId: session.subscription,
                        grantedAt: new Date().toISOString(),
                    };
                    saveEntitlements(entitlements);
                    console.log(`Entitlement granted for ${userEmail}`);
                }
                break;
            }

            case 'customer.subscription.deleted':
            case 'customer.subscription.updated': {
                const subscription = event.data.object;
                const entitlements = loadEntitlements();

                for (const [email, data] of Object.entries(entitlements)) {
                    if (data.subscriptionId === subscription.id) {
                        entitlements[email].entitled = subscription.status === 'active';
                        saveEntitlements(entitlements);
                        console.log(`Subscription ${subscription.status} for ${email}`);
                        break;
                    }
                }
                break;
            }

            default:
                console.log(`Unhandled Stripe event: ${event.type}`);
        }

        res.json({ received: true });
    },
);

app.post('/api/ai/generate', async (req, res) => {
    const { messages, temperature, maxTokens } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: 'messages must be a non-empty array.' });
        return;
    }

    try {
        const text = await createAzureChatCompletion(messages, temperature, maxTokens);
        res.json({ text });
    } catch (error) {
        console.error('AI generation error:', error);
        res.status(503).json({ error: error.message });
    }
});

app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        features: {
            stripe: Boolean(stripe),
            adminBypass: isAdminBypassConfigured(),
            aiProxy: Boolean(AZURE_AI_ENDPOINT && AZURE_AI_KEY),
        },
    });
});

app.listen(PORT, () => {
    console.log(`ZEN Vanguard API server listening on http://localhost:${PORT}`);
});
