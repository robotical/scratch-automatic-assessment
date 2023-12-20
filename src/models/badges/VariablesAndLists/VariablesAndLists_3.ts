/**
 * Bronze if a list operation is used
 * Silver if 20 list operations are used
 * Gold if 100 list operations are used
 */

import { BadgesCounts } from "../../../types/badges";
import { Target, _BlocksObj } from "../../../types/main";
import BadgeAnalyzer from "../../BadgeAnalyzer";
import StaticHelpers from "../../analyzers/StaticHelpers";

const IGNORE_DEAD_CODE = true;

const LIST_OPERATIONS_OPCODES = ["data_deleteoflist", "data_deletealloflist", "data_insertatlist", "data_replaceitemoflist", "data_addtolist", "data_itemoflist", "data_itemnumoflist", "data_lengthoflist", "data_listcontainsitem"];

class VariablesAndLists_3 extends BadgeAnalyzer {
    public star: number = 3;
    public targets: Target[];
    public static count: number = 0;
    public newSessionCount = 0;
    public name: keyof BadgesCounts = "Variables and Lists";
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
        // counts the number of valid lists in the script
        let count = 0;
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (LIST_OPERATIONS_OPCODES.includes(block.opcode)) {
                count++;
            }
            return false;
        }, IGNORE_DEAD_CODE);
        this.setCount(count);
    }

    setCount(count: number): void {
        if (count > VariablesAndLists_3.count) {
            this.newSessionCount = count - VariablesAndLists_3.count;
            VariablesAndLists_3.count = count;
            this.wasCountMoreThanMax = true;
        } else {
            this.wasCountMoreThanMax = false;
        }
    }

}

export default VariablesAndLists_3;