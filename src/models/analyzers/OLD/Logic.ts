// import { Target } from '../../types/main';
// import Analyzer from '../Analyzer';

// export const IF_BLOCK_OPCODE = 'control_if';
// export const IF_ELSE_BLOCK_OPCODE = 'control_if_else';
// export const AND_LOGIC_OPERATOR_OPCODE = 'operator_and';
// export const OR_LOGIC_OPERATOR_OPCODE = 'operator_or';
// export const NOT_LOGIC_OPERATOR_OPCODE = 'operator_not';

// class Logic extends Analyzer {
//   score: number = 0;
//   targets: Target[];
//   public static  range: number[] = [0, 3];
//   public name: string = 'Logic';

//   constructor(targets: Target[]) {
//     super();
//     this.targets = targets;
//   }

//   public execute(): number {
//     this.firstPointIfBlock();
//     this.twoPointsIfElseBlock();
//     this.threePointsLogicOperators();
//     return this.score;
//   }

//   private firstPointIfBlock(): void {
//     // One point when an If block is used (with at least one input)
//     for (const target of this.targets) {
//       for (const _blockKey of Object.keys(target.blocks._blocks)) {
//         const _block = target.blocks._blocks[_blockKey];
//         const blockInputsLength = Object.keys(_block.inputs).length;
//         if (_block.opcode === IF_BLOCK_OPCODE && blockInputsLength) {
//           this.score = 1;
//           break;
//         }
//       }
//     }
//   }

//   private twoPointsIfElseBlock(): void {
//     // Two points when an Ifelse block is used (with at least two inputs)
//     for (const target of this.targets) {
//       for (const _blockKey of Object.keys(target.blocks._blocks)) {
//         const _block = target.blocks._blocks[_blockKey];
//         const blockInputsLength = Object.keys(_block.inputs).length;
//         if (_block.opcode === IF_ELSE_BLOCK_OPCODE && blockInputsLength > 1) {
//           this.score = 2;
//           break;
//         }
//       }
//     }
//   }

//   private threePointsLogicOperators(): void {
//     // Three points when at least a logic operator was used (with parent)
//     for (const target of this.targets) {
//       for (const _blockKey of Object.keys(target.blocks._blocks)) {
//         const _block = target.blocks._blocks[_blockKey];
//         if (
//           (_block.opcode === AND_LOGIC_OPERATOR_OPCODE ||
//             _block.opcode === OR_LOGIC_OPERATOR_OPCODE ||
//             _block.opcode === NOT_LOGIC_OPERATOR_OPCODE) &&
//           _block.parent
//         ) {
//           this.score = 3;
//           break;
//         }
//       }
//     }
//   }
// }

// export default Logic;
