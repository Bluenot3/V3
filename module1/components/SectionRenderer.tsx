
import React, { Suspense } from 'react';
import type { ContentItem, Section } from '../types';
import CodeBlock from './CodeBlock';
import MermaidDiagram from './MermaidDiagram';
import SimulatedTerminal from './SimulatedTerminal';

// Lazy-load all interactive components
const AdversarialAttackSimulator = React.lazy(() => import('./interactive/AdversarialAttackSimulator'));
const AgentSystemDesigner = React.lazy(() => import('./interactive/AgentSystemDesigner'));
const AgenticWorkflowViz = React.lazy(() => import('./interactive/AgenticWorkflowViz'));
const AiAlignmentTuner = React.lazy(() => import('./interactive/AiAlignmentTuner'));
const AiEthicsTracker = React.lazy(() => import('./interactive/AiEthicsTracker'));
const AiPaletteSynthesizer = React.lazy(() => import('./interactive/AiPaletteSynthesizer'));
const AiSystemVisualizer = React.lazy(() => import('./interactive/AiSystemVisualizer'));
const AlgorithmVisualizer = React.lazy(() => import('./interactive/AlgorithmVisualizer'));
const AmbientArchitect = React.lazy(() => import('./interactive/AmbientArchitect'));
const ApiKeyChatSimulator = React.lazy(() => import('./interactive/ApiKeyChatSimulator'));
const ArchitectureBuilderSandbox = React.lazy(() => import('./interactive/ArchitectureBuilderSandbox'));
const AudioVisualSyncLab = React.lazy(() => import('./interactive/AudioVisualSyncLab'));
const BeginnerImageGen = React.lazy(() => import('./interactive/BeginnerImageGen'));
const BenefitSorter = React.lazy(() => import('./interactive/BenefitSorter'));
const BlockchainExplorer = React.lazy(() => import('./interactive/BlockchainExplorer'));
const BusinessModelCanvas = React.lazy(() => import('./interactive/BusinessModelCanvas'));
const CinematicPromptSequencer = React.lazy(() => import('./interactive/CinematicPromptSequencer'));
const CodeDebugger = React.lazy(() => import('./interactive/CodeDebugger'));
const CompositorCanvasPro = React.lazy(() => import('./interactive/CompositorCanvasPro'));
const ContextWindowExplorer = React.lazy(() => import('./interactive/ContextWindowExplorer'));
const CourseConceptMatrix = React.lazy(() => import('./interactive/CourseConceptMatrix'));
const DataDecisionFlowchartBuilder = React.lazy(() => import('./interactive/DataDecisionFlowchartBuilder'));
const DataVisualizer = React.lazy(() => import('./interactive/DataVisualizer'));
const DiffusionFieldExplorer = React.lazy(() => import('./interactive/DiffusionFieldExplorer'));
const DockerCommandQuiz = React.lazy(() => import('./interactive/DockerCommandQuiz'));
const DreamspaceConstructor = React.lazy(() => import('./interactive/DreamspaceConstructor'));
const EmotionBlendMixer = React.lazy(() => import('./interactive/EmotionBlendMixer'));
const EnergyCarbonTracker = React.lazy(() => import('./interactive/EnergyCarbonTracker'));
const EthicalBiasMirror = React.lazy(() => import('./interactive/EthicalBiasMirror'));
const EthicalDilemmaSimulator = React.lazy(() => import('./interactive/EthicalDilemmaSimulator'));
const EthicalStyleInspector = React.lazy(() => import('./interactive/EthicalStyleInspector'));
const ExplainabilityPanel = React.lazy(() => import('./interactive/ExplainabilityPanel'));
const FeatureExplorer = React.lazy(() => import('./interactive/FeatureExplorer'));
const FundingPulseTicker = React.lazy(() => import('./interactive/FundingPulseTicker'));
const FutureScenarioPoll = React.lazy(() => import('./interactive/FutureScenarioPoll'));
const GenerativeSculptor3D = React.lazy(() => import('./interactive/GenerativeSculptor3D'));
const GestureAnimator = React.lazy(() => import('./interactive/GestureAnimator'));
const HeroIntro = React.lazy(() => import('./interactive/HeroIntro'));
const HomeschoolKitRoadmap = React.lazy(() => import('./interactive/HomeschoolKitRoadmap'));
const ImagePromptEnhancer = React.lazy(() => import('./interactive/ImagePromptEnhancer'));
const InteractiveChatbot = React.lazy(() => import('./interactive/InteractiveChatbot'));
const InteractiveDebates = React.lazy(() => import('./interactive/InteractiveDebates'));
const JobImpactSimulator = React.lazy(() => import('./interactive/JobImpactSimulator'));
const LangGraphVisualizer = React.lazy(() => import('./interactive/LangGraphVisualizer'));
const LightingPhysicsLab = React.lazy(() => import('./interactive/LightingPhysicsLab'));
const LivePatentRadar = React.lazy(() => import('./interactive/LivePatentRadar'));
const LossLandscapeNavigator = React.lazy(() => import('./interactive/LossLandscapeNavigator'));
const MeetingSummarizer = React.lazy(() => import('./interactive/MeetingSummarizer'));
const MelodyMakerAI = React.lazy(() => import('./interactive/MelodyMakerAI'));
const MemoryDecayLab = React.lazy(() => import('./interactive/MemoryDecayLab'));
const ModelArmsRaceTimeline = React.lazy(() => import('./interactive/ModelArmsRaceTimeline'));
const ModelExplorer = React.lazy(() => import('./interactive/ModelExplorer'));
const MotionPhysicsPlayground = React.lazy(() => import('./interactive/MotionPhysicsPlayground'));
const MultiAgentChatSandbox = React.lazy(() => import('./interactive/MultiAgentChatSandbox'));
const NeuralEvolutionChronicle = React.lazy(() => import('./interactive/NeuralEvolutionChronicle'));
const NeuralNetworkPlayground = React.lazy(() => import('./interactive/NeuralNetworkPlayground'));
const ParadigmShiftExplorer = React.lazy(() => import('./interactive/ParadigmShiftExplorer'));
const ParameterUniverseExplorer = React.lazy(() => import('./interactive/ParameterUniverseExplorer'));
const PatternGenomeSynthesizer = React.lazy(() => import('./interactive/PatternGenomeSynthesizer'));
const PedagogyMatcher = React.lazy(() => import('./interactive/PedagogyMatcher'));
const PersonalizationSimulator = React.lazy(() => import('./interactive/PersonalizationSimulator'));
const PhysicsPainter = React.lazy(() => import('./interactive/PhysicsPainter'));
const PitchBuilder = React.lazy(() => import('./interactive/PitchBuilder'));
const PoeticFusionGenerator = React.lazy(() => import('./interactive/PoeticFusionGenerator'));
const PrivacyLensDashboard = React.lazy(() => import('./interactive/PrivacyLensDashboard'));
const ProbabilitySelector = React.lazy(() => import('./interactive/ProbabilitySelector'));
const ProfessionalEmailWriter = React.lazy(() => import('./interactive/ProfessionalEmailWriter'));
const PromptArchitectWorkbench = React.lazy(() => import('./interactive/PromptArchitectWorkbench'));
const PromptInjectionGame = React.lazy(() => import('./interactive/PromptInjectionGame'));
const PromptMutationStudio = React.lazy(() => import('./interactive/PromptMutationStudio'));
const RagBuilder = React.lazy(() => import('./interactive/RagBuilder'));
const RlhfTrainerGame = React.lazy(() => import('./interactive/RlhfTrainerGame'));
const RobotSimulator = React.lazy(() => import('./interactive/RobotSimulator'));
const SceneDirectorXR = React.lazy(() => import('./interactive/SceneDirectorXR'));
const SchedulePlanner = React.lazy(() => import('./interactive/SchedulePlanner'));
const SdgMatcher = React.lazy(() => import('./interactive/SdgMatcher'));
const SensorDataInterpreter = React.lazy(() => import('./interactive/SensorDataInterpreter'));
const SimplePredictiveModel = React.lazy(() => import('./interactive/SimplePredictiveModel'));
const SmartContractEventListener = React.lazy(() => import('./interactive/SmartContractEventListener'));
const SoundfieldComposer = React.lazy(() => import('./interactive/SoundfieldComposer'));
const SpatialNarrativeEngine = React.lazy(() => import('./interactive/SpatialNarrativeEngine'));
const SpeechEmotionAnalyzer = React.lazy(() => import('./interactive/SpeechEmotionAnalyzer'));
const StoryboardForgePlus = React.lazy(() => import('./interactive/StoryboardForgePlus'));
const TextToAppGenerator = React.lazy(() => import('./interactive/TextToAppGenerator'));
const TextureAlchemyLab = React.lazy(() => import('./interactive/TextureAlchemyLab'));
const TokenEconomySimulator = React.lazy(() => import('./interactive/TokenEconomySimulator'));
const TokenVisualizer = React.lazy(() => import('./interactive/TokenVisualizer'));
const UiFeedback = React.lazy(() => import('./interactive/UiFeedback'));
const VoiceDrivenEditingDesk = React.lazy(() => import('./interactive/VoiceDrivenEditingDesk'));
const VoiceMorphStudio = React.lazy(() => import('./interactive/VoiceMorphStudio'));
const VocabularyLockIn = React.lazy(() => import('./interactive/VocabularyLockIn'));
const MasteryCheckGate = React.lazy(() => import('./interactive/MasteryCheckGate'));
const TemperaturePlayground = React.lazy(() => import('./interactive/TemperaturePlayground'));
const TokenReceiptPrinter = React.lazy(() => import('./interactive/TokenReceiptPrinter'));
const JsonSurgeon = React.lazy(() => import('./interactive/JsonSurgeon'));
const MiniAgentSimulator = React.lazy(() => import('./interactive/MiniAgentSimulator'));
const SemanticSearchLab = React.lazy(() => import('./interactive/SemanticSearchLab'));
const ApproachDecisionTree = React.lazy(() => import('./interactive/ApproachDecisionTree'));
const RedTeamBot = React.lazy(() => import('./interactive/RedTeamBot'));
const PromptUnitTester = React.lazy(() => import('./interactive/PromptUnitTester'));
const ModelPickerLab = React.lazy(() => import('./interactive/ModelPickerLab'));
const CredentialMintPreview = React.lazy(() => import('./interactive/CredentialMintPreview'));

