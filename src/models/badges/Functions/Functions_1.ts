/**
 * Bronze if a basic func is used
 * Silver if 20 basic funcs are used
 * Gold if 100 basic funcs are used
 */

import { BadgesCounts } from "../../../types/badges";
import { Target, _BlocksObj } from "../../../types/main";
import BadgeAnalyzer from "../../BadgeAnalyzer";
import StaticHelpers from "../../analyzers/StaticHelpers";

const IGNORE_DEAD_CODE = true;

const FUNCTION_CALL_OPCODES = ["procedures_call"];

class Functions_1 extends BadgeAnalyzer {
    public star: number = 1;
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
        // counts the number of valid basic Functions in the script
        let count = 0;
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (FUNCTION_CALL_OPCODES.includes(block.opcode)) {
                if (block.inputs && Object.keys(block.inputs).length === 0) {
                    count++;
                }
            }
            return false;
        }, IGNORE_DEAD_CODE);
        this.setCount(count);
    }

    setCount(count: number): void {
        if (count > Functions_1.count) {
            this.newSessionCount = count - Functions_1.count;
            Functions_1.count = count;
            this.wasCountMoreThanMax = true;
        } else {
            this.wasCountMoreThanMax = false;
        }
    }

}

export default Functions_1;