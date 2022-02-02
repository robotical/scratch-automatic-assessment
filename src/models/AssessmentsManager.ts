import Analyzer from './Analyzer';

class AssessmentsManager {
  private analyzers: Analyzer[];
  public scores: { [key: string]: number };
  constructor() {
    this.analyzers = [];
    this.scores = {};
  }

  public registerAnalyzer(analyzer: Analyzer) {
    this.analyzers.push(analyzer);
  }

  public analyze() {
    this.analyzers.forEach((analyzer: Analyzer) => {
      const score = analyzer.execute();
      const analyzerType = analyzer.constructor.name;
      this.scores[analyzerType] = score;
    });
    return this.scores;
  }
}

export default AssessmentsManager;
