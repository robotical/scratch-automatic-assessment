/**
 * Bronze if 1 same func is used more than once
 * Silver if 20 same funcs are used more than once
 * Gold if 100 same funcs are used more than once
 */

import { BadgesCounts } from "../../../types/badges";
import { Target, _BlocksObj } from "../../../types/main";
import BadgeAnalyzer from "../../BadgeAnalyzer";
import StaticHelpers from "../../analyzers/StaticHelpers";

const IGNORE_DEAD_CODE = true;

const FUNCTION_CALL_OPCODES = ["procedures_call"];

class Functions_3 extends BadgeAnalyzer {
    public star: number = 3;
    public targets: Target[];
    public static count: number = 0;
    public newSessionCount = 0;
    public name: keyof BadgesCounts = "Functions";
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
        // counts the number of valid same Functions in the script
        const sameFunctionCallersCount: { [key: string]: number } = {};
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (FUNCTION_CALL_OPCODES.includes(block.opcode)) {
                sameFunctionCallersCount[block.opcode] = sameFunctionCallersCount[block.opcode] ? sameFunctionCallersCount[block.opcode] + 1 : 1;
            }
            return false;
        }, IGNORE_DEAD_CODE);
        const sameFunctionCallersCountValues = Object.values(sameFunctionCallersCount);
        if (sameFunctionCallersCountValues.length > 0) {
            let count = 0;
            sameFunctionCallersCountValues.forEach((value) => {
                if (value > 1) {
                    count++;
                }
            });
            return this.setCount(count);
        }
        this.setCount(0);
    }

    setCount(count: number): void {
        if (count > Functions_3.count) {
            this.newSessionCount = count - Functions_3.count;
            Functions_3.count = count;
            this.wasCountMoreThanMax = true;
        } else {
            this.wasCountMoreThanMax = false;
        }
    }

}

export default Functions_3;