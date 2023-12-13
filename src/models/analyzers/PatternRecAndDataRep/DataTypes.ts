/**
 * 1 point when a number is used as an input
 * 2 points when a string is used as an input
 * 3 points when a boolean is used as an input
 */

import { Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const BOOLEAN_OPCODES = ['martymachine_isImageLabelDetected',
    'martymachine_menu_sound_labels_menu',
    'sensing_mousedown',
    'sensing_coloristouchingcolor',
    'martymachine_isSoundLabelDetected',
    'sensing_touchingobject',
    'operator_equals',
    'operator_contains',
    'operator_gt',
    'sensing_keypressed',
    'operator_lt',
    'sensing_keyoptions',
    'operator_not',
    'sensing_touchingobjectmenu',
    'operator_or',
    'martymachine_menu_image_labels_menu',
    'sensing_touchingcolor',
    'operator_and'];

const STRING_OPCODES = ['text'];
const NUMBER_OPCODES = ['math_number', 'math_integer'];
const IGNORE_DEAD_CODE = true;

class DataTypes extends Analyzer {

    public targets: Target[];
    public score: number = 0;
    public name: string = "Data Types";
    public static readonly range: number[] = [0, 3];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): number {
        this.firstPoint();
        this.secondPoint();
        this.thirdPoint();
        return this.score;
    }

    private firstPoint(): void {
        // 1 point when a number is used as an input
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (NUMBER_OPCODES.includes(block.opcode)) {
                StaticHelpers.iterateBlockFields(block, (field) => {
                    if (field.value) {
                        this.score += 1;
                        return true;
                    }
                    return false;
                });
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private secondPoint(): void {
        // 2 points when a string is used as an input
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (STRING_OPCODES.includes(block.opcode)) {
                StaticHelpers.iterateBlockFields(block, (field) => {
                    if (field.value) {
                        this.score += 1;
                        return true;
                    }
                    return false;
                });
                return true;
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }

    private thirdPoint(): void {
        // 3 points when a boolean is used as an input
        // go through all blocks, if the block is a boolean block, check if has a parent block
        StaticHelpers.iterateBlocks(this.targets, (block: any) => {
            if (BOOLEAN_OPCODES.includes(block.opcode)) {
                if (block.parent) {
                    this.score = 3;
                    return true;
                }
            }
            return false;
        }, IGNORE_DEAD_CODE);
    }


}

export default DataTypes;