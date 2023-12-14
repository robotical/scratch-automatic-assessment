import {
  DeadCodeScores,
  RepetitionScores,
  Scores,
  Target,
  DecompositionScores,
  PatternRecAndDataRepScores,
  GeneralisationAndAbstractionScores,
  AlgorithmsScores,
  AnalysisScores,
} from '../types/main';

abstract class Analyzer {
  abstract score: number | DeadCodeScores | RepetitionScores | DecompositionScores | PatternRecAndDataRepScores | GeneralisationAndAbstractionScores | AlgorithmsScores | AnalysisScores;
  static  range: number[];
  abstract targets: Target[];
  abstract name: keyof Scores | keyof DeadCodeScores | keyof RepetitionScores | keyof DecompositionScores | keyof PatternRecAndDataRepScores | keyof GeneralisationAndAbstractionScores | keyof AlgorithmsScores | keyof AnalysisScores;

    public abstract execute(): number | DeadCodeScores | RepetitionScores | DecompositionScores | PatternRecAndDataRepScores | GeneralisationAndAbstractionScores | AlgorithmsScores | AnalysisScores;
}

export default Analyzer;
