/**
 * 1 point when a function is used 
 */

import { DecompositionScores, Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const FUNCTION_CALL_OPCODES = ["procedures_call"];

const IGNORE_DEAD_CODE = true;

class Functions extends Analyzer {
    public targets: Target[];
    public score: number = 0;
    public name: keyof DecompositionScores = "Functions";
    public static  range: number[] = [0, 1];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): number {
        this.firstPoint();
        return this.score;
    }


    private firstPoint(): void {
        // 1 point when a function is used 
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (FUNCTION_CALL_OPCODES.includes(block.opcode)) {
                this.score = 1;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }
}

export default Functions;