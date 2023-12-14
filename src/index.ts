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