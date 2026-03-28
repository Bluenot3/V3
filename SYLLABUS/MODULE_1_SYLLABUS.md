# MODULE 1: Foundations of Machine Intelligence

## ZEN VANGUARD — Intelligence Architect Program

### Module Objective

By the end of this module, a learner will be able to:

- Explain what a machine learning model is in precise technical language
- Describe training vs. inference
- Define tokens, parameters, embeddings, attention, and context window
- Explain how gradient descent updates model weights
- Identify hallucinations and alignment risks
- Understand what an API key does and why authentication exists
- Be cognitively ready to build with APIs in the next module

No mysticism. No marketing fog. Just systems clarity.

---

## ZEN Core Terminology

A glossary of ~30 foundational terms used throughout this module and the entire program.

### Foundations

| Term | Definition |
|---|---|
| **AI (Artificial Intelligence)** | A system that performs tasks requiring pattern recognition, decision-making, or prediction. |
| **ML (Machine Learning)** | A subset of AI where models learn patterns from data instead of being explicitly programmed with rules. |
| **Model** | A mathematical function that maps inputs to outputs using learned parameters. |
| **Dataset** | A structured collection of labeled or unlabeled data used to train a model. |
| **Label** | The known correct answer for a training example (e.g., "cat" for a cat image). |
| **Feature** | An individual measurable property of data used as input to a model. |
| **Generalization** | A model's ability to make accurate predictions on data it has never seen. |
| **Overfitting** | When a model memorizes training data and fails to generalize to new inputs. |
| **Loss** | A mathematical measure of prediction error — how wrong the model is. |
| **Gradient Descent** | An optimization algorithm that adjusts parameters to reduce loss. |

### LLM Core

| Term | Definition |
|---|---|
| **Token** | A numerical representation of a word or word fragment processed by the model. |
| **Context Window** | The maximum number of tokens the model can process at once — its working memory. |
| **Attention (Self-Attention)** | The mechanism that lets each token evaluate its relevance relative to every other token in context. |
| **Transformer** | The breakthrough neural network architecture behind modern LLMs, based on self-attention. |
| **Embedding** | A dense numerical vector representing semantic meaning in a shared mathematical space. |
| **Parameter** | A numerical weight that adjusts how strongly input signals influence output. |
| **Inference** | The process of generating output from a trained model (as opposed to training it). |
| **Hallucination** | Confident but incorrect output generated from probabilistic modeling. |

### Steering & Outputs

| Term | Definition |
|---|---|
| **System Prompt** | A hidden instruction that sets the model's role, tone, and boundaries before user interaction. |
| **Temperature** | A parameter controlling output randomness. Low = deterministic, high = creative/unpredictable. |
| **Top-p (Nucleus Sampling)** | A sampling method that picks from the smallest set of tokens whose cumulative probability exceeds p. |
| **Max Tokens** | The maximum number of tokens the model will generate in a single response. |
| **Stop Sequence** | A string that signals the model to stop generating output. |
| **Structured Output** | Model output constrained to a specific format like JSON, CSV, or XML. |
| **Schema** | A formal definition of expected data structure, types, and constraints. |

### Systems & Ops

| Term | Definition |
|---|---|
| **API (Application Programming Interface)** | A structured way to send requests to a system and receive responses. |
| **Endpoint** | The URL where API requests are sent. |
| **Authentication (Auth)** | The process of verifying identity before granting access. An API key is the most common credential. |
| **Secret** | Any sensitive credential (API key, password, token) that must never be exposed in code. |
| **Rate Limit** | A cap on the number of API requests allowed per time window. |
| **Latency** | The time delay between sending a request and receiving a response. |
| **Eval** | A systematic test measuring model output quality against defined criteria. |
| **Regression Testing** | Running previous tests after a change to ensure nothing broke. |

### Security

| Term | Definition |
|---|---|
| **Prompt Injection** | Malicious instruction hidden in user input attempting to override system rules. |
| **Data Leakage** | Unintentional exposure of sensitive information through model outputs or logs. |
| **Redaction** | Removing or masking sensitive information from text before processing. |
| **Least Privilege** | Granting only the minimum permissions required to perform a task. |
| **Rotation** | Periodically replacing credentials (API keys) to limit exposure from leaks. |

### Web3 Bridge

