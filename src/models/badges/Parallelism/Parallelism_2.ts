/**
 * Bronze if a broadcast message is used
 * Silver if 20 broadcast messages are used
 * Gold if 100 broadcast messages are used
 */

import { BadgesCounts } from "../../../types/badges";
import { Target, _BlocksObj } from "../../../types/main";
import BadgeAnalyzer from "../../BadgeAnalyzer";
import StaticHelpers from "../../analyzers/StaticHelpers";

const IGNORE_DEAD_CODE = true;

const WHEN_BROADCAST_RECEIVED_OPCODES = ["event_whenbroadcastreceived"];

class Parallelism_2 extends BadgeAnalyzer {
    public star: number = 2;
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
        // counts the number of valid broadcast messages in the script
        let count = 0;
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (WHEN_BROADCAST_RECEIVED_OPCODES.includes(block.opcode)) {
                if (block.inputs && Object.keys(block.inputs).length === 0) {
                    count++;
                }
            }
            return false;
        }, IGNORE_DEAD_CODE);
        this.setCount(count);
    }

    setCount(count: number): void {
        if (count > Parallelism_2.count) {
            this.newSessionCount = count - Parallelism_2.count;
            Parallelism_2.count = count;
            this.wasCountMoreThanMax = true;
        } else {
            this.wasCountMoreThanMax = false;
        }
    }

}

export default Parallelism_2;