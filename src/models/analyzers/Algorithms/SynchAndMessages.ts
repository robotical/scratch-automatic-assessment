/**
 * 1 point when a wait block is used
 * 2 points when a broadcast block is used (broadcast and receive)
 */

import { Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const IGNORE_DEAD_CODE = true;

const WAIT_OPCODES = ['control_wait', 'control_wait_until'];

const EVENT_BRADCAST_OPCODES = ["event_broadcast", "event_broadcastandwait"];
const EVENT_RECEIVE_OPCODES = ["event_whenbroadcastreceived"];

class SyncAndMessages extends Analyzer {
    public targets: Target[];
    public score: number = 0;
    public name: string = "Synchronization and Messages";
    public static readonly range: number[] = [0, 3];

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
        // 1 point when a wait block is used
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (WAIT_OPCODES.includes(block.opcode)) {
                this.score = 1;
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private secondPoint(): void {
        // 2 points when a broadcast block is used (broadcast and receive)
        let broadcast = false;
        let receive = false;
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (EVENT_BRADCAST_OPCODES.includes(block.opcode)) {
                broadcast = true;
            }
            if (EVENT_RECEIVE_OPCODES.includes(block.opcode) && block.next) {
                receive = true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
        if (broadcast && receive) {
            this.score = 2;
        }
    }

}

export default SyncAndMessages;