| Term | Definition |
|---|---|
| **Verifiable Credential (VC)** | A tamper-proof digital claim about a subject, issued by a trusted authority. |
| **Claim** | A statement about a subject (e.g., "Alex completed Module 1"). |
| **Issuer** | The entity that creates and signs a verifiable credential. |
| **Evidence Hash** | A cryptographic fingerprint of an artifact proving completion or achievement. |
| **Anchor** | An optional on-chain record that timestamps and verifies the credential. |

---

## Course Overview

### ZEN VANGUARD: Intelligence Architect Program

This program takes you inside the machine mind — from the numerical weights that shape every AI response to the autonomous workflows already transforming industries. You will learn how AI systems actually work, build functional prototypes, and develop the judgment to deploy them responsibly.

### The Four Pillars of Mastery

The curriculum is structured around four domains that define modern AI competence: understanding the architecture (how systems are built), creative capability (what they can generate), autonomous execution (how they act independently), and ethical grounding (how to deploy them responsibly).

### The Big Picture: From Code to Cognition

Software has gone through three fundamental shifts — and each one changed what 'programming' means. **Software 1.0** (1950–2012): Humans write explicit rules, computers follow them exactly. **Software 2.0** (2012–2023): Humans provide examples, computers discover patterns. **Software 3.0** (2024+): Humans set goals, computers reason, plan, and act.

### Software 3.0: The Agentic Era

In Software 3.0, AI systems don't just answer questions — they operate. They reason through multi-step problems, select the right tools, execute actions, evaluate the results, and adjust their approach. This Reason → Act → Observe loop is what makes AI 'agentic.'

### How the System "Thinks"

Every AI response follows a pipeline: raw data is ingested during training, patterns are compressed into numerical weights, and when you ask a question, the model runs inference — calculating the most probable output in milliseconds.

---

## Foundations: The AI Revolution

### What is Artificial Intelligence?

Artificial Intelligence is software that learns patterns from data instead of following hand-written rules. A neural network is a mathematical structure loosely inspired by the brain — layers of simple units ('neurons') connected by numerical weights.

### How Large Language Models (LLMs) Work

Your text is broken into tokens, passed through billions of mathematical weights, and processed to predict the most probable next token. The model doesn't 'understand' language — it calculates statistical relationships between tokens at enormous scale.

*Interactive: NeuralNetworkPlayground, TokenVisualizer, ProbabilitySelector, SimplePredictiveModel*

---

## AI Models Landscape (2025)

*Interactive: ModelExplorer*

---

## Module 1: The Intelligence Inside

Every intelligent system transforms information into action. This section reveals how that happens inside AI models: how data becomes patterns, how patterns become meaning, and how meaning becomes decisions. Through interactive labs, model-powered visualizations, and simulations, you'll literally watch intelligence form.

---

### 1.1 Understanding the Machine Mind

#### Core Concepts
- Neural networks are mathematical structures organized in layers — each layer extracts progressively more abstract features from input data.
- Transformers revolutionized AI by introducing self-attention — the ability to weigh the importance of every word relative to every other word, all at once.
- Context windows are the model's working memory. Embeddings are its long-term memory — compressed numerical representations of meaning.
- Foundation models contain billions of parameters. Each parameter is a numerical weight that collectively determines how the model interprets input and generates output.

#### Visualizations & Labs
*Interactive: NeuralEvolutionChronicle, ModelArmsRaceTimeline, ParameterUniverseExplorer, ArchitectureBuilderSandbox*

#### The Power of the Key: API Access
An API key is a credential — like a building access card — that authenticates your requests to an AI model's server.

*Interactive: ApiKeyChatSimulator*

#### How AI Actually Works
At its foundation, modern AI is applied statistics at enormous scale. The model finds patterns in training data and uses those patterns to make predictions.

*Interactive: InteractiveChatbot*

#### 🔒 Vocabulary Lock-In — Section 1.1

| Term | Plain Meaning | What It Controls | How It Appears in APIs/Tools Later |
|---|---|---|---|
| **Parameters** | Weights — numerical dials | Controls model behavior and capability | Impacts cost per token, model selection |
| **Context Window** | Working memory | Controls max prompt size | `max_tokens`, truncation behavior |
| **Embeddings** | Meaning vectors | Enables semantic search/memory | Embedding endpoints, vector databases |
| **Foundation Model** | Pre-trained base | Determines baseline capability | Model name in API calls (e.g., `gpt-4o`) |

---

### 1.2 How Machines "Learn" Predictions

#### Pattern Matching: The Line of Best Fit
At its simplest, machine learning is pattern matching. The model's learned function maps inputs to predicted outputs. This is generalization: applying learned patterns to new situations.

*Interactive: SimplePredictiveModel*

