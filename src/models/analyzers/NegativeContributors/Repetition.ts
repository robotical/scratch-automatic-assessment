import { RepetitionScores, Scores, Target } from "../../../types/main";
import Analyzer from "../../Analyzer";
import StaticHelpers from "../StaticHelpers";

class Repetition extends Analyzer {
    public targets: Target[];
    public score: RepetitionScores;
    private totalScriptsCount = 0;
    private duplicateCount = 0
    public name: keyof Scores = "Repetition";
    public static  range: number[] = [];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
        this.score = new RepetitionScores();
    }

    public execute(): RepetitionScores {
        const groupedBlockOpcodes = this.groupBlocksByNumber(this.targets, 5);
        for (let i = 0; i < groupedBlockOpcodes.length; i++) {
            const group1 = groupedBlockOpcodes[i];
            for (let j = i + 1; j < groupedBlockOpcodes.length; j++) {
                const group2 = groupedBlockOpcodes[j];
                if (this.compareTwoGroups(group1, group2)) {
                    this.duplicateCount++;
                }
            }
        }
        this.totalScriptsCount = groupedBlockOpcodes.length;
        this.score['Duplicate Scripts Count'] = this.duplicateCount;
        this.score['Total Scripts Count'] = this.totalScriptsCount;
        return this.score;
    }

    private groupBlocksByNumber(targets: Target[], numberOfBlocksInGroup: number): string[][] {
        // go through all blocks one by one
        // for each block, get the next numberOfBlocksInGroup blocks and add their opcodes to a list
        // if the opcodes are less than numberOfBlocksInGroup, ignore the list
        // if the opcodes are equal to numberOfBlocksInGroup, add the list to a list of lists
        // return the list of lists
        const groups: string[][] = []
        const allBlocks = targets.map(target => target.blocks._blocks).reduce((a, b) => ({ ...a, ...b }));
        for (const blockKey of Object.keys(allBlocks)) {
            // ignore the blocks that belong to a function
            const isInFunction = StaticHelpers.doesBlockBelongToFunction(allBlocks[blockKey], allBlocks);
            if (isInFunction) continue;
            const block = allBlocks[blockKey];
            const group: string[] = [];
            let child = block;
            for (let i = 0; i < numberOfBlocksInGroup; i++) {
                if (child) {
                    group.push(child.opcode);
                    child = allBlocks[child.next || ""];
                }
            }
            if (group.length === numberOfBlocksInGroup) {
                groups.push(group);
            }
        }
        return groups;
    }

    private compareTwoGroups(group1: string[], group2: string[]): boolean {
        for (let i = 0; i < group1.length; i++) {
            if (group1[i] !== group2[i]) {
                return false;
            }
        }
        return true;
    }
}

export default Repetition
