import { Target, _BlocksObj } from "../../types/main";
import Analyzer from "../Analyzer";

const OPCODE_ARGUMENT_REPORTER = "argument_reporter";
const EVENT_VARIABLES_OPCODES = ["event_broadcastandwait", "event_whenflagclicked",
    "event_whengreaterthan", "event_whenkeypressed",
    "event_whenthisspriteclicked", "event_whenbackdropswitchesto",
    "procedures_prototype", "procedures_definition"];

const LOOP_BLOCKS_OPCODES = ["control_repeat", "control_forever", "control_if", "control_if_else",
    "control_repeat_until"];

class DeadCode extends Analyzer {
    public targets: Target[];
    public score: number;
    public name: string;

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
        this.score = 0;
        this.name = 'DeadCode'
    }

    public execute(): number {
        // dead code is defined as a block that is not an event variable and has no parent or next block
        // or a loop block that has no SUBSTACK input or has a SUBSTACK input with no subsequent blocks
        for (const target of this.targets) {
            const blocks = target.blocks._blocks;
            for (const _blockKey of Object.keys(target.blocks._blocks)) {
                const block = blocks[_blockKey];
                const isEventVariable = EVENT_VARIABLES_OPCODES.includes(block.opcode);
                const isLoopBlock = LOOP_BLOCKS_OPCODES.includes(block.opcode);

                if (!isEventVariable && block.opcode !== OPCODE_ARGUMENT_REPORTER) {
                    if (block.parent === null && block.next === null) {
                        // Dead code: not an event variable and no parent or next block
                        this.score++;
                        continue;
                    }

                    // check if the script this blocks belongs to starts with an event variable
                    let parentId = block.parent;
                    let parent = blocks[parentId || ""];
                    while (parentId && parent) {
                        parentId = parent.parent;
                        if (parentId) {
                            parent = blocks[parentId];
                        }
                    }
                    
                    // confirm this is a topLevel block
                    if (parent && !parent.topLevel) {
                        console.warn("Parent block is not top level", parent);
                    }
                    
                    // if the block we landed on is not an event variable, then the script starts with dead code
                    if (parent && !EVENT_VARIABLES_OPCODES.includes(parent.opcode)) {
                        this.score++;
                        continue;
                    }
                } 
                
                if (isLoopBlock) {
                    if (!block.inputs || block.inputs["SUBSTACK"] === undefined) {
                        // Dead loop block: empty or missing SUBSTACK input
                        this.score++;
                    } 
                }
            }
        }
        return this.score;
    }

}

export default DeadCode;
