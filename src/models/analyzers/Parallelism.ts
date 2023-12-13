import { Target } from '../../types/main';
import Analyzer from '../Analyzer';

export const GREEN_FLAG_OPCODE = 'event_whenflagclicked';
export const SPRITE_CLICKED_OPCODE = 'event_whenthisspriteclicked';
export const KEY_CKLICKED_OPCODE = 'event_whenkeypressed';
export const VIDEO_GREATER_THAN_OPCODE = 'videoSensing_whenMotionGreaterThan';

export const RECEIVE_MESSAGE_OPCODE = 'event_whenbroadcastreceived';
export const SMTHNG_GREATER_THAN_OPCODE = 'event_whengreaterthan';
export const BACKDROP_CHANGES_OPCODE = 'event_whenbackdropswitchesto';

class Parallelism extends Analyzer {
  public score: number = 0;
  public targets: Target[];
  public static readonly range: number[] = [0, 3];
  public name: string = 'Parallelism';
  
  constructor(targets: Target[]) {
    super();
    this.targets = targets;
  }

  public execute(): number {
    this.firstPointGreenFlagTwoScripts();
    this.twoPointsKeyPressORSpriteClicked();
    this.threePointsWhenAnyOfBlocksExecuted();
    return this.score;
  }

  public firstPointGreenFlagTwoScripts(): void {
    // one point for when two or more scripts run when green flag clicked
    let greenFlagsWithChildCounter = 0;
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.opcode === GREEN_FLAG_OPCODE && _block.next) {
          greenFlagsWithChildCounter += 1;
          if (greenFlagsWithChildCounter > 1) {
            this.score = 1;
            break;
          }
        }
      }
    }
  }

  public twoPointsKeyPressORSpriteClicked(): void {
    // two points when two or more scripts run when a key pressed or when a single sprite is clicked on
    let keyPressedWithChildCounter = 0;
    let spriteClickedWithChildCounter = 0;
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.opcode === KEY_CKLICKED_OPCODE && _block.next) {
          keyPressedWithChildCounter += 1;
          if (keyPressedWithChildCounter > 1) {
            this.score = 2;
            break;
          }
        }
        if (_block.opcode === SPRITE_CLICKED_OPCODE && _block.next) {
          spriteClickedWithChildCounter += 1;
          if (spriteClickedWithChildCounter > 1) {
            this.score = 2;
            break;
          }
        }
      }
    }
  }

  public threePointsWhenAnyOfBlocksExecuted(): void {
    // three points when two scripts run on any of the following blocks being executed:
    // ‘when I receive message’;
    // ‘when 2 scripts starts at the same multimedia event’;
    // ‘when % is > %’;
    // ‘when backdrop changes to’
    let receiceMessageWithChildeCounter = 0;
    let whenMotionGreaterThanCounter = 0;
    let smthGreaterThanWithChildCounter = 0;
    let backdropChangesWithChildCounter = 0;

    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.opcode === RECEIVE_MESSAGE_OPCODE && _block.next) {
          receiceMessageWithChildeCounter += 1;
          if (receiceMessageWithChildeCounter > 1) {
            this.score = 3;
            break;
          }
        }
        if (_block.opcode === SMTHNG_GREATER_THAN_OPCODE && _block.next) {
          smthGreaterThanWithChildCounter += 1;
          if (smthGreaterThanWithChildCounter > 1) {
            this.score = 3;
            break;
          }
        }
        if (_block.opcode === VIDEO_GREATER_THAN_OPCODE && _block.next) {
          whenMotionGreaterThanCounter += 1;
          if (whenMotionGreaterThanCounter > 1) {
            this.score = 3;
            break;
          }
        }
        if (_block.opcode === BACKDROP_CHANGES_OPCODE && _block.next) {
          backdropChangesWithChildCounter += 1;
          if (backdropChangesWithChildCounter > 1) {
            this.score = 3;
            break;
          }
        }
      }
    }
  }
}

export default Parallelism;
