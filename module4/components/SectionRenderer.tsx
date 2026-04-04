import React, { Suspense } from 'react';
import type { ContentItem, Section } from '../types';
import CodeBlock from './CodeBlock';
import MermaidDiagram from './MermaidDiagram';
import SimulatedTerminal from './SimulatedTerminal';

// Lazy-load all interactive components
const AdversarialAttackSimulator = React.lazy(() => import('./interactive/AdversarialAttackSimulator'));
const AgentSystemDesigner = React.lazy(() => import('./interactive/AgentSystemDesigner'));
const AiAlignmentTuner = React.lazy(() => import('./interactive/AiAlignmentTuner'));
const AiEthicsTracker = React.lazy(() => import('./interactive/AiEthicsTracker'));
const AiGovernanceCardGenerator = React.lazy(() => import('./interactive/AiGovernanceCardGenerator'));
const AiPaletteSynthesizer = React.lazy(() => import('./interactive/AiPaletteSynthesizer'));
const AiSystemsBlueprintVisualizer = React.lazy(() => import('./interactive/AiSystemsBlueprintVisualizer'));
const AlgorithmVisualizer = React.lazy(() => import('./interactive/AlgorithmVisualizer'));
const AmbientArchitect = React.lazy(() => import('./interactive/AmbientArchitect'));
const ArchitectureBuilderSandbox = React.lazy(() => import('./interactive/ArchitectureBuilderSandbox'));
const AudioVisualSyncLab = React.lazy(() => import('./interactive/AudioVisualSyncLab'));
const BenefitSorter = React.lazy(() => import('./interactive/BenefitSorter'));
const BlockchainExplorer = React.lazy(() => import('./interactive/BlockchainExplorer'));
const BusinessModelCanvas = React.lazy(() => import('./interactive/BusinessModelCanvas'));
const CinematicPromptSequencer = React.lazy(() => import('./interactive/CinematicPromptSequencer'));
const CodeDebugger = React.lazy(() => import('./interactive/CodeDebugger'));
const CompositorCanvasPro = React.lazy(() => import('./interactive/CompositorCanvasPro'));
const ContextWindowExplorer = React.lazy(() => import('./interactive/ContextWindowExplorer'));
const DataDecisionFlowchartBuilder = React.lazy(() => import('./interactive/DataDecisionFlowchartBuilder'));
const DataDriftRiskLens = React.lazy(() => import('./interactive/DataDriftRiskLens'));
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
const MemoryRecallTuner = React.lazy(() => import('./interactive/MemoryRecallTuner'));
const ModelArmsRaceTimeline = React.lazy(() => import('./interactive/ModelArmsRaceTimeline'));
const MotionPhysicsPlayground = React.lazy(() => import('./interactive/MotionPhysicsPlayground'));
const MultiAgentChatSandbox = React.lazy(() => import('./interactive/MultiAgentChatSandbox'));
const NeuralEvolutionChronicle = React.lazy(() => import('./interactive/NeuralEvolutionChronicle'));
const OrbitalHabitatDesigner = React.lazy(() => import('./interactive/OrbitalHabitatDesigner'));
const ParameterUniverseExplorer = React.lazy(() => import('./interactive/ParameterUniverseExplorer'));
const PatternGenomeSynthesizer = React.lazy(() => import('./interactive/PatternGenomeSynthesizer'));
const PedagogyMatcher = React.lazy(() => import('./interactive/PedagogyMatcher'));
const PersonalizationSimulator = React.lazy(() => import('./interactive/PersonalizationSimulator'));
const PhysicsPainter = React.lazy(() => import('./interactive/PhysicsPainter'));
const PitchBuilder = React.lazy(() => import('./interactive/PitchBuilder'));
const PoeticFusionGenerator = React.lazy(() => import('./interactive/PoeticFusionGenerator'));
const PrivacyLensDashboard = React.lazy(() => import('./interactive/PrivacyLensDashboard'));
const ProfessionalEmailWriter = React.lazy(() => import('./interactive/ProfessionalEmailWriter'));
const ProjectSubmission = React.lazy(() => import('./interactive/ProjectSubmission'));
const PromptArchitectWorkbench = React.lazy(() => import('./interactive/PromptArchitectWorkbench'));
const PromptHealthDashboard = React.lazy(() => import('./interactive/PromptHealthDashboard'));
const PromptMutationStudio = React.lazy(() => import('./interactive/PromptMutationStudio'));
const RagBuilder = React.lazy(() => import('./interactive/RagBuilder'));
const RlhfTrainerGame = React.lazy(() => import('./interactive/RlhfTrainerGame'));
const RobotSimulator = React.lazy(() => import('./interactive/RobotSimulator'));
const SceneDirectorXR = React.lazy(() => import('./interactive/SceneDirectorXR'));
const SchedulePlanner = React.lazy(() => import('./interactive/SchedulePlanner'));
const SdgMatcher = React.lazy(() => import('./interactive/SdgMatcher'));
const SensorDataInterpreter = React.lazy(() => import('./interactive/SensorDataInterpreter'));
const SimplePredictiveModel = React.lazy(() => import('./interactive/SimplePredictiveModel'));
const SkytowerArchitect = React.lazy(() => import('./interactive/SkytowerArchitect'));
const SmartContractEventListener = React.lazy(() => import('./interactive/SmartContractEventListener'));
const SoundfieldComposer = React.lazy(() => import('./interactive/SoundfieldComposer'));
const SpatialNarrativeEngine = React.lazy(() => import('./interactive/SpatialNarrativeEngine'));
const SpeechEmotionAnalyzer = React.lazy(() => import('./interactive/SpeechEmotionAnalyzer'));
const StoryboardForgePlus = React.lazy(() => import('./interactive/StoryboardForgePlus'));
const TextureAlchemyLab = React.lazy(() => import('./interactive/TextureAlchemyLab'));
const TokenEconomySimulator = React.lazy(() => import('./interactive/TokenEconomySimulator'));
const UiFeedback = React.lazy(() => import('./interactive/UiFeedback'));
const VoiceDrivenEditingDesk = React.lazy(() => import('./interactive/VoiceDrivenEditingDesk'));
const VoiceMorphStudio = React.lazy(() => import('./interactive/VoiceMorphStudio'));

