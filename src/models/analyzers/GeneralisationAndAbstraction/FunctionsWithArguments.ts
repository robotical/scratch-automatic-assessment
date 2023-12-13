/**
 * 1 point when a function is used that has at least one argument
 */


import { Target, _BlocksObj } from '../../../types/main';
import Analyzer from '../../Analyzer';
import StaticHelpers from '../StaticHelpers';

const IGNORE_DEAD_CODE = true;
const FUNCTION_CALL_OPCODES = ["procedures_call"];

class FunctionsWithArguments extends Analyzer {
    public score: number = 0;
    public targets: Target[];
    public static readonly range: number[] = [0, 1];
    public name: string = 'Functions with Arguments';

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): number {
        this.firstPoint();
        return this.score;
    }

    private firstPoint(): void {
        // 1 point when a function is used that has at least one argument
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (FUNCTION_CALL_OPCODES.includes(block.opcode)) {
                if (block.inputs && Object.keys(block.inputs).length > 0) {
                    this.score = 1;
                }
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }
}

export default FunctionsWithArguments;