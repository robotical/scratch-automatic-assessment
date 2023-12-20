/**
 * Bronze if a comparison/boolean operator is used
 * Silver if 20 comparison/boolean operators are used
 * Gold if 100 comparison/boolean operators are used
 */

import { BadgesCounts } from "../../../types/badges";
import { Target, _BlocksObj } from "../../../types/main";
import BadgeAnalyzer from "../../BadgeAnalyzer";
import StaticHelpers from "../../analyzers/StaticHelpers";

const IGNORE_DEAD_CODE = true;

const COMPARISON_OR_BOOLEAN_OPCODES = ['operator_equals', 'operator_gt', 'operator_lt', 'operator_and', 'operator_or', 'operator_not'];

class Operators_1 extends BadgeAnalyzer {
    public star: number = 1;
    public targets: Target[];
    public static count: number = 0;
    public newSessionCount = 0;
    public name: keyof BadgesCounts = "Operators";
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
        // counts the number of valid comparison/boolean operators in the script
        let count = 0;
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (COMPARISON_OR_BOOLEAN_OPCODES.includes(block.opcode)) {
                count++;
            }
            return false;
        }, IGNORE_DEAD_CODE);
        this.setCount(count);
    }

    setCount(count: number): void {
        if (count > Operators_1.count) {
            this.newSessionCount = count - Operators_1.count;
            Operators_1.count = count;
            this.wasCountMoreThanMax = true;
        } else {
            this.wasCountMoreThanMax = false;
        }
    }

}

export default Operators_1;