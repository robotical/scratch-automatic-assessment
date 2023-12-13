import Analyzer from './Analyzer';

type ScoreName = 'Repetition' | 'DeadCode';
export type Scores = { [key in ScoreName]: object };

class BadHabitsManager {
  private analyzers: Analyzer[];
  public scores: Scores;
  constructor() {
    this.analyzers = [];
    this.scores = {
      'Repetition': {},
      'DeadCode': {},
    };
  }

  public registerAnalyzer(analyzer: Analyzer) {
    this.analyzers.push(analyzer);
  }

  public analyze() {
    this.analyzers.forEach((analyzer: Analyzer) => {
      const score = analyzer.execute();
      const analyzerType = analyzer.constructor.name;
      this.scores[analyzerType as ScoreName] = score as object;
    });
    return this.scores;
  }
}

export default BadHabitsManager;
