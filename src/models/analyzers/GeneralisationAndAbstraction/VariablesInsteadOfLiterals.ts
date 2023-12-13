/**
 * 1 point when a constant variable is used 
 */


import { Target, _BlocksObj } from '../../../types/main';
import Analyzer from '../../Analyzer';
import StaticHelpers from '../StaticHelpers';

const IGNORE_DEAD_CODE = true;
const VARIABLE_OPCODES = ["data_variable"];

class VariablesInsteadOfLiterals extends Analyzer {
    public score: number = 0;
    public targets: Target[];
    public static readonly range: number[] = [0, 1];
    public name: string = 'Variables Instead Of Literals';

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): number {
        this.firstPoint();
        return this.score;
    }

    private firstPoint(): void {
        // 1 point when a constant variable is used 
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (VARIABLE_OPCODES.includes(block.opcode) && block.parent) {
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
}

export default VariablesInsteadOfLiterals;