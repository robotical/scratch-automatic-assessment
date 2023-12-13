/**
 * 1 point when there is a sequence of blocks ie a script with more than one block
 * 2 points where there are multiple event triggers
 */

import { Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const EVENT_VARIABLES_OPCODES = ["event_broadcastandwait", "event_whenflagclicked",
    "event_whengreaterthan", "event_whenkeypressed",
    "event_whenthisspriteclicked", "event_whenbackdropswitchesto",
    "procedures_prototype", "procedures_definition"];

const IGNORE_DEAD_CODE = true;

class Sequencing extends Analyzer {
    public targets: Target[];
    public score: number = 0;
    public name: string = "Sequencing";
    public static readonly range: number[] = [0, 2];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): number {
        this.firstPoint();
        this.secondPoint();
        return this.score;
    }

    private firstPoint(): void {
        // 1 point when there is a sequence of blocks ie a script with more than one block
        StaticHelpers.iterateScripts(this.targets, (block: _BlocksObj[""], targetBlocks: _BlocksObj) => {
            if (block.next && !block.isDeadCode && !StaticHelpers.isScriptDeadCode(block, targetBlocks)) {
                this.score = 1;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private secondPoint(): void {
        // 2 points where there are multiple event triggers
        let eventTriggerCount = 0;
        StaticHelpers.iterateScripts(this.targets, (block: _BlocksObj[""], targetBlocks: _BlocksObj) => {
            if (block.next && !block.isDeadCode && !StaticHelpers.isScriptDeadCode(block, targetBlocks)) {
                if (EVENT_VARIABLES_OPCODES.includes(block.opcode)) {
                    eventTriggerCount++;
                    return false;
                }
                return false;
            }
            return false;
        }, IGNORE_DEAD_CODE);
        if (eventTriggerCount > 1) {
            this.score = 2;
        }
    }
}

export default Sequencing;