

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
  | 'AiAlignmentTuner'
  | 'AiEthicsTracker'
  | 'AiGovernanceCardGenerator'
  | 'AiPaletteSynthesizer'
  | 'AiSystemsBlueprintVisualizer'
  | 'AlgorithmVisualizer'
  | 'AmbientArchitect'
  | 'ArchitectureBuilderSandbox'
  | 'AudioVisualSyncLab'
  | 'BenefitSorter'
  | 'BlockchainExplorer'
  | 'BusinessModelCanvas'
  | 'CinematicPromptSequencer'
  | 'CodeDebugger'
  | 'CompositorCanvasPro'
  | 'ContextWindowExplorer'
  | 'DataDecisionFlowchartBuilder'
  | 'DataDriftRiskLens'
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
  | 'ImagePromptEnhancer'
  | 'InteractiveChatbot'
  | 'InteractiveDebates'
  | 'JobImpactSimulator'
  | 'LangGraphVisualizer'
  | 'LightingPhysicsLab'
  | 'LivePatentRadar'
  | 'LossLandscapeNavigator'
  | 'MeetingSummarizer'
  | 'MelodyMakerAI'
  | 'MemoryDecayLab'
  | 'MemoryRecallTuner'
  | 'ModelArmsRaceTimeline'
  | 'MotionPhysicsPlayground'
  | 'MultiAgentChatSandbox'
  | 'NeuralEvolutionChronicle'
  | 'OrbitalHabitatDesigner'
  | 'ParameterUniverseExplorer'
  | 'PatternGenomeSynthesizer'
  | 'PedagogyMatcher'
  | 'PersonalizationSimulator'
  | 'PhysicsPainter'
  | 'PitchBuilder'
  | 'PoeticFusionGenerator'
  | 'PrivacyLensDashboard'
  | 'ProfessionalEmailWriter'
  | 'ProjectSubmission'
  | 'PromptArchitectWorkbench'
  | 'PromptHealthDashboard'
  | 'PromptMutationStudio'
  | 'RagBuilder'
  | 'RlhfTrainerGame'
  | 'RobotSimulator'
  | 'SceneDirectorXR'
  | 'SchedulePlanner'
  | 'SdgMatcher'
  | 'SensorDataInterpreter'
  | 'SimplePredictiveModel'
  | 'SkytowerArchitect'
  | 'SmartContractEventListener'
  | 'SoundfieldComposer'
  | 'SpatialNarrativeEngine'
  | 'SpeechEmotionAnalyzer'
  | 'StoryboardForgePlus'
  | 'TextureAlchemyLab'
  | 'TokenEconomySimulator'
  | 'UiFeedback'
  | 'VoiceDrivenEditingDesk'
  | 'VoiceMorphStudio';

export interface ContentItem {
  type: ContentItemType;
  // FIX: Made content optional as interactive components don't have it.
  content?: string | string[];
  language?: 'python' | 'solidity' | 'bash' | 'javascript' | 'text' | 'markdown' | 'json';
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
  name:string;
  picture?: string;
  points: number;
  progress: {
    completedSections: string[];
    completedInteractives: string[];
  };
}

export interface InteractiveComponentProps {
  interactiveId: string;
}