/**
 * 1 point if an if statement is used
 * 2 points if an if else statement is used
 * 3 points if a repeat/wait until statement is used
 */

import { AlgorithmsScores, Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const IGNORE_DEAD_CODE = true;

export const IF_OPCODES = ['control_if'];
export const IF_ELSE_OPCODES = ['control_if_else'];
export const REPEAT_WAIT_UNTIL_OPCODES = ['control_repeat_until', 'control_wait_until'];

class Conditionals extends Analyzer {
    public targets: Target[];
    public score: number = 0;
    public name: keyof AlgorithmsScores = "Conditionals";
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
        // 1 point if an if statement is used
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (IF_OPCODES.includes(block.opcode)) {
                this.score = 1;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private secondPoint(): void {
        // 2 points if an if else statement is used
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (IF_ELSE_OPCODES.includes(block.opcode)) {
                this.score = 2;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private thirdPoint(): void {
        // 3 points if a repeat/wait until statement is used
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (REPEAT_WAIT_UNTIL_OPCODES.includes(block.opcode)) {
                this.score = 3;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }
}

export default Conditionals;