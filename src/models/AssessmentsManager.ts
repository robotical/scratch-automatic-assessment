import Analyzer from './Analyzer';

type ScoreName = 'Variables and Data Structures' | 'Data Types' | 'Loops' | 'Sequencing' | 'Functions' | 'Parallelism' | 'Function Reuse' | 'Functions with Arguments';
export type Scores = { [key in ScoreName]: number };

class AssessmentsManager {
  private analyzers: Analyzer[];
  public scores: Scores;
  constructor() {
    this.analyzers = [];
    this.scores = {
      'Variables and Data Structures': 0,
      'Data Types': 0,
      'Loops': 0,
      'Sequencing': 0,
      'Functions': 0,
      'Parallelism': 0,
      'Function Reuse': 0,
      'Functions with Arguments': 0,
    };
  }

  public registerAnalyzer(analyzer: Analyzer) {
    this.analyzers.push(analyzer);
  }

  public analyze() {
    this.analyzers.forEach((analyzer: Analyzer) => {
      const score = analyzer.execute();
      const analyzerType = analyzer.name;
      this.scores[analyzerType as ScoreName] = score as number;
    });
    return this.scores;
  }
}

export default AssessmentsManager;
