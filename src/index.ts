import AlgorithmsManager from './models/analyzers/Algorithms/Manager';
import AnalysisManager from './models/analyzers/Analysis/Manager';
import DecompositionManager from './models/analyzers/Decomposition/Manager';
import GenaralisationManager from './models/analyzers/GeneralisationAndAbstraction/Manager';
import DeadCode from './models/analyzers/NegativeContributors/DeadCode';
import Repetition from './models/analyzers/NegativeContributors/Repetition';
import PatternsManager from './models/analyzers/PatternRecAndDataRep/Manager';
import StaticHelpers from './models/analyzers/StaticHelpers';
import AssessmentsManager from './models/AssessmentsManager';
import { Target } from './types/main';

// Import and re-export the default exports
import Conditionals from './models/analyzers/Algorithms/Conditionals';
import Operators from './models/analyzers/Algorithms/Operators';
import SynchAndMessages from './models/analyzers/Algorithms/SynchAndMessages';
import Debugging from './models/analyzers/Analysis/Debugging';
import Comments from './models/analyzers/Analysis/Comments';
import Naming from './models/analyzers/Analysis/Naming';
import Functions from './models/analyzers/Decomposition/Functions';
import Parallelism from './models/analyzers/Decomposition/Parallelism';
import Sequencing from './models/analyzers/Decomposition/Sequencing';
import FunctionsWithArguments from './models/analyzers/GeneralisationAndAbstraction/FunctionsWithArguments';
import FunctionReUse from './models/analyzers/GeneralisationAndAbstraction/FunctionReUse';
import VariablesInsteadOfLiterals from './models/analyzers/GeneralisationAndAbstraction/VariablesInsteadOfLiterals';
import Loops from './models/analyzers/PatternRecAndDataRep/Loops';
import VariablesAndDataStructures from './models/analyzers/PatternRecAndDataRep/VariablesAndDataStructures';
import DataTypes from './models/analyzers/PatternRecAndDataRep/DataTypes';

export {
  Conditionals,
  Operators,
  SynchAndMessages,
  Debugging,
  Comments,
  Naming,
  Functions,
  Parallelism,
  Sequencing,
  FunctionsWithArguments,
  FunctionReUse,
  VariablesInsteadOfLiterals,
  Loops,
  VariablesAndDataStructures,
  DataTypes,
  DeadCode,
  Repetition,
  AlgorithmsManager as Algorithms,
  AnalysisManager as Analysis,
  DecompositionManager as Decomposition,
  GenaralisationManager as GeneralisationAndAbstraction,
  PatternsManager as PatternRecognitionAndDataRepresentation,
};


export const assess = (targets: Target[]) => {
  StaticHelpers.markDeadCodeBlocks(targets);
  const am = new AssessmentsManager();
  am.registerAnalyzer(new AlgorithmsManager(targets));
  am.registerAnalyzer(new AnalysisManager(targets));
  am.registerAnalyzer(new DecompositionManager(targets));
  am.registerAnalyzer(new GenaralisationManager(targets));
  am.registerAnalyzer(new PatternsManager(targets));
  am.registerAnalyzer(new Repetition(targets));
  am.registerAnalyzer(new DeadCode(targets));
  const amScores = am.analyze();

  return {
    ...amScores,
  };
};

export * from './types/main';
export * from './models/analyzers/Algorithms/Conditionals';
export * from './models/analyzers/Algorithms/Operators';
export * from './models/analyzers/Algorithms/SynchAndMessages';
export * from './models/analyzers/Analysis/Debugging';
export * from './models/analyzers/Analysis/Comments';
export * from './models/analyzers/Analysis/Naming';
export * from './models/analyzers/Decomposition/Functions';
export * from './models/analyzers/Decomposition/Parallelism';
export * from './models/analyzers/Decomposition/Sequencing';
export * from './models/analyzers/GeneralisationAndAbstraction/FunctionsWithArguments';
export * from './models/analyzers/GeneralisationAndAbstraction/FunctionReUse';
export * from './models/analyzers/GeneralisationAndAbstraction/VariablesInsteadOfLiterals';
export * from './models/analyzers/PatternRecAndDataRep/Loops';
export * from './models/analyzers/PatternRecAndDataRep/VariablesAndDataStructures';
export * from './models/analyzers/PatternRecAndDataRep/DataTypes';
export * from './models/analyzers/NegativeContributors/DeadCode';
export * from './models/analyzers/NegativeContributors/Repetition';