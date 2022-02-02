import { Target } from '../../types/main';
import Analyzer from '../Analyzer';

export const MOTION_OPCODE_PREFIX = 'motion_';

export const CHANGE_VARIABLE_OPCODE = 'data_changevariableby';
export const SET_VARIABLE_OPCODE = 'data_setvariableto';

export const LIST_OPCODE_PREFIX = 'data_';

export const LIST_OPCODE_STRING = 'list';

class DataRepresentation extends Analyzer {
  score: number = 0;
  targets: Target[];

  constructor(targets: Target[]) {
    super();
    this.targets = targets;
  }

  public execute(): number {
    this.firstPointMotion();
    this.twoPointsVariableOperations();
    this.threePointsListsOperations();
    return this.score;
  }

  private firstPointMotion(): void {
    // one point when at least a motion block is used
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.opcode.includes(MOTION_OPCODE_PREFIX)) {
          this.score = 1;
          break;
        }
      }
    }
  }

  private twoPointsVariableOperations(): void {
    // two points when the program contains variable operations
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.opcode === CHANGE_VARIABLE_OPCODE || _block.opcode === SET_VARIABLE_OPCODE) {
          this.score = 2;
          break;
        }
      }
    }
  }

  private threePointsListsOperations(): void {
    // three points when the program contains list operations
    for (const target of this.targets) {
      for (const _blockKey of Object.keys(target.blocks._blocks)) {
        const _block = target.blocks._blocks[_blockKey];
        if (_block.opcode.includes(LIST_OPCODE_PREFIX) && _block.opcode.includes(LIST_OPCODE_STRING)) {
          this.score = 3;
          break;
        }
      }
    }
  }
}

export default DataRepresentation;
