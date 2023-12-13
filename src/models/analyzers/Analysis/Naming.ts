/**
 * Percentage of variables that are named with not a default name
 */

import { Target, VariablesObj, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const IGNORE_DEAD_CODE = false;

const VARIABLE_OPCODES = ['data_variable'];
const LIST_OPCODES = ['data_listcontents'];
const FUNCTION_OPCODES = ['procedures_prototype', 'procedures_call'];

const BAD_VARIABLE_NAMES = ["my variable", "block name", "list", "item", "my list", "my function", "function name"];

class Naming extends Analyzer {
    public targets: Target[];
    public score: number = 0;
    public name: string = "Naming";
    public static readonly range: number[] = [0, 100];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): number {
        const variableNaming = this.variableNaming();
        const listNaming = this.listNaming();
        const functionNaming = this.functionNaming();
        const total = variableNaming.total + listNaming.total + functionNaming.total;
        const count = variableNaming.badCount + listNaming.badCount + functionNaming.badCount;
        // return (total === 0) ? 0 : (count / total);
        //@ts-ignore
        return {
            variableBadCount: variableNaming.badCount,
            variableTotal: variableNaming.total,
            listBadCount: listNaming.badCount,
            listTotal: listNaming.total,
            functionBadCount: functionNaming.badCount,
            functionTotal: functionNaming.total,
        }
    }

    private variableNaming(): { badCount: number, total: number } {
        let variableCount = 0
        let badNameCount = 0
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (VARIABLE_OPCODES.includes(block.opcode)) {
                ++variableCount;
                const variableName = block.fields["VARIABLE"]["value"];
                if (variableName) {
                    if (BAD_VARIABLE_NAMES.includes(variableName)) {
                        badNameCount += 1
                    }
                } else {
                    badNameCount += 1
                }
            }
            return false;
        }, IGNORE_DEAD_CODE);
        return { badCount: badNameCount, total: variableCount }
    }

    private listNaming(): { badCount: number, total: number } {
        let listCount = 0
        let badNameCount = 0
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (LIST_OPCODES.includes(block.opcode)) {
                ++listCount;
                const listName = block.fields["LIST"]["value"];
                if (listName) {
                    if (BAD_VARIABLE_NAMES.includes(listName)) {
                        badNameCount += 1
                    }
                } else {
                    badNameCount += 1
                }
            }
            return false;
        }, IGNORE_DEAD_CODE);
        return { badCount: badNameCount, total: listCount }
    }

    private functionNaming(): { badCount: number, total: number } {
        let functionCount = 0
        let badNameCount = 0
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (FUNCTION_OPCODES.includes(block.opcode)) {
                ++functionCount;
                const functionName = block.mutation?.proccode;
                if (functionName) {
                    if (BAD_VARIABLE_NAMES.includes(functionName)) {
                        badNameCount += 1
                    }
                } else {
                    badNameCount += 1
                }
            }
            return false;
        }, IGNORE_DEAD_CODE);
        return { badCount: badNameCount, total: functionCount }
    }

}

export default Naming;
