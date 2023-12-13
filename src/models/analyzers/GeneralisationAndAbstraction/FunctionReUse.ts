/**
 * 1 point when a function is called from multiple places
 */


import { Target, _BlocksObj } from '../../../types/main';
import Analyzer from '../../Analyzer';
import StaticHelpers from '../StaticHelpers';

const IGNORE_DEAD_CODE = true;
const FUNCTION_CALL_OPCODES = ["procedures_call"];

class FunctionReUse extends Analyzer {
    public score: number = 0;
    public targets: Target[];
    public static readonly range: number[] = [0, 1];
    public name: string = 'Function Reuse';

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): number {
        this.firstPoint();
        return this.score;
    }

    private firstPoint(): void {
        // 1 point when a function is called from multiple places
        const sameFunctionCallersCount: { [key: string]: number } = {};
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (FUNCTION_CALL_OPCODES.includes(block.opcode)) {
                sameFunctionCallersCount[block.opcode] = sameFunctionCallersCount[block.opcode] ? sameFunctionCallersCount[block.opcode] + 1 : 1;
                return false;
            }
            return false;
        }, IGNORE_DEAD_CODE);
        const sameFunctionCallersCountValues = Object.values(sameFunctionCallersCount);
        if (sameFunctionCallersCountValues.length > 0) {
            const max = Math.max(...sameFunctionCallersCountValues);
            if (max > 1) {
                this.score = 1;
            }
        }
    }
}

export default FunctionReUse;