#### Training: Gradient Descent
Training is the process of adjusting a model's parameters to minimize prediction errors. Imagine a blindfolded hiker on a mountain where altitude represents error. The hiker feels the slope (the gradient) and takes a step downhill.

*Interactive: LossLandscapeNavigator*

#### From Numbers to Words
GPT, Claude, and other LLMs do this exact same optimization — on a massive scale. The fundamental principle is identical: minimize error between prediction and reality.

#### 🔒 Vocabulary Lock-In — Section 1.2

| Term | Plain Meaning | What It Controls | How It Appears in APIs/Tools Later |
|---|---|---|---|
| **Loss Function** | Error measurement | Determines training convergence | Eval metrics, fine-tuning logs |
| **Gradient Descent** | Downhill optimization | How fast/well the model learns | Learning rate configuration |
| **Generalization** | Pattern transfer | Whether model works on new data | Test set accuracy, production reliability |
| **Overfitting** | Memorization failure | Model ceases to be useful on real data | Eval regression, unexpected failures |

---

### 1.3 Ethics: Programming Morality

#### The Trolley Problem
AI doesn't have a conscience — it has an objective function. When we let machines make consequential decisions, we encode values into code.

*Interactive: EthicalDilemmaSimulator*

#### Hallucinations & Responsibility
Because AI optimizes for probability rather than truth, it can confidently generate false information — called 'hallucinations.'

#### 🔒 Vocabulary Lock-In — Section 1.3

| Term | Plain Meaning | What It Controls | How It Appears in APIs/Tools Later |
|---|---|---|---|
| **Hallucination** | Confident mistake | Output reliability | Eval criteria, fact-checking pipelines |
| **Alignment** | Value matching | Whether AI does what we intend | RLHF training, safety filters |
| **Objective Function** | Goal definition | What the model optimizes for | Reward model design, fine-tuning targets |

---

### 1.4 Data as Fuel: Ingredients for Intelligence

#### Data Quality: Garbage In, Garbage Out
A model is only as good as its training data. If biased data trains a hiring model, biased outcomes emerge.

*Interactive: DataVisualizer*

#### Multimodal AI: Beyond Text
Modern AI is multimodal — it processes text, images, audio, and video through shared mathematical representations. Everything becomes numbers. Meaning becomes geometry.

*Interactive: VoiceMorphStudio*

#### 🔒 Vocabulary Lock-In — Section 1.4

| Term | Plain Meaning | What It Controls | How It Appears in APIs/Tools Later |
|---|---|---|---|
| **Dataset** | Training material | Model knowledge and biases | Data pipeline, training config |
| **Multimodal** | Multiple data types | What the model can process | `mime_type` in API requests |
| **Embedding Space** | Shared number world | Cross-modal reasoning | Embedding endpoints, similarity search |

---

### 1.5 Safety & Security: Fooling the AI

#### Adversarial Attacks: Tricking the Machine
Small perturbations in input that cause disproportionate output errors. Computers don't "see" like we do — they look for pixel patterns, making them vulnerable.

*Interactive: AdversarialAttackSimulator*

#### Prompt Injection: Tricking the Guard
Malicious instruction hidden in user input attempting to override system rules.

*Interactive: PromptInjectionGame*

#### 🔒 Vocabulary Lock-In — Section 1.5

| Term | Plain Meaning | What It Controls | How It Appears in APIs/Tools Later |
|---|---|---|---|
| **Adversarial Attack** | Deliberate deception | Model reliability under attack | Input validation, safety testing |
| **Prompt Injection** | Hacking by talking | System prompt integrity | System message hardening, guardrails |
| **Alignment** | Value enforcement | Whether the model follows rules | RLHF, constitutional AI, safety layers |

---

### 1.6 Memory: The Sliding Window

#### The Context Window
A context window is the maximum amount of text a model can process at once — its working memory.

*Interactive: ContextWindowExplorer*

#### Memory Decay in Practice
Early messages in a long conversation eventually fall out of the model's working memory. Enterprise AI systems use external memory (databases, vector stores) to supplement the model's limited window.

*Interactive: MemoryDecayLab*

#### 🔒 Vocabulary Lock-In — Section 1.6

| Term | Plain Meaning | What It Controls | How It Appears in APIs/Tools Later |
|---|---|---|---|
| **Context Window** | Working memory size | Max text the model can see | `max_tokens`, model selection |
| **Token Limit** | Memory boundary | When information gets lost | Truncation, summarization strategy |
| **External Memory** | Database supplement | Overcoming context limits | RAG, vector stores (Module 1.15) |