const componentMap: { [key: string]: React.LazyExoticComponent<React.FC<any>> } = {
    AdversarialAttackSimulator,
    AgentSystemDesigner,
    AgenticWorkflowViz,
    AiAlignmentTuner,
    AiEthicsTracker,
    AiPaletteSynthesizer,
    AiSystemVisualizer,
    AlgorithmVisualizer,
    AmbientArchitect,
    ApiKeyChatSimulator,
    ArchitectureBuilderSandbox,
    AudioVisualSyncLab,
    BeginnerImageGen,
    BenefitSorter,
    BlockchainExplorer,
    BusinessModelCanvas,
    CinematicPromptSequencer,
    CodeDebugger,
    CompositorCanvasPro,
    ContextWindowExplorer,
    CourseConceptMatrix,
    DataDecisionFlowchartBuilder,
    DataVisualizer,
    DiffusionFieldExplorer,
    DockerCommandQuiz,
    DreamspaceConstructor,
    EmotionBlendMixer,
    EnergyCarbonTracker,
    EthicalBiasMirror,
    EthicalDilemmaSimulator,
    EthicalStyleInspector,
    ExplainabilityPanel,
    FeatureExplorer,
    FundingPulseTicker,
    FutureScenarioPoll,
    GenerativeSculptor3D,
    GestureAnimator,
    HeroIntro,
    HomeschoolKitRoadmap,
    ImagePromptEnhancer,
    InteractiveChatbot,
    InteractiveDebates,
    JobImpactSimulator,
    LangGraphVisualizer,
    LightingPhysicsLab,
    LivePatentRadar,
    LossLandscapeNavigator,
    MeetingSummarizer,
    MelodyMakerAI,
    MemoryDecayLab,
    ModelArmsRaceTimeline,
    ModelExplorer,
    MotionPhysicsPlayground,
    MultiAgentChatSandbox,
    NeuralEvolutionChronicle,
    NeuralNetworkPlayground,
    ParadigmShiftExplorer,
    ParameterUniverseExplorer,
    PatternGenomeSynthesizer,
    PedagogyMatcher,
    PersonalizationSimulator,
    PhysicsPainter,
    PitchBuilder,
    PoeticFusionGenerator,
    PrivacyLensDashboard,
    ProbabilitySelector,
    ProfessionalEmailWriter,
    PromptArchitectWorkbench,
    PromptInjectionGame,
    PromptMutationStudio,
    RagBuilder,
    RlhfTrainerGame,
    RobotSimulator,
    SceneDirectorXR,
    SchedulePlanner,
    SdgMatcher,
    SensorDataInterpreter,
    SimplePredictiveModel,
    SmartContractEventListener,
    SoundfieldComposer,
    SpatialNarrativeEngine,
    SpeechEmotionAnalyzer,
    StoryboardForgePlus,
    TextToAppGenerator,
    TextureAlchemyLab,
    TokenEconomySimulator,
    TokenVisualizer,
    UiFeedback,
    VoiceDrivenEditingDesk,
    VoiceMorphStudio,
    VocabularyLockIn,
    MasteryCheckGate,
    TemperaturePlayground,
    TokenReceiptPrinter,
    JsonSurgeon,
    MiniAgentSimulator,
    SemanticSearchLab,
    ApproachDecisionTree,
    RedTeamBot,
    PromptUnitTester,
    ModelPickerLab,
    CredentialMintPreview,
};