const componentMap: { [key: string]: React.LazyExoticComponent<React.FC<any>> } = {
    AdversarialAttackSimulator,
    AgentSystemDesigner,
    AiAlignmentTuner,
    AiEthicsTracker,
    AiGovernanceCardGenerator,
    AiPaletteSynthesizer,
    AiSystemsBlueprintVisualizer,
    AlgorithmVisualizer,
    AmbientArchitect,
    ArchitectureBuilderSandbox,
    AudioVisualSyncLab,
    BenefitSorter,
    BlockchainExplorer,
    BusinessModelCanvas,
    CinematicPromptSequencer,
    CodeDebugger,
    CompositorCanvasPro,
    ContextWindowExplorer,
    DataDecisionFlowchartBuilder,
    DataDriftRiskLens,
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
    MemoryRecallTuner,
    ModelArmsRaceTimeline,
    MotionPhysicsPlayground,
    MultiAgentChatSandbox,
    NeuralEvolutionChronicle,
    OrbitalHabitatDesigner,
    ParameterUniverseExplorer,
    PatternGenomeSynthesizer,
    PedagogyMatcher,
    PersonalizationSimulator,
    PhysicsPainter,
    PitchBuilder,
    PoeticFusionGenerator,
    PrivacyLensDashboard,
    ProfessionalEmailWriter,
    ProjectSubmission,
    PromptArchitectWorkbench,
    PromptHealthDashboard,
    PromptMutationStudio,
    RagBuilder,
    RlhfTrainerGame,
    RobotSimulator,
    SceneDirectorXR,
    SchedulePlanner,
    SdgMatcher,
    SensorDataInterpreter,
    SimplePredictiveModel,
    SkytowerArchitect,
    SmartContractEventListener,
    SoundfieldComposer,
    SpatialNarrativeEngine,
    SpeechEmotionAnalyzer,
    StoryboardForgePlus,
    TextureAlchemyLab,
    TokenEconomySimulator,
    UiFeedback,
    VoiceDrivenEditingDesk,
    VoiceMorphStudio,
};

