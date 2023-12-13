import DeadCode from './models/analyzers/NegativeContributors/DeadCode';
import Sequencing from './models/analyzers/Decomposition/Sequencing';
import Repetition from './models/analyzers/NegativeContributors/Repetition';
import DataTypes from './models/analyzers/PatternRecAndDataRep/DataTypes';
import Loops from './models/analyzers/PatternRecAndDataRep/Loops';
import VariablesAndDataStructures from './models/analyzers/PatternRecAndDataRep/VariablesAndDataStructures';
import StaticHelpers from './models/analyzers/StaticHelpers';
import AssessmentsManager, { Scores } from './models/AssessmentsManager';
import BadHabitsManager from './models/BadHabitsManager';
import { Target } from './types/main';
import Functions from './models/analyzers/Decomposition/Functions';
import Parallelism from './models/analyzers/Decomposition/Parallelism';
import FunctionReUse from './models/analyzers/GeneralisationAndAbstraction/FunctionReUse';
import FunctionsWithArguments from './models/analyzers/GeneralisationAndAbstraction/FunctionsWithArguments';
import VariablesInsteadOfLiterals from './models/analyzers/GeneralisationAndAbstraction/VariablesInsteadOfLiterals';
import Conditionals from './models/analyzers/Algorithms/Conditionals';
import Operators from './models/analyzers/Algorithms/Operators';
import SyncAndMessages from './models/analyzers/Algorithms/SynchAndMessages';
import Naming from './models/analyzers/Analysis/Naming';
import Debugging from './models/analyzers/Analysis/Debugging';

export const Greeter = (name: string) => `Hello ${name}`;

export const assess = (targets: Target[]) => {

  StaticHelpers.markDeadCodeBlocks(targets);
  const bh = new BadHabitsManager();
  bh.registerAnalyzer(new Repetition(targets));
  bh.registerAnalyzer(new DeadCode(targets));
  const bhScores = bh.analyze();

  const am = new AssessmentsManager();
  am.registerAnalyzer(new Repetition(targets));
  am.registerAnalyzer(new Sequencing(targets));
  am.registerAnalyzer(new Loops(targets));
  am.registerAnalyzer(new DataTypes(targets));
  am.registerAnalyzer(new VariablesAndDataStructures(targets));
  am.registerAnalyzer(new Functions(targets));
  am.registerAnalyzer(new Parallelism(targets));
  am.registerAnalyzer(new FunctionReUse(targets));
  am.registerAnalyzer(new FunctionsWithArguments(targets));
  am.registerAnalyzer(new VariablesInsteadOfLiterals(targets));
  am.registerAnalyzer(new Conditionals(targets));
  am.registerAnalyzer(new Operators(targets));
  am.registerAnalyzer(new SyncAndMessages(targets));
  am.registerAnalyzer(new Naming(targets));
  am.registerAnalyzer(new Debugging(targets));
  const amScores = am.analyze();

  return {
    ...amScores,
    ...bhScores,
  };
};


export const getPatternRecAndDataRepScores = (scores: Scores) => {
  return {
    'Data Types': scores['Data Types'],
    'Loops': scores['Loops'],
    'Variables and Data Structures': scores['Variables and Data Structures'],
  }
}

export const getDecompositionScores = (scores: Scores) => {
  return {
    'Sequencing': scores['Sequencing'],
  }
}
