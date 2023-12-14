import { Scores } from '../types/main';
import Analyzer from './Analyzer';

class AssessmentsManager {
  private analyzers: Analyzer[];
  public scores: any = new Scores();
  constructor() {
    this.analyzers = [];
  }

  public registerAnalyzer(analyzer: Analyzer) {
    this.analyzers.push(analyzer);
  }

  public analyze() {
    this.analyzers.forEach((analyzer: Analyzer) => {
      const score = analyzer.execute() as Scores[keyof Scores];
      const analyzerType = analyzer.name as unknown as keyof Scores;
      this.scores[analyzerType] = score;
    });
    return this.scores;
  }
}

export default AssessmentsManager;
