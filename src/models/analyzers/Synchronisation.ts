import { Target } from '../../types/main';
import Analyzer from '../Analyzer';

export const WAIT_OPCODE = 'control_wait';
export const STOP_OPCODE = 'control_stop';
export const WAIT_UNTIL_OPCODE = 'control_wait_until';

class Synchronisation extends Analyzer {
  score: number = 0;
  targets: Target[];
  constructor(targets: Target[]) {
    super();
    this.targets = targets;
  }
  public execute(): number {
    this.firstPointWait();
    this.twoPointsStop();
    this.threePointsWaitUntil();
    return this.score;
  }

  private firstPointWait(): void {
    // one point when using wait block (and it has at least a child)
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.opcode === WAIT_OPCODE && _block.next) {
          this.score = 1;
          break;
        }
      }
    }
  }

  private twoPointsStop(): void {
    // twop points when using stop block (and it has a parent)
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.opcode === STOP_OPCODE && _block.parent) {
          this.score = 2;
          break;
        }
      }
    }
  }

  private threePointsWaitUntil(): void {
    // three points when using wait until (with a child and an input)
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        const inputsLength = Object.keys(_block.inputs).length;
        if (_block.opcode === WAIT_UNTIL_OPCODE && _block.next && inputsLength) {
          this.score = 3;
          break;
        }
      }
    }
  }
}

export default Synchronisation;
