/**
 * 1 point if a comment is used
 */

import { Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

const IGNORE_DEAD_CODE = true;

const COMMENT_OPCODES = ['data_comment'];

class Comments extends Analyzer {
    public targets: Target[];
    public score: number = 0;
    public name: string = "Comments";
    public static readonly range: number[] = [0, 1];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): number {
        this.firstPoint();
        return this.score;
    }

    private firstPoint(): void {
        // 1 point if a comment is used
        StaticHelpers.iterateComments(this.targets, (comment: string) => {
            if (comment) {
                this.score = 1;
                return true;
            }
            return false;
        });
    }
}

export default Comments;