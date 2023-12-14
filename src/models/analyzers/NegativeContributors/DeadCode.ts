import { DeadCodeScores, Scores, Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const STRING_OPCODES = ['text'];
const NUMBER_OPCODES = ['math_number', 'math_integer'];

class DeadCode extends Analyzer {
    public targets: Target[];
    public score: DeadCodeScores;
    private totalScriptsCount = 0;
    private deadScriptsCount = 0
    public name: keyof Scores = 'Dead Code';
    public static range: number[] = [];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
        this.score = new DeadCodeScores();
    }

    public execute(): DeadCodeScores {
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
        this.score['Total Scripts Count'] = this.totalScriptsCount;
        this.score['Dead Scripts Count'] = this.deadScriptsCount;
        return this.score;
    }

}

export default DeadCode;
