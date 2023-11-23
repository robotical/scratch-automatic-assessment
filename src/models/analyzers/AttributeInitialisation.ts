import { Target, _BlocksObj } from "../../types/main";
import Analyzer from "../Analyzer";

interface BlockMappingEntry {
    opcode: string;
    type: BlockType;
}

enum BlockType {
    Absolute,
    Relative,
}

const BLOCKMAPPING: { [key: string]: Set<BlockMappingEntry> } = {
    costume: new Set([
        { opcode: 'looks_switchbackdropto', type: BlockType.Absolute },
        { opcode: 'looks_nextbackdrop', type: BlockType.Relative },
        { opcode: 'looks_switchcostumeto', type: BlockType.Absolute },
        { opcode: 'looks_nextcostume', type: BlockType.Relative },
    ]),
    orientation: new Set([
        { opcode: 'motion_turnright', type: BlockType.Relative },
        { opcode: 'motion_turnleft', type: BlockType.Relative },
        { opcode: 'motion_pointindirection', type: BlockType.Absolute },
        { opcode: 'motion_pointtowards_menu', type: BlockType.Relative },
    ]),
    position: new Set([
        { opcode: 'motion_movesteps', type: BlockType.Relative },
        { opcode: 'motion_gotoxy', type: BlockType.Absolute },
        { opcode: 'motion_goto', type: BlockType.Relative },
        { opcode: 'motion_glidesecstoxy', type: BlockType.Relative },
        { opcode: 'motion_glideto', type: BlockType.Relative },
        { opcode: 'motion_changexby', type: BlockType.Relative },
        { opcode: 'motion_setx', type: BlockType.Absolute },
        { opcode: 'motion_changeyby', type: BlockType.Relative },
        { opcode: 'motion_sety', type: BlockType.Absolute },
    ]),
    size: new Set([
        { opcode: 'looks_changesizeby', type: BlockType.Relative },
        { opcode: 'looks_setsizeto', type: BlockType.Absolute },
    ]),
    visibility: new Set([
        { opcode: 'looks_hide', type: BlockType.Absolute },
        { opcode: 'looks_show', type: BlockType.Absolute },
    ]),
};

export default class AttributeInitialisation extends Analyzer {
    public targets: Target[];
    public score: number;
    public name: string;
    private totalDefaults: number = 0;
    private listDefaults: string[] = [];
    private attributes = ['costume', 'orientation', 'position', 'size', 'visibility'];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
        this.score = 0;
        this.name = 'AttributeInitialisation';
    }

    public execute(): number {
        this.targets.forEach(target => {
            const blocks = target.blocks._blocks;
            const blockList = this.iterBlocks(blocks);
            blockList.forEach(blockOpcode => {
                this.attributes.forEach(attribute => {
                    if (this.hasBlockMapping(attribute, blockOpcode, BlockType.Absolute)) {
                        this.listDefaults.push(blockOpcode);
                        this.totalDefaults++;
                    }
                });
            });
        });
        return this.totalDefaults;
    }

    private hasBlockMapping = (attribute: string, blockOpcode: string, type: BlockType): boolean => {
        const entries = BLOCKMAPPING[attribute];
        for (let entry of entries) {
            if (entry.opcode === blockOpcode && entry.type === type) {
                return true;
            }
        }
        return false;
    };

    private iterBlocks(blocks: _BlocksObj): string[] {
        let blockList: string[] = [];
        let nextBlock: string | null = blocks['event_whenflagclicked']?.next;

        while (nextBlock) {
            const block = blocks[nextBlock];
            if (block) {
                blockList.push(block.opcode);
                nextBlock = block.next;
            } else {
                break;
            }
        }

        return blockList;
    }
}