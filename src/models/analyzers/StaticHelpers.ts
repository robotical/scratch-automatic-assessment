import { FieldsObj, InputsObj, Target, _BlocksObj } from "../../types/main";

const OPCODE_ARGUMENT_REPORTER = "argument_reporter";
const EVENT_VARIABLES_OPCODES = ["event_broadcastandwait", "event_whenflagclicked",
    "event_whengreaterthan", "event_whenkeypressed",
    "event_whenthisspriteclicked", "event_whenbackdropswitchesto",
    "procedures_prototype", "procedures_definition", "event_whenbroadcastreceived"];

const LOOP_BLOCKS_OPCODES = ["control_repeat", "control_forever", "control_if", "control_if_else",
    "control_repeat_until"];

const FUNCTION_DEFINITION_OPCODES = ["procedures_definition"];

export default class StaticHelpers {
    static iterateTargets(targets: Target[], callback: (target: Target) => boolean): void {
        for (const target of targets) {
            if (callback(target)) {
                break;
            }
        }
    }

    static iterateComments(targets: Target[], callback: (comment: string) => boolean): void {
        StaticHelpers.iterateTargets(targets, (target: Target) => {
            for (const commentKey of Object.keys(target.comments)) {
                const comment = target.comments[commentKey];
                if (callback(comment)) {
                    return true;
                }
            }
            return false;
        });
    }

    static iterateScripts(targets: Target[], callback: (block: _BlocksObj[""], targetBlocks: _BlocksObj) => boolean, ignoreDeadCode = false): void {
        StaticHelpers.iterateTargets(targets, (target: Target) => {
            const targetBlocks = target.blocks._blocks;
            for (const topLevelBlockId of target.blocks._scripts) {
                const topLevelBlock = target.blocks._blocks[topLevelBlockId];
                if (ignoreDeadCode && topLevelBlock.isDeadCode) continue;
                if (callback(topLevelBlock, targetBlocks)) {
                    return true;
                }
            }
            return false;
        });
    }

    static iterateBlocks(targets: Target[], callback: (block: _BlocksObj[""]) => boolean, ignoreDeadCode = false): void {
        StaticHelpers.iterateTargets(targets, (target: Target) => {
            for (const blockKey of Object.keys(target.blocks._blocks)) {
                const block = target.blocks._blocks[blockKey];
                if (ignoreDeadCode && block.isDeadCode) continue;
                if (callback(block)) {
                    return true;
                }
            }
            return false;
        });
    }

    static iterateBlockFields(block: _BlocksObj[""], callback: (field: FieldsObj[""]) => boolean, ignoreDeadCode = false): void {
        if (ignoreDeadCode && block.isDeadCode) return;
        for (const fieldKey of Object.keys(block.fields)) {
            const field = block.fields[fieldKey];
            if (callback(field)) {
                break;
            }
        }
    }

    static iterateBlockInputs(block: _BlocksObj[""], callback: (input: InputsObj[""]) => boolean, ignoreDeadCode = false): void {
        if (ignoreDeadCode && block.isDeadCode) return;
        for (const inputKey of Object.keys(block.inputs)) {
            const input = block.inputs[inputKey];
            if (callback(input)) {
                break;
            }
        }
    }