---

### 1.7 Inside the Black Box

#### Attention Weights: What the Model Focuses On
When a model generates a response, it assigns different levels of attention to each token in your input. Understanding this attention distribution is key to effective prompt engineering.

*Interactive: ExplainabilityPanel*

#### Bias: Inherited Prejudice
AI models learn from internet data — which contains every human bias, stereotype, and prejudice.

*Interactive: EthicalBiasMirror*

#### 🔒 Vocabulary Lock-In — Section 1.7

| Term | Plain Meaning | What It Controls | How It Appears in APIs/Tools Later |
|---|---|---|---|
| **Attention Weights** | Focus distribution | What the model prioritizes | Prompt engineering strategy |
| **Bias** | Inherited prejudice | Fairness of outputs | Eval criteria, debiasing techniques |
| **Explainability** | "Why did it say that?" | Trust and debugging | Attention visualization, logprobs |

---

### 1.8 Project: Real-World AI Application

#### Mission: Information to Action
Take a messy, chaotic brain dump and turn it into a crisp, actionable directive using the Chaos-to-Order Engine.

*Interactive: MeetingSummarizer*

---

### 1.9 The Cost & Risks of Intelligence

#### The Environmental Footprint
Training large models consumes enormous energy. Every API call consumes compute, energy, and money.

*Interactive: EnergyCarbonTracker*

#### Privacy: The Data You Didn't Know You Shared
Every prompt you send to an AI model travels to a company's server. If you paste confidential data, that information is now in a third party's infrastructure.

*Interactive: PrivacyLensDashboard*

---

### 1.10 Reflection: The Creative Spark

#### Iterative Creation
AI isn't a slot machine where you pull the lever once. It's an iterative collaborator.

*Interactive: PromptMutationStudio*

#### 🔒 Mastery Check — Section 1.10

**5 Questions** (recall, near-transfer, far-transfer):

1. What is the difference between training and inference?
2. What does gradient descent optimize, and what is the "mountain" analogy?
3. Why do hallucinations occur — what mechanism causes them?
4. What does an API key authenticate, and what happens without one?
5. A client wants to summarize 200-page legal documents. The model's context window is 8K tokens. What architecture would you propose?

**Micro-Build Output:** Convert this freeform prompt into a structured prompt spec:
> "Write me something about dogs for my website"

Expected output: Purpose, Inputs, Output format, Constraints, Tone.

*Interactive: MasteryCheckGate*

---

### 1.11 The Model Control Panel: The Knobs That Change Everything

This section bridges from "what a model is" to "how you steer it."

#### Core Terms
- **Temperature**: Randomness dial. Low (0.0) = deterministic; High (2.0) = chaotic.
- **Top-p / Nucleus Sampling**: Instead of picking from ALL tokens, pick from the smallest set whose cumulative probability exceeds p.
- **Max Output Tokens**: Cap on how many tokens the model will generate.
- **Stop Sequences**: Strings that tell the model "stop generating here."
- **System vs User Messages**: Role separation — system sets rules, user provides the task.
- **Determinism**: When temperature = 0, the same prompt produces the same output.

#### Micro-Lab: "Same Prompt, Different Worlds"
Toggle temperature and top-p side-by-side. Observe output variation, hallucination drift, and tone shifts.

*Interactive: TemperaturePlayground*

#### Build Task (Portfolio)
Create a "ZEN Prompt Spec": Purpose, Inputs, Output format, Safety constraints, Knob settings (temp/top-p/max tokens).

#### Quiz
- What knob increases creativity but also increases risk?
- What's the difference between max input tokens and max output tokens?

---

### 1.12 Tokens as Currency: Budgeting Intelligence

Learners must understand cost mechanics before touching API keys.

#### Core Terms
- **Token (input/output)**: Input tokens are what you send; output tokens are what you receive. Both cost money.
- **Context Length**: The combined budget for input + output tokens.
- **Prompt Bloat**: Unnecessary verbosity that wastes tokens and money.
- **Compression**: Reducing prompt length via summaries without losing constraints.
- **Caching**: Reusing previous computations to avoid redundant API calls.
- **Unit Economics**: Cost per task — what does it cost to summarize one document?

#### Micro-App: "Token Receipt Printer"
Paste text → shows estimated token count, cost bands (cheap/medium/expensive), optimization suggestions.

*Interactive: TokenReceiptPrinter*

