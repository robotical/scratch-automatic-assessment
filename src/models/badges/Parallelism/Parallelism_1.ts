/**
 * Bronze if a "2 scripts run by the same event" is used
 * Silver if 20 "2 scripts run by the same event" are used
 * Gold if 100 "2 scripts run by the same event" are used
 */

import { BadgesCounts } from "../../../types/badges";
import { Target, _BlocksObj } from "../../../types/main";
import BadgeAnalyzer from "../../BadgeAnalyzer";
import StaticHelpers from "../../analyzers/StaticHelpers";

const IGNORE_DEAD_CODE = true;

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

class Parallelism_1 extends BadgeAnalyzer {
    public star: number = 1;
    public targets: Target[];
    public static count: number = 0;
    public newSessionCount = 0;
    public name: keyof BadgesCounts = "Parallelism";
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
        // counts the number of valid "2 scripts run by the same event" in the script
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
            let count = 0;
            sameEventCounterValues.forEach((value) => {
                if (value > 1) {
                    count++;
                }
            });
            return this.setCount(count);
        }
        this.setCount(0);
    }

    setCount(count: number): void {
        if (count > Parallelism_1.count) {
            this.newSessionCount = count - Parallelism_1.count;
            Parallelism_1.count = count;
            this.wasCountMoreThanMax = true;
        } else {
            this.wasCountMoreThanMax = false;
        }
    }

}

export default Parallelism_1;