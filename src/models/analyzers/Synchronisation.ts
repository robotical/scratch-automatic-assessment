import { Target } from '../../types/main';
import Analyzer from '../Analyzer';

export const WAIT_OPCODE = 'control_wait';
export const STOP_OPCODE = 'control_stop';
export const WAIT_UNTIL_OPCODE = 'control_wait_until';

export const EVENT_BROADCAST_OPCODE = 'event_broadcast';
export const EVENT_BROADCAST_RECEIVED_OPCODE = 'event_whenbroadcastreceived';

export const EVENT_WHEN_BACKDROP_CHANGE_OPCODE = 'event_whenbackdropswitchesto';
export const EVENT_BROADCAST_WAIT = 'event_broadcastandwait';

class Synchronisation extends Analyzer {
  score: number = 0;
  targets: Target[];
  public static readonly range: number[] = [0, 3];
  public name: string = 'Synchronisation';
  
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
    // two points when using stop block (and it has a parent)
    // or when an event broadcast block is used
    // or when an event broadcast received block is used
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.opcode === STOP_OPCODE && _block.parent) {
          this.score = 2;
          break;
        }
        if (_block.opcode === EVENT_BROADCAST_OPCODE) {
          this.score = 2;
          break;
        }
        if (_block.opcode === EVENT_BROADCAST_RECEIVED_OPCODE) {
          this.score = 2;
          break;
        }
      }
    }
  }

  private threePointsWaitUntil(): void {
    // three points when using wait until (with a child and an input)
    // or when event_whenbackdropswitchesto is used 
    // or when event_broadcastandwait is used
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        const inputsLength = Object.keys(_block.inputs).length;
        if (_block.opcode === WAIT_UNTIL_OPCODE && _block.next && inputsLength) {
          this.score = 3;
          break;
        }
        if (_block.opcode === EVENT_WHEN_BACKDROP_CHANGE_OPCODE) {
          this.score = 3;
          break;
        }
        if (_block.opcode === EVENT_BROADCAST_WAIT) {
          this.score = 3;
          break;
        }
      }
    }
  }
}

export default Synchronisation;