#### Build Task
Turn a 500-word prompt into a 120-word prompt without losing constraints.

#### Quiz
- Why do long system prompts get expensive fast?
- Name two ways to reduce token spend without reducing output quality.

---

### 1.13 The Shape of Data: Prompts, JSON, and Structured Outputs

API work is mostly "data in/data out." This section teaches structured I/O.

#### Core Terms
- **Schema**: A formal definition of expected data structure, types, and constraints.
- **JSON**: JavaScript Object Notation — the universal format for API communication.
- **Validation**: Checking whether output conforms to the expected schema.
- **Structured Outputs**: Forcing the model to respond in a specific format.
- **Parsing Failures**: When the model generates malformed data that breaks downstream code.

#### Micro-Lab: "JSON Surgeon"
Model generates JSON. Learner checks for missing fields, wrong types, invalid syntax. Then writes a "repair prompt" to force correct structure.

*Interactive: JsonSurgeon*

#### Build Task
Define a schema for "Meeting Notes → Action Items":
- Fields: `owner`, `action`, `deadline`, `priority`, `dependencies`

#### Quiz
- What is schema validation?
- Why is freeform text dangerous in automation?

---

### 1.14 Tool Use and Agent Loops: Reason → Act → Observe

You already understand the agentic era. Now you operationalize it.

#### Core Terms
- **Tool Calling / Function Calling**: The model selects and invokes external tools (search, calculator, database).
- **Planner vs Executor**: The planner decides what to do; the executor does it.
- **Observation**: The result returned by a tool that informs the next step.
- **Loop Termination**: Conditions that tell the agent to stop (goal reached, max steps, error).
- **Guardrails**: Safety constraints that prevent the agent from taking dangerous actions.

#### Mini-App: "Mini-Agent Simulator"
Given a goal, the agent chooses a tool, gets a result, updates its plan, and stops when done. Shows failure modes: infinite loops, wrong tool selection, overconfidence.

*Interactive: MiniAgentSimulator*

#### Build Task
Design a 3-step agent for "Volunteer Onboarding Checklist":
1. Extract required documents
2. Draft welcome email
3. Produce tracking row fields

#### Quiz
- What prevents an agent from running forever?
- Name one failure mode of tool-using agents.

---

### 1.15 Retrieval and Memory: Embeddings, Vector Search, RAG

This is how you beat context windows and build enterprise-grade systems.

#### Core Terms
- **Embedding**: A dense numerical vector representing meaning.
- **Vector**: A list of numbers that represents a point in mathematical space.
- **Similarity Search**: Finding the most semantically similar items by comparing vector distances.
- **RAG (Retrieval-Augmented Generation)**: Fetching relevant documents and injecting them into the prompt before generation.
- **Chunking**: Splitting large documents into smaller pieces for embedding and retrieval.
- **Grounding**: Anchoring model output in retrieved facts to reduce hallucinations.

#### Micro-Lab: "Find the Clause"
Given a tiny policy document corpus, search by meaning (not keywords). See how semantic search surfaces relevant clauses that keyword search misses.

*Interactive: SemanticSearchLab*

#### Build Task
Create a chunking plan: chunk size, overlap, metadata fields, when to summarize vs retrieve.

---

### 1.16 Fine-Tuning vs Prompting vs RAG: Choosing the Right Weapon

Prevents rookie mistakes ("fine-tune everything!").

#### Core Concepts
- **Prompting** = fastest, most flexible, most fragile
- **RAG** = factual grounding, medium complexity, best for dynamic data
- **Fine-Tuning** = style/behavior lock-in, highest ops cost, best for consistent output

#### Micro-App: "Decision Tree Coach"
User describes a use case → app recommends prompting vs RAG vs fine-tuning and explains why.

*Interactive: ApproachDecisionTree*

#### Build Task
Write 3 use cases and choose the approach with justification.

---

### 1.17 Security Fundamentals: Keys, Secrets, and Threat Models

If you're about to touch API keys, this is mandatory.

#### Core Terms
- **Secret**: Any sensitive credential that must never be exposed.
- **API Key Leakage**: Accidental exposure of credentials in code, logs, or chats.
- **Environment Variables**: Secure storage mechanism for secrets outside source code.
- **Least Privilege**: Granting only the minimum permissions required.
- **Rotation**: Periodically replacing credentials to limit exposure.
- **Logging Redaction**: Automatically masking secrets in system logs.
- **Prompt Injection as Security Issue**: Attackers using crafted prompts to extract secrets or bypass safety.

