/**
 * Bronze if a number is used
 * Silver if 20 numbers are used
 * Gold if 100 numbers are used
 */

import { BadgesCounts } from "../../../types/badges";
import { Target, _BlocksObj } from "../../../types/main";
import BadgeAnalyzer from "../../BadgeAnalyzer";
import StaticHelpers from "../../analyzers/StaticHelpers";

const IGNORE_DEAD_CODE = true;

const NUMBER_OPCODES = ['math_number', 'math_integer'];

class DataTypes_1 extends BadgeAnalyzer {
    public star: number = 1;
    public targets: Target[];
    public static count: number = 0;
    public newSessionCount = 0;
    public name: keyof BadgesCounts = "Data Types";
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
        // counts the number of valid input numbers in the script
        let count = 0;
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (NUMBER_OPCODES.includes(block.opcode)) {
                StaticHelpers.iterateBlockFields(block, (field) => {
                    if (field.value) {
                        count++;
                    }
                    return false;
                });
            }
            return false;
        }, IGNORE_DEAD_CODE);
        this.setCount(count);
    }

    setCount(count: number): void {
        if (count > DataTypes_1.count) {
            this.newSessionCount = count - DataTypes_1.count;
            DataTypes_1.count = count;
            this.wasCountMoreThanMax = true;
        } else {
            this.wasCountMoreThanMax = false;
        }
    }

}

export default DataTypes_1;