/**
 * Bronze if a forever loop is used
 * Silver if 20 forever loops are used
 * Gold if 100 forever loops are used
 */

import { BadgesCounts } from "../../../types/badges";
import { Target, _BlocksObj } from "../../../types/main";
import BadgeAnalyzer from "../../BadgeAnalyzer";
import StaticHelpers from "../../analyzers/StaticHelpers";

const IGNORE_DEAD_CODE = true;

const FOREVER_LOOP_OPCODES = ["control_forever"];

class Loops_1 extends BadgeAnalyzer {
    public star: number = 1;
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
        // counts the number of valid forever loops in the script
        let count = 0;
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (FOREVER_LOOP_OPCODES.includes(block.opcode)) {
                count++;
            }
            return false;
        }, IGNORE_DEAD_CODE);
        this.setCount(count);
    }

    setCount(count: number): void {
        if (count > Loops_1.count) {
            this.newSessionCount = count - Loops_1.count;
            Loops_1.count = count;
            this.wasCountMoreThanMax = true;
        } else {
            this.wasCountMoreThanMax = false;
        }
    }

}

export default Loops_1;