// import { Target } from '../../types/main';
// import Analyzer from '../Analyzer';

// export const CLONE_OPCODE = 'control_start_as_clone';
// export const DEFINITION_OF_BLOCK_OPCODE = 'procedures_definition';

// class Abstraction extends Analyzer {
//   public targets: Target[];
//   public score: number;
//   public name: string = 'Abstraction';
//   public static  range: number[] = [0, 3];

//   constructor(targets: Target[]) {
//     super();
//     this.targets = targets;
//     this.score = 0;
//   }

//   public execute(): number {
//     this.firstPointNumberOfScripts();
//     this.twoPointsNewBlocks();
//     this.threePointsClones();
//     return this.score;
//   }

//   private firstPointNumberOfScripts(): void {
//     // 1 point for more than 1 script in the whole program
//     let scriptCounter = 0;
//     for (const target of this.targets) {
//       scriptCounter += target.blocks._scripts.length;
//       if (scriptCounter > 1) {
//         this.score = 1;
//         break;
//       }
//     }
//   }

//   private twoPointsNewBlocks(): void {
//     // 2 points for at least one defined block
//     for (const target of this.targets) {
//       for (const _blockKey of Object.keys(target.blocks._blocks)) {
//         const _block = target.blocks._blocks[_blockKey];
//         if (_block.opcode === DEFINITION_OF_BLOCK_OPCODE) {
//           this.score = 2;
//           break;
//         }
//       }
//     }
//   }

//   private threePointsClones(): void {
//     // 3 points for at least one clone
//     for (const target of this.targets) {
//       for (const _blockKey of Object.keys(target.blocks._blocks)) {
//         const _block = target.blocks._blocks[_blockKey];
//         if (_block.opcode === CLONE_OPCODE) {
//           this.score = 3;
//           break;
//         }
//       }
//     }
//   }
// }

// export default Abstraction;
