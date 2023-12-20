/**
 * Bronze if a boolean is used
 * Silver if 20 booleans are used
 * Gold if 100 booleans are used
 */

import { BadgesCounts } from "../../../types/badges";
import { Target, _BlocksObj } from "../../../types/main";
import BadgeAnalyzer from "../../BadgeAnalyzer";
import StaticHelpers from "../../analyzers/StaticHelpers";

const IGNORE_DEAD_CODE = true;

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


class DataTypes_3 extends BadgeAnalyzer {
    public star: number = 3;
    public targets: Target[];
    public static count: number = 0;
    public newSessionCount = 0;
    public name: keyof BadgesCounts = "Data Types";
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
        // counts the number of valid input booleans in the script
        let count = 0;
        StaticHelpers.iterateBlocks(this.targets, (block: _BlocksObj[""]) => {
            if (BOOLEAN_OPCODES.includes(block.opcode)) {
                count++;
                return false;
            }
            return false;
        }, IGNORE_DEAD_CODE);
        this.setCount(count);
    }

    setCount(count: number): void {
        if (count > DataTypes_3.count) {
            this.newSessionCount = count - DataTypes_3.count;
            DataTypes_3.count = count;
            this.wasCountMoreThanMax = true;
        } else {
            this.wasCountMoreThanMax = false;
        }
    }

}

export default DataTypes_3;