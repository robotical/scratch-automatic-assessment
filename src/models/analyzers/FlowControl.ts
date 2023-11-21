import { Target } from '../../types/main';
import Analyzer from '../Analyzer';

export const REPEAT_BLOCK_OPCODE = 'control_repeat';
export const FOREVER_BLOCK_OPCODE = 'control_forever';
export const REPEAT_UNTIL_BLOCK_OPCODE = 'control_repeat_until';

class FlowControl extends Analyzer {
  score: number = 0;
  targets: Target[];

  constructor(targets: Target[]) {
    super();
    this.targets = targets;
  }

  public execute(): number {
    this.firstPointSequenceBlocks();
    this.twoPointsRepeatOrForever();
    this.threePointsRepeatUntil();
    return this.score;
  }

  private firstPointSequenceBlocks(): void {
    // one point when there is a sequence of blocks (there is at least a block with a next)
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.next) {
          this.score = 1;
          break;
        }
      }
    }
  }

  private twoPointsRepeatOrForever(): void {
    // two points when a repeat or a forever block is used (with at least an input)
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        const inputsLength = Object.keys(_block.inputs).length;
        if ((_block.opcode === REPEAT_BLOCK_OPCODE || _block.opcode === FOREVER_BLOCK_OPCODE) && inputsLength) {
          this.score = 2;
          break;
        }
      }
    }
  }

  private threePointsRepeatUntil(): void {
    // three points when a repeat until block is used (with at least an input)
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        const inputsLength = Object.keys(_block.inputs).length;
        if (_block.opcode === REPEAT_UNTIL_BLOCK_OPCODE && inputsLength) {
          this.score = 3;
          break;
        }
      }
    }
  }
}

export default FlowControl;
