/**
 * 1 point when a forever loop is used
 * 2 points when a repeat loop is used
 * 3 points when a repeat until loop is used
 */


import { PatternRecAndDataRepScores, Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const IGNORE_DEAD_CODE = true;

export const FOREVER_BLOCK_OPCODES = ['control_forever'];
export const REPEAT_BLOCK_OPCODES = ['control_repeat'];
export const REPEAT_UNTIL_BLOCK_OPCODES = ['control_repeat_until'];

class Loops extends Analyzer {
    public targets: Target[];
    public score: number = 0;
    public name: keyof PatternRecAndDataRepScores = "Loops";
    public static  range: number[] = [0, 3];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): number {
        this.firstPoint();
        this.secondPoint();
        this.thirdPoint();
        return this.score;
    }

    private firstPoint(): void {
        // 1 point when a forever loop is used
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (FOREVER_BLOCK_OPCODES.includes(block.opcode)) {
                this.score = 1;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private secondPoint(): void {
        // 2 points when a repeat loop is used
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (REPEAT_BLOCK_OPCODES.includes(block.opcode)) {
                this.score = 2;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private thirdPoint(): void {
        // 3 points when a repeat until loop is used
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (REPEAT_UNTIL_BLOCK_OPCODES.includes(block.opcode)) {
                this.score = 3;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }
}

export default Loops;