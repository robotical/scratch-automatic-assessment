import { Target } from '../../types/main';
import Analyzer from '../Analyzer';

export const GREEN_FLAG_CLICKED_OPCODE = 'event_whenflagclicked';
export const SPRITE_CLICKED_OPCODE = 'event_whenthisspriteclicked';

class Interactivity extends Analyzer {
  score: number = 0;
  targets: Target[];

  constructor(targets: Target[]) {
    super();
    this.targets = targets;
  }

  public execute(): number {
    this.firstPointGreenFlag();
    this.twoPointsSpriteClicked();
    return this.score;
  }

  private firstPointGreenFlag(): void {
    // one point when a green flag block is used
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.opcode === GREEN_FLAG_CLICKED_OPCODE && _block.next) {
          this.score = 1;
          break;
        }
      }
    }
  }

  private twoPointsSpriteClicked(): void {
    // two points when a sprite clicked block was used
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.opcode === SPRITE_CLICKED_OPCODE && _block.next) {
          this.score = 2;
          break;
        }
      }
    }
  }

  private threePoints(): void {
    throw new Error("Haven't figured that out.");
  }
}

export default Interactivity;