interface SectionRendererProps {
  item: ContentItem;
  section: Section;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ item, section }) => {
  switch (item.type) {
    case 'paragraph':
      return <p className="mb-6 text-lg text-slate-600 leading-relaxed font-light text-justify selection:bg-blue-100">{item.content}</p>;
    case 'heading':
        return (
            <div className="mt-12 mb-6 flex items-center">
                 <div className="w-1 h-8 bg-brand-primary rounded-full mr-4 shadow-glow-blue"></div>
                 <h3 className="text-2xl font-bold text-brand-text tracking-tight">
                    {item.content}
                </h3>
            </div>
        );
    case 'quote':
        return (
            <blockquote className="relative pl-8 pr-6 py-6 my-8 bg-slate-50 rounded-xl border-l-4 border-brand-primary/80 italic text-xl text-slate-700 shadow-sm">
                <p className="relative z-10 leading-relaxed">{item.content}</p>
            </blockquote>
        );
    case 'list':
        if (Array.isArray(item.content)) {
            return (
                <ul className="space-y-3 mb-8 my-6 ml-2">
                    {item.content.map((li, i) => (
                        <li key={i} className="flex items-start gap-3 text-lg text-slate-600">
                             <span className="mt-2.5 w-1.5 h-1.5 bg-brand-secondary rounded-full flex-shrink-0"></span>
                             <span>{li}</span>
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    case 'code':
        return (
            <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-[#1e1e1e]">
                <CodeBlock code={(item.content || '') as string} language={item.language || 'javascript'} />
            </div>
        );
    case 'terminal':
        return (
             <div className="my-8 rounded-xl overflow-hidden shadow-2xl border border-slate-800/50 bg-[#1e1e1e]">
                <SimulatedTerminal 
                    code={(item.content || '') as string} 
                    language={item.language || 'bash'} 
                    output={item.output || ''} 
                    effectId={item.effectId} 
                    onRunCustomEffect={item.onRunCustomEffect} 
                />
            </div>
        );
    case 'mermaid':
        return <MermaidDiagram chart={(item.content || '') as string} />;
    case 'image':
        return <img src={(item.content || '') as string} alt={item.alt || ''} className="my-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-100 w-full object-cover" />;
    case 'interactive':
      if (item.component) {
        const InteractiveComponent = componentMap[item.component];
        if (InteractiveComponent) {
          return (
            <div className="my-12 transform transition-all duration-500 hover:translate-y-[-2px]">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-1 relative overflow-hidden group">
                     <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
                    <div className="relative bg-slate-50/50 rounded-xl p-1">
                        {/* Interactive Label Badge */}
                        <div className="absolute top-2 right-2 bg-white border border-slate-200 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-full z-10 uppercase tracking-widest flex items-center gap-2 shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
                            Interactive Lab
                        </div>
                        <Suspense fallback={
                            <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-4">
                                <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-xs tracking-widest uppercase font-medium">Initializing Lab Environment...</span>
                            </div>
                        }>
                        <InteractiveComponent interactiveId={item.interactiveId || section.id} />
                        </Suspense>
                    </div>
                </div>
            </div>
          );
        }
      }
      return <div className="text-red-500 my-8 p-6 bg-red-50 rounded-lg border border-red-200">Error: Interactive component "{item.component}" not found.</div>;
    default:
      return null;
  }
};

export default SectionRenderer;