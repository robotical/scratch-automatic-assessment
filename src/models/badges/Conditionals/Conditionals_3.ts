/**
 * Bronze if a nested if structure is used
 * Silver if 20 nested if structures are used
 * Gold if 100 nested if structures are used
 */

import { BadgesCounts } from "../../../types/badges";
import { Target, _BlocksObj } from "../../../types/main";
import BadgeAnalyzer from "../../BadgeAnalyzer";
import StaticHelpers from "../../analyzers/StaticHelpers";

const IGNORE_DEAD_CODE = true;

const IF_BLOCKS_OPCODES = ["control_if", "control_if_else"];

class Conditionals_3 extends BadgeAnalyzer {
    public star: number = 3;
    public targets: Target[];
    public static count: number = 0;
    public newSessionCount = 0;
    public name: keyof BadgesCounts = "Conditionals";
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
        // counts the number of valid nested if structures in the script
        let count = 0;
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""], targetBlocks?: _BlocksObj) => {
            if (IF_BLOCKS_OPCODES.includes(block.opcode)) {
                console.log("parentBlock", block)
                targetBlocks && StaticHelpers.iterateThroughAllNestedBlocksFromBlock(block, targetBlocks, (childBlock: _BlocksObj[""]) => {
                    console.log("childBlock", childBlock)
                    if (IF_BLOCKS_OPCODES.includes(childBlock.opcode)) {
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
        if (count > Conditionals_3.count) {
            this.newSessionCount = count - Conditionals_3.count;
            Conditionals_3.count = count;
            this.wasCountMoreThanMax = true;
        } else {
            this.wasCountMoreThanMax = false;
        }
    }

}

export default Conditionals_3;