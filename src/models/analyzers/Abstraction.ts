import { Target } from "../../types/main";
import Analyzer from "../Analyzer";

class Abstraction extends Analyzer {
  private targets: Target[];
  private score: number;

  constructor(targets: Target[]) {
    super(targets);
    this.targets = targets;
    this.score = 0;
  }

  public execute(): number {
    this.firstPointNumberOfScripts();
    this.twoPointsNewBlocks();
    return this.score;
  }

  private firstPointNumberOfScripts(): void {
    // 1 point for more than 1 script in the whole program
    let scriptCounter = 0;
    for (let target of this.targets) {
      scriptCounter += target.blocks._scripts.length;
      if (scriptCounter > 1) {
        this.score = 1;
        break;
      }
    }
  }

  private twoPointsNewBlocks(): void {
    // 2 points for at least one defined block
    for (let target of this.targets) {
      for (let _blockKey in target.blocks._blocks) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.opcode === "procedures_definition") {
          this.score = 2;
          break;
        }
      }
    }
  }

  private threePointsClones(): void {
      // 3 points for at least one clone
      
  }
}

export default Abstraction;
