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
import BadgesManager from './models/BadgesManager';
import Loops_1 from './models/badges/Loops/Loops_1';
import Loops_2 from './models/badges/Loops/Loops_2';
import Loops_3 from './models/badges/Loops/Loops_3';
import Conditionals_1 from './models/badges/Conditionals/Conditionals_1';
import Conditionals_2 from './models/badges/Conditionals/Conditionals_2';
import Conditionals_3 from './models/badges/Conditionals/Conditionals_3';
import Functions_1 from './models/badges/Functions/Functions_1';
import Functions_2 from './models/badges/Functions/Functions_2';
import Functions_3 from './models/badges/Functions/Functions_3';
import DataTypes_1 from './models/badges/DataTypes/DataTypes_1';
import DataTypes_2 from './models/badges/DataTypes/DataTypes_2';
import DataTypes_3 from './models/badges/DataTypes/DataTypes_3';
import Operators_1 from './models/badges/Operators/Operators_1';
import Operators_2 from './models/badges/Operators/Operators_2';
import Operators_3 from './models/badges/Operators/Operators_3';
import Parallelism_1 from './models/badges/Parallelism/Parallelism_1';
import Parallelism_2 from './models/badges/Parallelism/Parallelism_2';
import VariablesAndLists_1 from './models/badges/VariablesAndLists/VariablesAndLists_1';
import VariablesAndLists_2 from './models/badges/VariablesAndLists/VariablesAndLists_2';
import VariablesAndLists_3 from './models/badges/VariablesAndLists/VariablesAndLists_3';

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
  BadgesManager
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

export const assessBadges = (targets: Target[]) => {
  StaticHelpers.markDeadCodeBlocks(targets);
  const bm = new BadgesManager();
  bm.registerAnalyzer(new Loops_1(targets));
  bm.registerAnalyzer(new Loops_2(targets));
  bm.registerAnalyzer(new Loops_3(targets));

  bm.registerAnalyzer(new Functions_1(targets));
  bm.registerAnalyzer(new Functions_2(targets));
  bm.registerAnalyzer(new Functions_3(targets));

  bm.registerAnalyzer(new Conditionals_1(targets));
  bm.registerAnalyzer(new Conditionals_2(targets));
  bm.registerAnalyzer(new Conditionals_3(targets));

  bm.registerAnalyzer(new DataTypes_1(targets));
  bm.registerAnalyzer(new DataTypes_2(targets));
  bm.registerAnalyzer(new DataTypes_3(targets));

  bm.registerAnalyzer(new Operators_1(targets));
  bm.registerAnalyzer(new Operators_2(targets));
  bm.registerAnalyzer(new Operators_3(targets));

  bm.registerAnalyzer(new VariablesAndLists_1(targets));
  bm.registerAnalyzer(new VariablesAndLists_2(targets));
  bm.registerAnalyzer(new VariablesAndLists_3(targets));

  bm.registerAnalyzer(new Parallelism_1(targets));
  bm.registerAnalyzer(new Parallelism_2(targets));

  const amScores = bm.analyze();

  return {
    badgesCount: {...amScores},
    hasChanged: bm.analyzers.some(analyzer => analyzer.wasCountMoreThanMax)
  };
}

export * from './types/main';
export * from './types/badges';
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