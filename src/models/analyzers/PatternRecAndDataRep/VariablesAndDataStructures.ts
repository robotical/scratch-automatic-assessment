/**
 * 1 point when a variable or any variable operation is used
 * 2 points when a list operation like add/delete/insert/replace is used
 * 3 points when a list operation like item of list / length of list / list contains item is used
 */

import { Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const IGNORE_DEAD_CODE = true;

const VARIABLE_OPCODES = ["data_variable", "data_setvariableto", "data_changevariableby", "data_hidevariable", "data_showvariable"];
const LIST_2_OPCODES = ["data_deleteoflist", "data_deletealloflist", "data_insertatlist", "data_replaceitemoflist", "data_addtolist"];
const LIST_3_OPCODES = ["data_itemoflist", "data_itemnumoflist", "data_lengthoflist", "data_listcontainsitem"];

class VariablesAndDataStructures extends Analyzer {
    public targets: Target[];
    public score: number = 0;
    public name: string = "Variables and Data Structures";
    public static readonly range: number[] = [0, 3];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): number {
        this.firstPoint();
        this.secondPoint();
        this.thirdPoint();
        return this.score;
    }

    private firstPoint(): void {
        // 1 point when a variable is used
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (VARIABLE_OPCODES.includes(block.opcode)) {
                StaticHelpers.iterateBlockFields(block, (field) => {
                    if (field.value) {
                        this.score = 1;
                        return true;
                    }
                    return false;
                });
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private secondPoint(): void {
        // 2 points when a list operation like add/delete/insert/replace is used
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (LIST_2_OPCODES.includes(block.opcode)) {
                StaticHelpers.iterateBlockFields(block, (field) => {
                    if (field.value) {
                        this.score = 2;
                        return true;
                    }
                    return false;
                });
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private thirdPoint(): void {
        // 3 points when a list operation like item of list / length of list / list contains item is used
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (LIST_3_OPCODES.includes(block.opcode)) {
                StaticHelpers.iterateBlockFields(block, (field) => {
                    if (field.value) {
                        this.score = 3;
                        return true;
                    }
                    return false;
                });
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }
}

export default VariablesAndDataStructures;