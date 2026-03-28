
export type ContentItemType =
  | 'paragraph'
  | 'list'
  | 'code'
  | 'terminal'
  | 'mermaid'
  | 'interactive'
  | 'heading'
  | 'quote'
  | 'image';

export type InteractiveComponentType =
  | 'AdversarialAttackSimulator'
  | 'AgentSystemDesigner'
  | 'AgenticWorkflowViz'
  | 'AiAlignmentTuner'
  | 'AiEthicsTracker'
  | 'AiPaletteSynthesizer'
  | 'AiSystemVisualizer'
  | 'AlgorithmVisualizer'
  | 'AmbientArchitect'
  | 'ApiKeyChatSimulator'
  | 'ArchitectureBuilderSandbox'
  | 'AudioVisualSyncLab'
  | 'BeginnerImageGen'
  | 'BenefitSorter'
  | 'BlockchainExplorer'
  | 'BusinessModelCanvas'
  | 'CinematicPromptSequencer'
  | 'CodeDebugger'
  | 'CompositorCanvasPro'
  | 'ContextWindowExplorer'
  | 'CourseConceptMatrix'
  | 'DataDecisionFlowchartBuilder'
  | 'DataVisualizer'
  | 'DiffusionFieldExplorer'
  | 'DockerCommandQuiz'
  | 'DreamspaceConstructor'
  | 'EmotionBlendMixer'
  | 'EnergyCarbonTracker'
  | 'EthicalBiasMirror'
  | 'EthicalDilemmaSimulator'
  | 'EthicalStyleInspector'
  | 'ExplainabilityPanel'
  | 'FeatureExplorer'
  | 'FundingPulseTicker'
  | 'FutureScenarioPoll'
  | 'GenerativeSculptor3D'
  | 'GestureAnimator'
  | 'HeroIntro'
  | 'HomeschoolKitRoadmap'
  | 'ImagePromptEnhancer'
  | 'InteractiveChatbot'
  | 'InteractiveDebates'
  | 'JobImpactSimulator'
  | 'LangGraphVisualizer'
  | 'LightingPhysicsLab'
  | 'LivePatentRadar'
  | 'LogicVsAi'
  | 'LossLandscapeNavigator'
  | 'MeetingSummarizer'
  | 'MelodyMakerAI'
  | 'MemoryDecayLab'
  | 'ModelArmsRaceTimeline'
  | 'ModelExplorer'
  | 'MotionPhysicsPlayground'
  | 'MultiAgentChatSandbox'
  | 'NeuralEvolutionChronicle'
  | 'NeuralNetworkPlayground'
  | 'ParadigmShiftExplorer'
  | 'ParameterUniverseExplorer'
  | 'PatternGenomeSynthesizer'
  | 'PedagogyMatcher'
  | 'PersonalizationSimulator'
  | 'PhysicsPainter'
  | 'PitchBuilder'
  | 'PoeticFusionGenerator'
  | 'PrivacyLensDashboard'
  | 'ProbabilitySelector'
  | 'ProfessionalEmailWriter'
  | 'PromptArchitectWorkbench'
  | 'PromptInjectionGame'
  | 'PromptMutationStudio'
  | 'RagBuilder'
  | 'RlhfTrainerGame'
  | 'RobotSimulator'
  | 'SceneDirectorXR'
  | 'SchedulePlanner'
  | 'SdgMatcher'
  | 'SensorDataInterpreter'
  | 'SimplePredictiveModel'
  | 'SmartContractEventListener'
  | 'SoundfieldComposer'
  | 'SpatialNarrativeEngine'
  | 'SpeechEmotionAnalyzer'
  | 'StoryboardForgePlus'
  | 'TextToAppGenerator'
  | 'TextureAlchemyLab'
  | 'TokenEconomySimulator'
  | 'TokenVisualizer'
  | 'UiFeedback'
  | 'VoiceDrivenEditingDesk'
  | 'VoiceMorphStudio'
  | 'SectionQuiz'
  | 'VocabularyLockIn'
  | 'MasteryCheckGate'
  | 'TemperaturePlayground'
  | 'TokenReceiptPrinter'
  | 'JsonSurgeon'
  | 'MiniAgentSimulator'
  | 'SemanticSearchLab'
  | 'ApproachDecisionTree'
  | 'RedTeamBot'
  | 'PromptUnitTester'
  | 'ModelPickerLab'
  | 'CredentialMintPreview';

export interface ContentItem {
  type: ContentItemType;
  content: string | string[];
  language?: 'python' | 'solidity' | 'bash' | 'javascript';
  output?: string;
  component?: InteractiveComponentType;
  effectId?: string;
  onRunCustomEffect?: () => void;
  interactiveId?: string;
  alt?: string;
}

export interface Section {
  id: string;
  title: string;
  icon?: string;
  content: ContentItem[];
  subSections?: Section[];
}

export interface Curriculum {
  title: string;
  summaryForAI: string;
  sections: Section[];
}

export interface User {
  email: string;
  name: string;
  picture?: string;
  points: number;
  progress: {
    completedSections: string[];
    completedInteractives: string[];
  };
  lastViewedSection: string;
}

export interface InteractiveComponentProps {
  interactiveId: string;
}