interface SectionRendererProps {
    item: ContentItem;
    section: Section;
    itemIndex: number;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ item, section, itemIndex }) => {
    const animationStyle = { animationDelay: `${400 + itemIndex * 100}ms`, opacity: 0 } as React.CSSProperties;

    switch (item.type) {
        case 'paragraph':
            return <p className="mb-6 text-lg text-brand-text-light leading-relaxed animate-slide-in-up" style={animationStyle}>{item.content}</p>;
        case 'heading':
            return <h3 className="text-xl md:text-2xl font-bold text-brand-text mb-4 mt-8 animate-slide-in-up" style={animationStyle}>{item.content}</h3>;
        case 'quote':
            return <blockquote className="border-l-4 border-brand-primary pl-4 my-6 text-xl italic text-brand-text-light animate-slide-in-up" style={animationStyle}>{item.content}</blockquote>;
        case 'list':
            if (Array.isArray(item.content)) {
                return (
                    <ul className="list-disc list-inside mb-6 pl-4 text-lg text-brand-text-light space-y-2">
                        {item.content.map((li, i) =>
                            <li
                                key={i}
                                className="animate-slide-in-up"
                                style={{ animationDelay: `${400 + itemIndex * 100 + (i * 75)}ms`, opacity: 0 }}
                            >
                                {li}
                            </li>
                        )}
                    </ul>
                );
            }
            return null;
        case 'code':
            return (
                <div className="my-6 animate-slide-in-up" style={animationStyle}>
                    <CodeBlock code={item.content as string} language={item.language || 'javascript'} />
                </div>
            );
        case 'terminal':
            return <div className="animate-slide-in-up" style={animationStyle}><SimulatedTerminal
                code={item.content as string}
                language={item.language || 'bash'}
                output={item.output || ''}
                effectId={item.effectId}
                onRunCustomEffect={item.onRunCustomEffect}
            /></div>;
        case 'mermaid':
            return <div className="animate-slide-in-up" style={animationStyle}><MermaidDiagram chart={item.content as string} /></div>;
        case 'image':
            return <img src={item.content as string} alt={item.alt || ''} className="my-6 rounded-lg shadow-neumorphic-out animate-slide-in-up" style={animationStyle} />;
        case 'interactive':
            if (item.component) {
                const InteractiveComponent = componentMap[item.component];
                if (InteractiveComponent) {
                    return (
                        <div className="animate-slide-in-up" style={animationStyle}>
                            <Suspense fallback={<div className="text-center p-8">Loading Interactive...</div>}>
                                <InteractiveComponent interactiveId={item.interactiveId || section.id} />
                            </Suspense>
                        </div>
                    );
                }
            }
            return <div className="text-red-500 my-8 p-6 bg-red-100 rounded-lg">Error: Interactive component "{item.component}" not found.</div>;
        default:
            return null;
    }
};

export default SectionRenderer;
