/**
 * Bronze if a repeat until loop is used
 * Silver if 20 repeat until loops are used
 * Gold if 100 repeat until loops are used
 */

import { BadgesCounts } from "../../../types/badges";
import { Target, _BlocksObj } from "../../../types/main";
import BadgeAnalyzer from "../../BadgeAnalyzer";
import StaticHelpers from "../../analyzers/StaticHelpers";

const IGNORE_DEAD_CODE = true;

const REPEAT_UNTIL_LOOP_OPCODES = ["control_repeat_until"];

class Loops_3 extends BadgeAnalyzer {
    public star: number = 3;
    public targets: Target[];
    public static count: number = 0;
    public newSessionCount = 0;
    public name: keyof BadgesCounts = "Loops";
    public static progressionRanges = [[0, 1], [1, 20], [20, 100]];
    public wasCountMoreThanMax: boolean = false;

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): number {
        this.count();
        return this.newSessionCount;
    }

    private count(): void {
        // counts the number of valid repeat until loops in the script
        let count = 0;
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (REPEAT_UNTIL_LOOP_OPCODES.includes(block.opcode)) {
                count++;
            }
            return false;
        }, IGNORE_DEAD_CODE);
        this.setCount(count);
    }

    setCount(count: number): void {
        if (count > Loops_3.count) {
            this.newSessionCount = count - Loops_3.count;
            Loops_3.count = count;
            this.wasCountMoreThanMax = true;
        } else {
            this.wasCountMoreThanMax = false;
        }
    }

}

export default Loops_3;