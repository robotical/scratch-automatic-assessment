/**
 * 1 point when two scripts are triggered by the same event
 * 2 points when a message reception is causing parallel execution
 */

import { DecompositionScores, Target, _BlocksObj } from '../../../types/main';
import Analyzer from '../../Analyzer';
import StaticHelpers from '../StaticHelpers';

const EVENTS_OPCODES = [
    "event_whenflagclicked",
    "event_whenthisspriteclicked",
    "event_whenkeypressed",
    "event_whenbroadcastreceived",
    "event_whengreaterthan",
    "event_whenbackdropswitchesto",
    "event_videoon",
    "event_whenloudnessgreater",
    "event_whenstageclicked",
];

const WHEN_BROADCAST_RECEIVED_OPCODES = ["event_whenbroadcastreceived"];

const IGNORE_DEAD_CODE = true;

class Parallelism extends Analyzer {
    public score: number = 0;
    public targets: Target[];
    public static  range: number[] = [0, 2];
    public name: keyof DecompositionScores = 'Parallelism';

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
        // 1 point when two scripts are triggered by the same event
        const sameEventCounter: { [key: string]: number } = {};
        StaticHelpers.iterateScripts(this.targets, (block: _BlocksObj[""], targetBlocks: _BlocksObj) => {
            if (EVENTS_OPCODES.includes(block.opcode) && !StaticHelpers.isScriptDeadCode(block, targetBlocks)) {
                sameEventCounter[block.opcode] = sameEventCounter[block.opcode] ? sameEventCounter[block.opcode] + 1 : 1;
                return false;
            }
            return false;
        }, IGNORE_DEAD_CODE);
        const sameEventCounterValues = Object.values(sameEventCounter);
        if (sameEventCounterValues.length > 0) {
            const max = Math.max(...sameEventCounterValues);
            if (max > 1) {
                this.score = 1;
            }
        }
    }

    private secondPoint(): void {
        // 2 points when a message reception is causing parallel execution
        StaticHelpers.iterateScripts(this.targets, (block: _BlocksObj[""], targetBlocks: _BlocksObj) => {
            if (WHEN_BROADCAST_RECEIVED_OPCODES.includes(block.opcode) && !StaticHelpers.isScriptDeadCode(block, targetBlocks)) {
                this.score = 2;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }
}

export default Parallelism;
