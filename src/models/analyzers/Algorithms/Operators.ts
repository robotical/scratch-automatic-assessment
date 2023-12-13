/**
 * 1 point when a comparison operator is used
 * 2 points when a math operator is used
 * 3 points when a logical operator is used
 * 4 points when a string operator is used
 */

import { Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const IGNORE_DEAD_CODE = true;

export const IF_OPCODES = ['control_if'];
export const IF_ELSE_OPCODES = ['control_if_else'];
export const REPEAT_WAIT_UNTIL_OPCODES = ['control_repeat_until', 'control_wait_until'];

const COMPARISON_OPCODES = ['operator_equals', 'operator_gt', 'operator_lt'];
const MATH_OPCODES = ['operator_add', 'operator_subtract', 'operator_multiply', 'operator_divide', 'operator_random', 'operator_round', 'operator_mathop', 'operator_mod'];
const LOGICAL_OPCODES = ['operator_and', 'operator_or', 'operator_not'];
const STRING_OPCODES = ['operator_join', 'operator_letter_of', 'operator_length', 'operator_contains'];

class Operators extends Analyzer {
    public targets: Target[];
    public score: number = 0;
    public name: string = "Operators";
    public static readonly range: number[] = [0, 3];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): number {
        this.firstPoint();
        this.secondPoint();
        this.thirdPoint();
        this.fourthPoint();
        return this.score;
    }

    private firstPoint(): void {
        // 1 point when a comparison operator is used
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (COMPARISON_OPCODES.includes(block.opcode)) {
                this.score = 1;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private secondPoint(): void {
        // 2 points when a math operator is used  
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (MATH_OPCODES.includes(block.opcode)) {
                this.score = 2;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private thirdPoint(): void {
        // 3 points when a logical operator is used 
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (LOGICAL_OPCODES.includes(block.opcode)) {
                this.score = 3;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private fourthPoint(): void {
        // 4 points when a string operator is used
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (STRING_OPCODES.includes(block.opcode)) {
                this.score = 4;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }
}

export default Operators;