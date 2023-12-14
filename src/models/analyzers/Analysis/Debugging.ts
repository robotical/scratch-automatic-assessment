/**
 * 1 point if a say or think block is used
 */

import { AnalysisScores, Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const IGNORE_DEAD_CODE = true;

const SAY_OPCODES = ['looks_say', 'looks_sayforsecs'];
const THINK_OPCODES = ['looks_think', 'looks_thinkforsecs'];

class Debugging extends Analyzer {
    public targets: Target[];
    public score: number = 0;
    public name: keyof AnalysisScores = "Debugging";
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
        // 1 point if a say or think block is used
        let say = false;
        let think = false;
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (SAY_OPCODES.includes(block.opcode)) {
                say = true;
            }
            if (THINK_OPCODES.includes(block.opcode)) {
                think = true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
        if (say || think) {
            this.score = 1;
        }
    }
}

export default Debugging;