    static isBlockDeadCode(block: _BlocksObj[""], blocks: _BlocksObj): boolean {
        console.debug("Checking if block is dead code", block);
        const isEventVariable = EVENT_VARIABLES_OPCODES.includes(block.opcode);
        const isLoopBlock = LOOP_BLOCKS_OPCODES.includes(block.opcode);

        if (!isEventVariable && block.opcode !== OPCODE_ARGUMENT_REPORTER) {
            if (block.parent === null && block.next === null) {
                // Dead code: not an event variable and no parent or next block
                console.debug("Dead code: not an event variable and no parent or next block");
                return true;
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

            // if the parent is undefined, check if the block is an event variable
            if (!parent && !isEventVariable) {
                console.debug("Dead code: parent is undefined and block is not an event variable");
                return true;
            }

            // confirm this is a topLevel block
            if (parent && !parent.topLevel) {
                console.warn("Parent block is not top level", parent);
            }

            // if the block we landed on is not an event variable, then the script starts with dead code
            if (parent && !EVENT_VARIABLES_OPCODES.includes(parent.opcode)) {
                console.debug("The top level block is not an event variable. Top level block:", parent);
                return true;
            }
        }

        if (isLoopBlock) {
            if (!block.inputs || !block.inputs["SUBSTACK"] || !block.inputs["SUBSTACK"].block) {
                // Dead loop block: empty or missing SUBSTACK input
                console.debug("Dead loop block: empty or missing SUBSTACK input");
                return true;
            }
            if (block.inputs["CONDITION"] && !block.inputs["CONDITION"].block) {
                // Dead loop block: missing CONDITION input
                console.debug("Dead loop block: missing CONDITION input");
                return true;
            }
        }

        // if it's a block that has fields, check if the fields are empty
        if (block.fields) {
            for (const fieldKey of Object.keys(block.fields)) {
                const field = block.fields[fieldKey];
                if (!field.value) {
                    console.debug("Dead code: field value is null", field);
                    return true;
                }
            }
        }

        // if it's a block that has inputs, recursively check if the inputs are empty
        if (this.recursivelyCheckIfAnInputIsDeadCode(block, blocks)) {
            console.debug("Dead code: input is dead code", block);
            return true;
        }

        return false;
    }

    static recursivelyCheckIfAnInputIsDeadCode(block: _BlocksObj[""], blocks: _BlocksObj): boolean {
        if (block.inputs) {
            for (const inputKey of Object.keys(block.inputs)) {
                const input = block.inputs[inputKey];
                if (input.block && this.isBlockDeadCode(blocks[input.block], blocks)) {
                    return true;
                }
                return this.recursivelyCheckIfAnInputIsDeadCode(blocks[input.block], blocks);
            }
        }
        return false;
    }

    static doesBlockBelongToFunction(block: _BlocksObj[""], blocks: _BlocksObj): boolean {
        let parent = blocks[block.parent || ""];
        while (parent) {
            if (FUNCTION_DEFINITION_OPCODES.includes(parent.opcode)) {
                return true;
            }
            parent = blocks[parent.parent || ""];
        }
        return false;
    }

    static markDeadCodeBlocks(targets: Target[]) {
        // this is inplace --the MartyBlocks object is modified so be aware that we need to run this before any other analysis
        for (const target of targets) {
            const blocks = target.blocks._blocks;
            for (const blockKey of Object.keys(blocks)) {
                const block = blocks[blockKey];
                if (this.isBlockDeadCode(block, blocks)) {
                    console.debug("Marking block as dead code", block);
                    block.isDeadCode = true;
                } else {
                    block.isDeadCode = false;
                }
            }
        }
    }

    static isScriptDeadCode(script: _BlocksObj[""], blocks: _BlocksObj): boolean {
        let isScriptDeadCode = false;
        let child = script;
        while (child) {
            // if the block itself is dead
            if (this.isBlockDeadCode(child, blocks)) {
                return true;
            }

            // if any of the inputs of the block are dead
            this.iterateBlockInputs(child, (input) => {
                if (this.recursivelyCheckIfAnInputIsDeadCode(blocks[input.block], blocks)) {
                    isScriptDeadCode = true;
                    return true;
                }
                return false;
            });
            if (isScriptDeadCode) return true;

            // if any of the fields of the block are dead
            this.iterateBlockFields(child, (field) => {
                if (!field.value) {
                    isScriptDeadCode = true;
                    return true;
                }
                return false;
            });
            if (isScriptDeadCode) return true;
            child = blocks[child.next || ""];
        }
        console.debug("is script dead code: ", isScriptDeadCode, script);
        return isScriptDeadCode;
    }
}