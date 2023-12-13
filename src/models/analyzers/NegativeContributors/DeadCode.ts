import { Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const STRING_OPCODES = ['text'];
const NUMBER_OPCODES = ['math_number', 'math_integer'];

class DeadCode extends Analyzer {
    public targets: Target[];
    public score: number;
    private totalScriptsCount = 0;
    private deadScriptsCount = 0
    public name: string;
    public static readonly range: number[] = [0, 3];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
        this.score = 0;
        this.name = 'Dead Code'
    }

    public execute(): object {
        StaticHelpers.iterateScripts(this.targets, (block: _BlocksObj[""], targetBlocks: _BlocksObj) => {
            // math numbers and texts for some reason are considered scripts
            // so we need to filter them out
            if ([...STRING_OPCODES, ...NUMBER_OPCODES].includes(block.opcode)) return false;
            this.totalScriptsCount++;
            if (StaticHelpers.isScriptDeadCode(block, targetBlocks)) {
                this.deadScriptsCount++;
                return false;
            } 
            return false;
        });
        return { totalScriptsCount: this.totalScriptsCount, deadScriptsCount: this.deadScriptsCount };
    }

}

export default DeadCode;