#### Micro-Lab: "Red Team the Bot (Safely)"
Learner tries prompt injection attempts against a protected instruction set. See what works and what doesn't.

*Interactive: RedTeamBot*

#### Build Task
Create a "ZEN Key Handling Policy (v1)":
- Where keys can be stored
- How to rotate
- What not to paste in chats
- What to log / not log

---

### 1.18 Reliability Engineering: Testing AI Like a System, Not a Toy

Professional deployment posture.

#### Core Terms
- **Eval**: A systematic test measuring model output quality.
- **Regression Test**: Running previous tests after a change to ensure nothing broke.
- **Golden Prompts**: Reference prompts with known-good outputs used as benchmarks.
- **Acceptance Criteria**: Specific, measurable conditions that output must meet.
- **Hallucination Rate**: Percentage of outputs containing fabricated information.
- **Retry Logic**: Automatically resending failed requests with backoff.
- **Fallback Model**: A secondary model used when the primary fails or is too slow.

#### Micro-App: "Prompt Unit Tests"
Run 5 prompts → compare outputs to pass/fail acceptance criteria rules.

*Interactive: PromptUnitTester*

#### Build Task
Write acceptance criteria for: email drafting, policy summarization, classification.

---

### 1.19 Model Selection: Capability, Cost, Latency, Risk

A decision framework for choosing the right model.

#### Core Terms
- **Latency**: Time to first token and total response time.
- **Throughput**: Number of requests a model can handle per second.
- **Context Length**: How much text the model can process.
- **Tool Use**: Whether the model can invoke external functions.
- **Multimodal**: Whether the model handles text, images, audio, video.
- **Safety Filters**: Built-in content moderation and refusal behavior.

#### Micro-Lab: "Pick the Model"
Given a scenario, choose model class (fast/cheap vs deep reasoning) and justify trade-offs.

*Interactive: ModelPickerLab*

#### Build Task
Create a "Model Routing Table" template for ZEN:
- Task type → model tier → fallback → max cost per run

---

### 1.20 Web3 Bridge: Ownership, Credentials, and Proof-of-Learning

Anchors ZEN's differentiator without derailing ML fundamentals.

#### Core Terms
- **Verifiable Credential (VC)**: A tamper-proof digital claim about a subject, issued by a trusted authority.
- **Issuer**: The entity that creates and signs the credential.
- **Claim**: A statement about a subject (e.g., "Alex completed Module 1").
- **Evidence**: Artifact or hash that proves the claim.
- **Hash**: A fixed-length fingerprint computed from arbitrary data.
- **On-Chain Anchor (Optional)**: A blockchain record that timestamps the credential.
- **Privacy Boundary**: What data is public vs what stays private.

#### Micro-App: "Credential Mint Preview"
Learner completes a mini-checkpoint → generates credential JSON, evidence links (artifact hash), skills claimed.

*Interactive: CredentialMintPreview*

#### Build Task (Portfolio)
Produce a "Module 1 Proof-of-Learning" artifact:
- Glossary mastery score
- Prompt spec file
- Key handling policy
- Agent flow diagram

---

### 1.21 Capstone: Build a Non-Key AI System (Simulation-Only)

Get "almost API-ready" without keys by simulating endpoints.

#### Capstone Project: "ZEN Chief-of-Staff (Offline Sim)"

**Inputs:** Messy notes

**Outputs:**
- Email draft
- Action list JSON
- Risks flagged (PII, hallucinations)

**What They Learn:**
- Structured I/O
- Eval + testing
- Cost estimate
- Safety

**Deliverable:**
A single "portfolio bundle" structure:
- `/prompt_specs/`
- `/schemas/`
- `/policies/`
- `/evals/`
- `/outputs/`

---

### 1.22 Module 1 Exit Exam: API-Readiness Gate

Mastery-based progression. No vague answers accepted.

#### Gate Requirements

1. **Define 12 core terms** without fluff (token, parameter, embedding, attention, context window, gradient descent, hallucination, API key, temperature, schema, prompt injection, RAG)
2. **Convert a freeform prompt** into a structured prompt spec (Purpose, Inputs, Output format, Constraints, Knob settings)
3. **Generate valid JSON** output format requirements for a given task
4. **Identify 3 security mistakes** in a sample code snippet (hardcoded key, no rotation, PII in logs)
5. **Choose prompting vs RAG vs fine-tuning** for a scenario and justify the decision

**Passing = Unlock Module 2 (keys + first API call)**

*Interactive: SectionQuiz (quiz-1-exit)*
