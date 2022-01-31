import { Target } from "../types/main";
import Analyzer from "./Analyzer";

class AssessmentsManager {
  private analyzers: Analyzer[];
  private targets: Target[];
  
  constructor(targets: Target[]) {
    this.targets = targets;
    this.analyzers = [];
  }

  public registerAnalyzer(analyzer: Analyzer) {
    this.analyzers.push(analyzer);
  }

  public analyze() {
    this.analyzers.forEach((analyzer: Analyzer) => {
      analyzer.execute();
    });
  }
}

export default AssessmentsManager;
