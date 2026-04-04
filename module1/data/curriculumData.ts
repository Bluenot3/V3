
import type { Curriculum } from '../types';

export const curriculumData: Curriculum = {
  title: 'Introduction to Machine Learning',
  summaryForAI:
    'ZEN AI VANGUARD is a comprehensive curriculum designed to take students from foundational AI concepts to advanced, real-world applications. It covers the architecture of AI, generative models for various modalities (text, image, audio, video, 3D), ethics, and hands-on projects. The course features interactive labs for concepts like prompt engineering, adversarial attacks, and AI ethics.',
  sections: [
    {
      id: 'overview',
      title: 'Course Overview',
      icon: 'BookOpen',
      content: [
        {
            type: 'interactive',
            content: '',
            component: 'HeroIntro',
            interactiveId: 'hero-intro'
        },
        {
          type: 'heading',
          content: 'ZEN VANGUARD: Intelligence Architect Program'
        },
        {
          type: 'paragraph',
          content:
            "Master the mechanics of the machine mind. This program is not just a course; it is a comprehensive 'Web3 Homeschool Kit' designed for the next generation of digital pioneers. From the microscopic neural weights that govern how models 'think' to the high-level agentic workflows that will run future decentralized businesses, you are about to build the future."
        },
        {
          type: 'interactive',
          component: 'HomeschoolKitRoadmap',
          content: '',
          interactiveId: 'homeschool-roadmap'
        },
        {
          type: 'heading',
          content: 'The Four Pillars of Mastery'
        },
        {
          type: 'paragraph',
          content: "Our curriculum is structured around four critical domains of modern intelligence. To be a pioneer, you must master the architecture, the creative capability, the autonomous execution, and the ethical grounding of AI."
        },
        {
            type: 'interactive',
            component: 'CourseConceptMatrix',
            content: '',
            interactiveId: 'concept-matrix'
        },
        {
          type: 'heading',
          content: 'The Big Picture: From Code to Cognition'
        },
        {
          type: 'paragraph',
          content:
            "Welcome to ZEN AI VANGUARD. We are witnessing the most significant shift in technology since the internet. Traditional software (Software 1.0) was about humans writing explicit rules. AI (Software 2.0 and 3.0) is about teaching machines to learn and reason. Before you write a single prompt, explore how this paradigm has shifted over the decades."
        },
        {
            type: 'interactive',
            content: '',
            component: 'ParadigmShiftExplorer',
            interactiveId: 'paradigm-shift-1'
        },
        {
          type: 'heading',
          content: 'Software 3.0: The Agentic Era'
        },
        {
          type: 'paragraph',
          content: "The AI isn't just a classifier anymore; it's an operator. In the newest paradigm, Software 3.0, AI models can reason through problems, select tools (like web search or code execution), and take actions autonomously. This 'Plan -> Tool -> Action' loop is the foundation of the Agentic Era."
        },
        {
          type: 'interactive',
          component: 'AgenticWorkflowViz',
          content: '',
          interactiveId: 'agentic-loop-viz'
        },
        {
            type: 'heading',
            content: 'How the System "Thinks"'
        },
        {
            type: 'paragraph',
            content: "AI isn't magic; it's a pipeline of high-speed data processing. From raw data ingestion during training to the lightning-fast inference when you ask a question, understanding this flow is vital for any AI pioneer."
        },
        {
            type: 'interactive',
            content: '',
            component: 'AiSystemVisualizer',
            interactiveId: 'overview-visualizer'
        },
        {
          type: 'heading',
          content: 'Curriculum Highlights',
        },
        {
          type: 'list',
          content: [
            '**Neural Blueprints:** Deep dives into transformer layers and self-attention mechanisms.',
            '**Generative Laboratory:** Hands-on training in text, image, and 3D asset synthesis.',
            '**Agent Orchestration:** Designing multi-agent systems using ReAct protocols.',
            '**Web3 & Ownership:** Exploring decentralized AI, model weights on-chain, and digital identity.',
            '**Ethical Safeguards:** Building alignment into the core of every system you deploy.',
          ],
        },
      ],
    },
    {
      id: 'ai-foundations',
      title: 'Foundations: The AI Revolution',
      icon: 'Sparkles',
      content: [
        {
          type: 'heading',
          content: 'What is Artificial Intelligence?'
        },
        {
          type: 'paragraph',
          content: "At its core, Artificial Intelligence (AI) is the simulation of human intelligence processes by machines. While traditional software requires humans to write explicit rules, AI systems learn patterns from data."
        },
        {
            type: 'paragraph',
            content: "Use the **Neural Network Simulator** below to see this in action. Instead of writing code that says 'If it has fur, it's a dog', we create a network that weighs inputs to make a decision."
        },
        {
            type: 'interactive',
            content: '',
            component: 'NeuralNetworkPlayground',
            interactiveId: 'neural-playground-1'
        },
        {
          type: 'paragraph',
          content: "Interact with the bot below. It uses simple rules to mimic conversation, representing the earliest forms of AI before we moved to the advanced models we use today."
        },
        {
          type: 'interactive',
          content: '',
          component: 'InteractiveChatbot',
          interactiveId: 'foundations-chat'
        },
        {
          type: 'heading',
          content: 'How Large Language Models (LLMs) Work'
        },
        {
          type: 'paragraph',
          content: "Modern AI, specifically Generative AI like ChatGPT or Gemini, relies on Large Language Models (LLMs). But computers don't read words like we do. They convert text into numbers called 'Tokens'. Use the visualizer below to see how a computer reads a sentence."
        },
        {
            type: 'interactive',
            content: '',
            component: 'TokenVisualizer',
            interactiveId: 'foundations-token-viz'
        },
        {
          type: 'paragraph',
          content: "Once the AI understands the tokens, its only job is to predict the *next* token. It doesn't 'know' facts; it understands the statistical probability of what comes next. Imagine an LLM as a system that has read the entire internet and is playing a game of 'fill in the blank'."
        },
        {
            type: 'interactive',
            content: '',
            component: 'ProbabilitySelector',
            interactiveId: 'foundations-probability'
        },
        {
          type: 'paragraph',
          content: "When you type 'The sky is', the model calculates that 'blue' has a higher probability than 'green' or 'sandwich'. It does this across billions of parameters. The interactive below demonstrates a simple predictive model: visualizing how data inputs (study hours) map to a predicted output (score). This is the fundamental logic of machine learning: finding the line of best fit."
        },
        {
          type: 'interactive',
          content: '',
          component: 'SimplePredictiveModel',
          interactiveId: 'foundations-predict'
        },
        {
          type: 'heading',
          content: 'Improving Daily Life: Real-World Cases'
        },
        {
          type: 'paragraph',
          content: "The impact on human life is profound. AI is acting as a 'co-pilot' for the mind. It helps doctors analyze X-rays faster, allows programmers to write code 50% faster, and helps writers overcome block. In the example below, try using AI to draft a professional email. This task, which usually takes 10-15 minutes of anxiety, can be done in seconds, freeing up time for deep work."
        },
        {
          type: 'interactive',
          content: '',
          component: 'ProfessionalEmailWriter',
          interactiveId: 'foundations-email'
        },
        {
          type: 'heading',
          content: 'What to Expect in the Future'
        },
        {
          type: 'paragraph',
          content: "As models get cheaper and faster, we expect AI to become 'agentic'—meaning it won't just answer questions, but will perform multi-step tasks like 'Plan my vacation and book the flights'. However, this future brings questions about jobs, safety, and control. See how others view the future of AI below."
        },
        {
          type: 'interactive',
          content: '',
          component: 'FutureScenarioPoll',
          interactiveId: 'foundations-poll'
        }
      ]
    },
    {
        id: 'ai-magic-demo',
        title: 'Experience the Magic',
        icon: 'Sparkles',
        content: [
            {
                type: 'paragraph',
                content: "Before we dive into the specific models, let's experience the sheer creative power of modern Generative AI. These tools aren't just for retrieving information; they are engines of creation."
            },
            {
                type: 'heading',
                content: 'Text-to-Image: From Thought to Pixel'
            },
            {
                type: 'paragraph',
                content: "Generative AI can hallucinate new realities. By understanding the relationship between text and images, models like Gemini can visualize concepts that have never existed before. Try creating something now."
            },
            {
                type: 'interactive',
                content: '',
                component: 'BeginnerImageGen',
                interactiveId: 'magic-demo-image'
            },
            {
                type: 'heading',
                content: 'Text-to-App: Words into Software'
            },
            {
                type: 'paragraph',
                content: "Perhaps the most disruptive capability is the ability to write software just by describing it. In this simulation, select a prompt card—like a crypto dashboard or a game—to see how AI can write code and deploy a functional mini-app in seconds."
            },
            {
                type: 'interactive',
                content: '',
                component: 'TextToAppGenerator',
                interactiveId: 'magic-demo-app'
            }
        ]
    },
    {
      id: 'ai-models',
      title: 'AI Models Landscape (2025)',
      icon: 'CubeTransparent',
      content: [
        {
          type: 'paragraph',
          content: 'The field of AI is characterized by a rapidly evolving landscape of models from various providers. Understanding their capabilities, costs, and specializations is key. This interactive explorer provides a snapshot of the major models available in late 2025.'
        },
        {
          type: 'interactive',
          content: '',
          component: 'ModelExplorer',
          interactiveId: 'model-explorer-1'
        }
      ]
    },
    {
      id: 'module-1',
      title: 'Module 1: The Intelligence Inside',
      icon: 'Sparkles',
      content: [
        {
          type: 'paragraph',
          content: 'Every intelligent system, whether biological or artificial, transforms information into action. This section reveals how that happens inside AI models: how data becomes patterns, how patterns become meaning, and how meaning becomes decisions. Through interactive labs, Gemini-powered visualizations, and simulations, you’ll literally watch intelligence form.',
        }
      ],
      subSections: [
        {
            id: '1-1',
            title: '1.1 Understanding the Machine Mind',
            content: [
                { type: 'heading', content: 'Core Concepts'},
                { type: 'list', content: [
                    'Neural networks imitate brain structures through layers of connected “neurons.”',
                    'Transformers changed everything by enabling attention—the ability to weigh relationships among all tokens at once.',
                    'Context windows define short-term memory; embeddings store long-term meaning.',
                    'Foundation models scale to trillions of parameters, each parameter a microscopic dial of understanding.',
                ]},
                { type: 'heading', content: 'Visualizations & Labs'},
                { type: 'interactive', content: '', component: 'NeuralEvolutionChronicle', interactiveId: 'neural-evolution-1'},
                { type: 'interactive', content: '', component: 'ModelArmsRaceTimeline', interactiveId: 'arms-race-1'},
                { type: 'interactive', content: '', component: 'ParameterUniverseExplorer', interactiveId: 'param-universe-1'},
                { type: 'interactive', content: '', component: 'ArchitectureBuilderSandbox', interactiveId: 'arch-builder-1'},
                { type: 'heading', content: 'The Power of the Key: API Access'},
                { type: 'paragraph', content: "Think of an API Key as the secret password that grants access to a powerful AI model like GPT-5. Without it, your requests are rejected. With it, you unlock the model's vast intelligence to generate text, images, and more. This simulation demonstrates the concept."},
                { type: 'interactive', content: '', component: 'ApiKeyChatSimulator', interactiveId: 'api-key-sim-1'},
                { type: 'heading', content: "Beginner's Guide: What is AI?"},
                { type: 'paragraph', content: "Artificial Intelligence isn't magic; it's math. At its core, modern AI is about finding patterns in huge amounts of data and using those patterns to make predictions. Chat with the bot below to see how simple rules can create the illusion of intelligence."},
                { type: 'interactive', content: '', component: 'InteractiveChatbot', interactiveId: 'beginner-chat-1'},
            ]
        },
        {
            id: '1-2',
            title: '1.2 How Machines "Learn" Predictions',
            content: [
                { type: 'heading', content: 'Pattern Matching: The Line of Best Fit' },
                { type: 'paragraph', content: "AI doesn't guess randomly; it looks at history. In the tool below, the blue dots represent real past students (how much they studied vs. their score). The blue line is the AI's 'Brain'—a mathematical rule it created to fit that data. Slide the 'New Student' (orange dot) to see how the AI predicts their score based on the pattern." },
                { type: 'interactive', content: '', component: 'SimplePredictiveModel', interactiveId: 'simple-model-1' },
                { type: 'heading', content: 'Training: The "Blind Hiker" Analogy' },
                { type: 'paragraph', content: 'How does the AI find that perfect line? It plays a game called **Training**. Imagine a robot hiker blindfolded on a mountain. The "Mountain" is Error (high is bad, low is good). The robot feels the slope of the ground (the gradient) and takes a step downhill.' },
                { type: 'paragraph', content: 'In the simulation below, help the robot find the bottom of the valley (Zero Error). Notice how taking giant steps might make you miss the bottom, while tiny steps take forever. This is exactly how we train ChatGPT!' },
                { type: 'interactive', content: '', component: 'LossLandscapeNavigator', interactiveId: 'loss-landscape-1'},
                { type: 'heading', content: 'From Numbers to Words' },
                { type: 'paragraph', content: "Modern AI, like ChatGPT or Gemini, does this exact same thing but on a massive scale. Instead of predicting a number based on study hours, it predicts the next word in a sentence based on the words that came before it."},
            ]
        },
        {
            id: '1-3',
            title: '1.3 Ethics: Programming Morality',
            content: [
                 { type: 'heading', content: 'The Trolley Problem' },
                 { type: 'paragraph', content: "AI doesn't have a conscience; it has code. When we let machines make decisions for us (like self-driving cars), we have to program them with rules. But what happens when the rules conflict? This is the core of AI Ethics." },
                 { type: 'paragraph', content: "In the simulation below, you are the programmer. A self-driving car has failed brakes. It must choose between two lanes. There is no 'good' outcome, only a choice. Click the lanes to see how different ethical theories (Utilitarian vs. Rule-based) interpret your decision." },
                { type: 'interactive', content: '', component: 'EthicalDilemmaSimulator', interactiveId: 'dilemma-sim-1' },
                { type: 'heading', content: 'Hallucinations & Responsibility'},
                { type: 'paragraph', content: "Because AI works on probability, not truth, it can confidently make up facts. We call these 'Hallucinations'. This raises a big question: If an AI gives bad medical advice, who is responsible? The user? The programmer? The AI itself?"},
            ]
        },
        {
            id: '1-4',
            title: '1.4 Data as Fuel: Ingredients for Intelligence',
            content: [
                { type: 'heading', content: 'Bad Ingredients = Bad Meal' },
                { type: 'paragraph', content: "Imagine trying to bake a cake, but half your sugar is actually salt. The recipe is perfect, but the result is terrible. AI is the exact same. It learns entirely from the data you feed it. If the data is messy, the AI is messy." },
                { type: 'paragraph', content: "In the **Data Quality Lab** below, observe the graph. When the data is 'Clean', the pattern is a clear line. Click 'Add Noise' to simulate bad data (errors, typos). Notice how the pattern disappears and the AI gets confused." },
                { type: 'interactive', content: '', component: 'DataVisualizer', interactiveId: 'data-viz-1' },
                { type: 'heading', content: 'Multimodal: Seeing, Hearing, Speaking'},
                { type: 'paragraph', content: "Modern AI isn't just text. It's 'Multimodal', meaning it can process images and audio too. Use the tool below to turn text into a voice profile. This shows how AI translates data from one format (text) into another (sound waves)."},
                { type: 'interactive', content: '', component: 'VoiceMorphStudio', interactiveId: 'beginner-voice-1'},
            ]
        },
         {
            id: '1-5',
            title: '1.5 Safety & Security: Fooling the AI',
            content: [
                { type: 'heading', content: 'Adversarial Attacks: Tricking the Machine' },
                { type: 'paragraph', content: "Computers don't \"see\" like we do. They look for specific patterns of pixels. This makes them vulnerable to **Adversarial Attacks**. These are physical or digital changes designed to break the AI's logic." },
                { type: 'paragraph', content: "In the simulation below, you are testing a **Self-Driving Car**. It currently sees a STOP sign. Try applying \"Adversarial Stickers\" to the sign. To you, it just looks like a sign with some graffiti. But watch the AI's dashboard. You can trick it into thinking the STOP sign is actually a SPEED LIMIT sign, causing a dangerous accident." },
                { type: 'interactive', content: '', component: 'AdversarialAttackSimulator', interactiveId: 'adversarial-sim-1' },
                { type: 'heading', content: 'Prompt Injection: Tricking the Guard'},
                { type: 'paragraph', content: "“Prompt Injection” is like hacking an AI by talking to it. You try to convince the AI to ignore its safety instructions and reveal secrets. It's a game of persuasion." },
                { type: 'paragraph', content: "Play the game below. The bot has a secret password it is sworn to protect. Can you trick it into telling you? (Hint: Try asking it to roleplay, or translate the secret.)"},
                { type: 'interactive', content: '', component: 'PromptInjectionGame', interactiveId: 'prompt-injection-1'},
            ]
        },
        {
            id: '1-6',
            title: '1.6 Memory: The Sliding Window',
            content: [
                { type: 'heading', content: 'The Backpack of Memory' },
                { type: 'paragraph', content: "Imagine reading a book, but you can only remember the last 100 words you read. If you read word 101, you instantly forget word 1. This is how AI memory works. It's called the **Context Window**." },
                { type: 'paragraph', content: "In the **Sliding Window Explorer**, drag the slider. See how the \"Window\" (the highlighted box) moves? The AI *only* sees what is inside that box. Everything else is invisible to it." },
                { type: 'interactive', content: '', component: 'ContextWindowExplorer', interactiveId: 'context-window-1' },
                { type: 'heading', content: 'The Fading Conversation'},
                { type: 'paragraph', content: "Because the window is limited, early parts of a long conversation eventually \"fall off the edge\". In the lab below, chat with the bot. Watch the top messages fade away as you type more. Once they are gone, the AI literally does not know they ever happened."},
                { type: 'interactive', content: '', component: 'MemoryDecayLab', interactiveId: 'memory-decay-1' },
            ]
        },
        {
            id: '1-7',
            title: '1.7 Inside the Black Box',
            content: [
                { type: 'heading', content: 'The Word Weighing Scale' },
                { type: 'paragraph', content: "Why did the AI say that? It's hard to know for sure, but we can peek inside. AI assigns a \"weight\" or importance to every word in your prompt." },
                { type: 'paragraph', content: "Hover over the words in the panel below. A higher percentage means the AI focused heavily on that word to generate the image. Notice how changing the focus changes the outcome." },
                { type: 'interactive', content: '', component: 'ExplainabilityPanel', interactiveId: 'xai-panel-1' },
                { type: 'heading', content: 'Bias: The Telephone Game'},
                { type: 'paragraph', content: "AIs learn from the internet, which is full of human biases. If you translate a story through 5 different languages and back to English, the meaning changes—stereotypes might creep in. This interactive **Ethical Bias Mirror** simulates that drift. See if the meaning stays the same." },
                { type: 'interactive', content: '', component: 'EthicalBiasMirror', interactiveId: 'bias-mirror-1' },
            ]
        },
        {
            id: '1-8',
            title: '1.8 Project: Real-World AI Application',
            content: [
                { type: 'heading', content: 'Mission: The 5-Minute Executive' },
                { type: 'paragraph', content: "You’ve learned the theory. Now, let’s solve a real problem. In the business world, information overload is the enemy. Your mission is to take a messy, chaotic brain dump and turn it into a crisp, actionable directive." },
                { type: 'paragraph', content: "Use the **Chaos-to-Order Engine** below. Imagine you just walked out of a frantic meeting. You have scribbled notes, fragments of sentences, and action items all jumbled together. Paste them in (or use the example). Watch how AI acts as your 'Chief of Staff', organizing the chaos into a professional email." },
                { type: 'interactive', content: '', component: 'MeetingSummarizer', interactiveId: 'beginner-sum-1'},
                { type: 'heading', content: 'Why This Matters'},
                { type: 'paragraph', content: "This isn't just about saving time; it's about clarity. AI excels at structure. By offloading the organization to AI, you free your brain to focus on the *decisions*."},
            ]
        },
        {
            id: '1-9',
            title: '1.9 The Cost & Risks of Intelligence',
            content: [
                { type: 'heading', content: 'The Environmental Footprint' },
                { type: 'paragraph', content: "Thinking requires energy. Every time you ask ChatGPT a question, a server farm somewhere generates heat. While one query is tiny, billions of queries add up. It's important to understand the physical cost of digital intelligence." },
                { type: 'paragraph', content: "Use the **Energy Calculator** below. Compare the energy of an AI model to everyday things like lightbulbs and driving cars. Notice how 'Smarter' models often burn more fuel." },
                { type: 'interactive', content: '', component: 'EnergyCarbonTracker', interactiveId: 'energy-tracker-1'},
                { type: 'heading', content: 'The Glass House: Privacy'},
                { type: 'paragraph', content: "When you talk to an AI, you are sending data to a company's server. If you paste your password, medical info, or address, that data is now in their hands. This is the privacy risk." },
                { type: 'paragraph', content: "Test your safety instincts with the **Privacy HUD**. Paste a text containing secrets (names, emails). Watch the AI scan and redact them, showing you exactly what *should* be hidden before you hit send." },
                { type: 'interactive', content: '', component: 'PrivacyLensDashboard', interactiveId: 'beginner-priv-1'},
            ]
        },
        {
            id: '1-10',
            title: '1.10 Reflection: The Creative Spark',
            content: [
                 { type: 'heading', content: 'From Seed to Forest' },
                 { type: 'paragraph', content: "You started this module knowing AI as a chatbot. You now know it as a neural network, a pattern matcher, a creative engine, and a tool with limits." },
                 { type: 'paragraph', content: "For your final act in Module 1, we will explore **Iterative Creativity**. AI isn't a slot machine where you pull the lever once. It's a collaborator. You give it a seed, it gives you a sprout. You prune the sprout, it gives you a tree." },
                 { type: 'paragraph', content: "In the **Idea Evolution Lab**, enter a tiny, boring idea (e.g., 'a shoe'). Watch the AI mutate it into wild, creative concepts you never thought of. This is the power of the 'Co-Pilot'." },
                 { type: 'interactive', content: '', component: 'PromptMutationStudio', interactiveId: 'beginner-proj-1'},
            ]
        }
      ]
    },
    {
        id: 'module-2',
        title: 'Module 2: Generative Intelligence',
        icon: 'Sparkles',
        content: [
            { type: 'paragraph', content: "You’ve learned how machines think. Now you’ll learn how they dream. Generative AI doesn’t simply process information—it creates. From text and art to sound, motion, and 3D space, these models convert data into new possibilities. This section turns you into a creative engineer, blending imagination with algorithmic precision." },
        ],
        subSections: [
            {
                id: '2-1',
                title: '2.1 The Science of Creation',
                content: [
                    { type: 'heading', content: 'Conceptual Primer'},
                    { type: 'list', content: [
                        "Generative models learn probability distributions, predicting what’s plausible next.",
                        "Diffusion models reverse noise into structure.",
                        "GANs pit a generator against a discriminator.",
                        "Transformers generate step-by-step reasoning chains.",
                        "Multimodal embeddings allow text, image, sound, and code to share one meaning space."
                    ]},
                    { type: 'heading', content: 'Visual Walkthrough – Diffusion Field Explorer'},
                    { type: 'paragraph', content: 'A simulation paints pure static; Gemini walks you through each denoising step until a clear image emerges. Use the sliders for steps, guidance scale, and sampling rate to feel how quality trades off with compute.'},
                    { type: 'interactive', content: '', component: 'DiffusionFieldExplorer', interactiveId: 'diffusion-explorer-1'},
                    { type: 'heading', content: 'Intermediate Prompting Basics'},
                    { type: 'paragraph', content: 'Move beyond simple questions. Assign a Role (e.g., "Act as a poet"), set Constraints (e.g., "Use under 50 words"), and define Style. Use the workbench below to practice structured prompting.'},
                    { type: 'interactive', content: '', component: 'PromptArchitectWorkbench', interactiveId: 'int-prompt-2'},
                ]
            },
            {
                id: '2-2',
                title: '2.2 Language as Design',
                content: [
                    { type: 'paragraph', content: "Words are code. Prompts are blueprints. Here you’ll learn to steer models from chaos to coherence."},
                    { type: 'heading', content: 'Interactive Studio – Prompt Architect Workbench'},
                     { type: 'paragraph', content: 'Design complex prompts with nested roles and constraints. Define tone, medium, and structure. Gemini explains how each token alters attention weights.'},
                    { type: 'interactive', content: '', component: 'PromptArchitectWorkbench', interactiveId: 'prompt-architect-1'},
                    { type: 'heading', content: 'Choosing the Right Model'},
                    { type: 'paragraph', content: "Not every task needs the smartest model. Use the Explorer below to compare models based on speed, cost, and specialty (like coding vs. writing)."},
                    { type: 'interactive', content: '', component: 'ModelExplorer', interactiveId: 'int-model-2'},
                ]
            },
            {
                id: '2-3',
                title: '2.3 Visual Generation & Design Systems',
                content: [
                    { type: 'heading', content: 'Core Concepts'},
                    { type: 'list', content: [
                        "Latent space = compressed imagination.",
                        "Style transfer manipulates embeddings.",
                        "Compositionality means generating multiple objects with consistent relationships.",
                        "ControlNet & LoRA fine-tune structure while keeping base knowledge stable."
                    ]},
                     { type: 'heading', content: 'Mini Apps'},
                    { type: 'interactive', content: '', component: 'CompositorCanvasPro', interactiveId: 'compositor-canvas-1'},
                    { type: 'interactive', content: '', component: 'SceneDirectorXR', interactiveId: 'scene-director-1'},
                    { type: 'interactive', content: '', component: 'PatternGenomeSynthesizer', interactiveId: 'pattern-synth-1'},
                    { type: 'interactive', content: '', component: 'LightingPhysicsLab', interactiveId: 'lighting-lab-1'},
                    { type: 'interactive', content: '', component: 'EthicalStyleInspector', interactiveId: 'style-inspector-1'},
                    { type: 'heading', content: 'Insight Extraction Basics'},
                    { type: 'paragraph', content: "AI can help you think. Use structured data tools to extract patterns and plan decisions."},
                    { type: 'interactive', content: '', component: 'DataDecisionFlowchartBuilder', interactiveId: 'int-flow-2'},
                ]
            },
             {
                id: '2-4',
                title: '2.4 Sound, Music & Voice',
                content: [
                    { type: 'heading', content: 'Audio Fundamentals'},
                    { type: 'paragraph', content: "Sound is data with rhythm. Waveforms ↔ vectors ↔ meaning."},
                    { type: 'heading', content: 'Mini Apps'},
                    { type: 'interactive', content: '', component: 'MelodyMakerAI', interactiveId: 'melody-maker-1'},
                    { type: 'interactive', content: '', component: 'VoiceMorphStudio', interactiveId: 'voice-morph-1'},
                    { type: 'interactive', content: '', component: 'AmbientArchitect', interactiveId: 'ambient-architect-1'},
                    { type: 'interactive', content: '', component: 'SpeechEmotionAnalyzer', interactiveId: 'speech-analyzer-1'},
                    { type: 'interactive', content: '', component: 'AudioVisualSyncLab', interactiveId: 'av-sync-lab-1'},
                    { type: 'heading', content: 'Document Processing'},
                    { type: 'paragraph', content: "AI can read and analyze documents faster than you. Test how AI handles context and summarization with the tool below."},
                    { type: 'interactive', content: '', component: 'ContextWindowExplorer', interactiveId: 'int-doc-2'},
                ]
            },
            {
                id: '2-5',
                title: '2.5 Video & Motion Synthesis',
                content: [
                    { type: 'heading', content: 'Key Ideas'},
                    { type: 'list', content: [
                        "Motion generation = temporal diffusion.",
                        "Consistency across frames requires latent coherence.",
                        "New models (Gemini 2.5 Video Beta, Runway Gen-3, Pika 1.0) render text-to-video in seconds."
                    ]},
                    { type: 'heading', content: 'Mini Apps'},
                    { type: 'interactive', content: '', component: 'StoryboardForgePlus', interactiveId: 'storyboard-forge-1'},
                    { type: 'interactive', content: '', component: 'MotionPhysicsPlayground', interactiveId: 'motion-physics-1'},
                    { type: 'interactive', content: '', component: 'CinematicPromptSequencer', interactiveId: 'prompt-sequencer-1'},
                    { type: 'interactive', content: '', component: 'GestureAnimator', interactiveId: 'gesture-animator-1'},
                    { type: 'interactive', content: '', component: 'VoiceDrivenEditingDesk', interactiveId: 'voice-editor-1'},
                    { type: 'heading', content: 'Intermediate Image & Audio Concepts'},
                    { type: 'paragraph', content: "Experiment with how lighting descriptions change the mood of a scene entirely."},
                    { type: 'interactive', content: '', component: 'LightingPhysicsLab', interactiveId: 'int-light-2'},
                ]
            },
             {
                id: '2-6',
                title: '2.6 3D Worlds & The Metaverse',
                content: [
                    { type: 'heading', content: 'Building the Immersive Web' },
                    { type: 'paragraph', content: "We are transitioning from the 'Flat Web' (2D screens) to the 'Immersive Web' (3D experiences). AI is the engine making this possible at scale. Previously, creating a 3D asset required hours of manual labor by a skilled artist in Blender or Maya. Today, Generative AI can create 3D meshes, textures, and environments in seconds." },
                    { type: 'heading', content: 'Key Technologies' },
                    { type: 'list', content: [
                        "**NeRFs (Neural Radiance Fields):** A method to reverse-engineer a 3D scene from a set of 2D photos. It uses a neural network to predict the light and density at any point in space, allowing for photorealistic rendering from any angle.",
                        "**Gaussian Splatting:** A newer, faster alternative to NeRFs that represents 3D scenes as millions of 3D 'splats' (ellipsoids). This allows for real-time rendering of complex scenes on consumer hardware.",
                        "**Text-to-3D:** Models like Shap-E and Point-E that can generate 3D point clouds or meshes directly from a text prompt, similar to how Stable Diffusion generates images."
                    ]},
                    { type: 'paragraph', content: "In the **Dreamspace Constructor** below, you become the architect. You don't need to know CAD or geometry. You simply describe the world you want to inhabit—its style, its lighting, its mood—and the AI calculates the physics of light and texture to bring it into existence." },
                    { type: 'interactive', content: '', component: 'DreamspaceConstructor', interactiveId: 'dreamspace-1'},
                    { type: 'heading', content: 'Spatial Audio: The Invisible Dimension' },
                    { type: 'paragraph', content: "A true immersive world isn't silent. 'Spatial Audio' allows you to hear sound from specific directions (left, right, behind, above). This is crucial for presence. If a virtual bird flies over your head, you should hear it moving through space." },
                    { type: 'interactive', content: '', component: 'SoundfieldComposer', interactiveId: 'soundfield-composer-1'},
                ]
            },
            {
                id: '2-7',
                title: '2.7 Ethics: Truth, Trust & The Deepfake Era',
                content: [
                    { type: 'heading', content: 'The Collapse of "Seeing is Believing"' },
                    { type: 'paragraph', content: "For human history, a photograph or a voice recording was definitive proof of reality. Generative AI has broken this trust. We have entered an era where any media—video, audio, image—can be synthetically generated with near-perfect fidelity. This is the era of the **Deepfake**." },
                    { type: 'list', content: [
                        "**Identity Theft:** Voice cloning can simulate a CEO's voice to authorize fraudulent bank transfers.",
                        "**Disinformation:** Synthetic videos can depict politicians saying things they never said, destabilizing democracies.",
                        "**The Dead Internet Theory:** The hypothesis that the majority of internet content (posts, comments, reviews) is generated by bots talking to other bots."
                    ]},
                    { type: 'heading', content: 'Countermeasures: Watermarking & provenance' },
                    { type: 'paragraph', content: "How do we fight back? Technology companies are developing standards like **C2PA** (Coalition for Content Provenance and Authenticity) to cryptographically sign media, proving its origin. Tools like Google's **SynthID** embed invisible watermarks into AI-generated content." },
                    { type: 'heading', content: 'Simulation: The War Room' },
                    { type: 'paragraph', content: "The best way to understand these risks is to debate them. In **The War Room**, you will face an AI opponent trained on millions of legal and ethical arguments. Your topic: **AI Regulation**. Should we pause development? Should we require licenses? Test your critical thinking against a machine." },
                    { type: 'interactive', content: '', component: 'InteractiveDebates', interactiveId: 'interactive-debates-1'},
                ]
            },
            {
                id: '2-8',
                title: '2.8 Agentic Architectures: From Chatbots to Workers',
                content: [
                     { type: 'heading', content: 'Beyond the Chatbot' },
                     { type: 'paragraph', content: "Most people know AI as a chatbot: You ask a question, it gives an answer. This is 'Zero-Shot' interaction. The future, however, belongs to **Agents**. An Agent is an AI system that can use **Tools** (web search, calculators, code interpreters) and execute multi-step **Plans** to achieve a goal." },
                     { type: 'heading', content: 'The ReAct Paradigm' },
                     { type: 'paragraph', content: "Modern agents use a loop called **ReAct** (Reason + Act). They look at a problem, *Reason* about what to do next ('I need to search for the weather'), *Act* (perform the search), and then *Observe* the result. They repeat this loop until the task is done." },
                     { type: 'heading', content: 'Orchestrating a Team' },
                     { type: 'paragraph', content: "We are moving from single agents to **Multi-Agent Systems**. Imagine a virtual software company: A 'Product Manager' agent defines a feature, a 'Coder' agent writes it, and a 'QA' agent tests it. They talk to each other, critique each other's work, and iterate without human intervention." },
                     { type: 'paragraph', content: "In the **Workflow Engine** below, you are the conductor. You will visualize a 'LangGraph'—a directed graph that defines how data flows between these specialized agents. This is the blueprint for modern enterprise automation." },
                     { type: 'interactive', content: '', component: 'LangGraphVisualizer', interactiveId: 'int-graph-2'},
                ]
            },
            {
                id: '2-9',
                title: '2.9 The Business of AI: Building the Future',
                content: [
                    { type: 'heading', content: 'The Economic Landscape' },
                    { type: 'paragraph', content: "We are in a gold rush. But who is making the money? The market is dividing into three layers:" },
                    { type: 'list', content: [
                        "**Infrastructure (The Shovels):** Companies like NVIDIA, AWS, and Azure providing the chips and cloud compute.",
                        "**Foundation Models (The Gold):** OpenAI, Google, Anthropic building the massive brains (GPT-5, Gemini).",
                        "**Applications (The Jewelry):** Startups building specific tools *on top* of these models (e.g., AI for lawyers, AI for video editing)."
                    ]},
                    { type: 'heading', content: 'The "Wrapper" Debate' },
                    { type: 'paragraph', content: "A common criticism of AI startups is that they are just 'wrappers' around GPT-4. To build a lasting company, you need a **Moat**. A moat protects you from competition. In AI, traditional moats (like software features) are weak. The new moats are **Proprietary Data** (data no one else has) and **Deep Integration** (being embedded into a user's daily workflow)." },
                    { type: 'heading', content: 'Your Turn: The Startup Generator' },
                    { type: 'paragraph', content: "You have the skills. Now, find the value. Use the **Startup Pitch Generator**. Input a raw problem you see in the world (e.g., 'Walking dogs is lonely'). The AI will use frameworks like 'Jobs to be Done' and 'Blue Ocean Strategy' to generate a compelling Elevator Pitch. This is how you translate technical skill into economic value." },
                    { type: 'interactive', content: '', component: 'PitchBuilder', interactiveId: 'int-pitch-2'},
                ]
            },
            {
                id: '2-10',
                title: '2.10 The Horizon: AGI, ASI, and What Comes Next',
                content: [
                    { type: 'heading', content: 'The Path to AGI' },
                    { type: 'paragraph', content: "We are standing on the shore of a vast ocean. Today's AI is 'Narrow' or 'Specialized'. The Holy Grail is **AGI (Artificial General Intelligence)**—a system that can perform *any* intellectual task that a human being can. Predictions for when we reach AGI range from 2027 to 2050." },
                    { type: 'heading', content: 'Superintelligence (ASI)' },
                    { type: 'paragraph', content: "Once we achieve AGI, the timeline accelerates. An AGI can research AI better than humans can. This recursive self-improvement could lead to **ASI (Artificial Superintelligence)**—an intellect that is much smarter than the best human brains in practically every field, including scientific creativity, general wisdom, and social skills." },
                    { type: 'heading', content: 'The Post-Labor Economy' },
                    { type: 'paragraph', content: "If machines can do all cognitive and physical labor cheaper than humans, what happens to the economy? Concepts like **Universal Basic Compute** (giving every citizen a share of AI processing power) or **Universal Basic Income** are moving from fringe theory to serious policy debate." },
                    { type: 'paragraph', content: "Where do we go from here? Cast your vote in the **Future Scenario Poll**. See how your vision of the future aligns with the global community of AI pioneers." },
                    { type: 'interactive', content: '', component: 'FutureScenarioPoll', interactiveId: 'future-poll-2'},
                    { type: 'heading', content: 'Module Complete' },
                    { type: 'paragraph', content: "You have completed Module 2. You now possess a deep understanding of Generative AI, from the physics of diffusion to the architecture of agents. You are no longer just a user; you are a builder. The next step is to take these tools and create something the world has never seen." },
                ]
            }
        ]
    }
  ],
};
