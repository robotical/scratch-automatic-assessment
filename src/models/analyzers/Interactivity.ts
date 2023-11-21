import { Target, _BlocksObj } from '../../types/main';
import Analyzer from '../Analyzer';

export const GREEN_FLAG_CLICKED_OPCODE = 'event_whenflagclicked';
export const SPRITE_CLICKED_OPCODE = 'event_whenthisspriteclicked';
export const KEY_PRESSED_OPCODE = 'event_whenkeypressed';
export const MOTION_GOTO_MENU = 'motion_goto_menu';
export const SENSING_TOUCHINGOBJECTMENU = 'sensing_touchingobjectmenu';

export const twoPointsBlocks = [
  'event_whenkeypressed',
  'event_whenthisspriteclicked',
  'sensing_mousedown',
  'sensing_keypressed',
  'sensing_askandwait',
  'sensing_answer',
];

export const threePointsBlocks = [
  'videoSensing_videoToggle', 'videoSensing_videoOn', 'videoSensing_whenMotionGreaterThan',
  'videoSensing_setVideoTransparency', 'sensing_loudness'
];


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
    this.threePoints();
    return this.score;
  }

  private firstPointGreenFlag(): void {
    // one point when a green flag block is used (with at least a next)
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
    // two points when, either a 'sprite clicked' block was used
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (twoPointsBlocks.includes(_block.opcode) && _block.next) {
          this.score = 2;
          break;
        }
        if ((_block.opcode === MOTION_GOTO_MENU || _block.opcode === SENSING_TOUCHINGOBJECTMENU) && this.checkMouseHelper(_block)) {
          this.score = 2;
          break;
        }
      }
    }
  }

  private checkMouseHelper(block: _BlocksObj['block']): boolean {
    // Check whether there is a block 'go to mouse' or 'touching mouse-pointer?'
    for (const fieldKey in block.fields) {
      if (fieldKey === 'TO' || fieldKey === 'TOUCHINGOBJECTMENU') {
        const values = block.fields[fieldKey];
        if (values && values[0] === '_mouse_') {
          return true;
        }
      }
    }
    return false;
  }

  private threePoints(): void {
    // three points when one of the threePointsBlocks is used
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (threePointsBlocks.includes(_block.opcode) && _block.next) {
          this.score = 3;
          break;
        }
      }
    }
  }
}

export default Interactivity;
