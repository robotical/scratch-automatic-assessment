import { Target } from "../../types/main";
import Analyzer from "../Analyzer";

interface CodeBlockDuplicateInterface {
    opcode: string;
    parent: string | null;
    topLevel: boolean;
    id: string;
    addedToCodeList: boolean;
    depth: number;
    shadow: boolean
}

class Duplication extends Analyzer {
    public targets: Target[];
    public score: number;
    public name: string;
    private duplicateCount: number = 0

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
        this.score = 0;
        this.name = 'Duplication'
    }

    public execute(): number {
        // These comments as of 17/June/2022, please remove if there have been subsequent code changes!
        // Reminders: Currently looking for duplicates on blocks of 5 opcodes - this is wrong.
        //            Hairball (at bottom of page) compares complete scripts.
        // Notes: I can't see the link between a block and it's containing script in Target data.
        //        In the dead code section the actually scripts are extracted. Perhaps we should do the same here?

        //---------------------------------------------
        // First step is to get list of opCodes in the order they are called...
        const opCodeList: string[] = []
        const codeBlockMap = new Map<string, CodeBlockDuplicateInterface>()

        // Create a map of all code blocks keyed by their id
        for (const target of this.targets) {
            for (const _blockKey of Object.keys(target.blocks._blocks)) {
                // Top level have a depth of 1.
                const depth = target.blocks._blocks[_blockKey].topLevel ? 1 : 0
                // Add all the blocks in this target to the map
                codeBlockMap.set(_blockKey, {
                    ...target.blocks._blocks[_blockKey],
                    ...{ depth: depth, addedToCodeList: false }
                })
            }
        }

        // We want the leaf nodess, so for each block calculate it's depth from top level
        // (next field being null is no indicate that it is a leaf; Note - loops and conditions can have null next values!)
        Array.from(codeBlockMap.values()).forEach(value => {
            if (value.depth === 0) {
                this.calculateDepth(codeBlockMap, value)
            }
        })

        // We can then get list of keys, sorted by the nodes with the greatest depth
        // i.e. the bottom of script code block chain.
        const keys_sorted = Array.from(codeBlockMap.values())
            .sort((a, b) => ((a.depth < b.depth) ? 1 : ((a.depth > b.depth) ? -1 : 0)))
            .map((node) => node.id)

        // Push all opCodes on to the array
        // We start at bottom of code block chain, walk up code blocks to the top level and
        // then unwind pushing the opcodes on the array on way back (this will be the order they are called in)
        // Note. The code could fork, but we're not interested in absolute order, only order within each (forked) section.
        keys_sorted.forEach(code_block_id => {
            const value = codeBlockMap.get(code_block_id) as CodeBlockDuplicateInterface
            if (!value.addedToCodeList) {
                this.walkUp(codeBlockMap, value, opCodeList)
            }
        })


        //---------------------------------------------
        // Step 2.
        // We now have list of opcodes in their execution order, iterate over list looking for duplicates
        this.duplicateCount = 0
        let full_list: string = opCodeList.join(',')
        let checked_list: string[] = []

        let inBlock = false;
        let searchStr = ""

        opCodeList.forEach(opcode => {
            // Only start checking when we have a list of 5 opcodes
            if (checked_list.length > 5) {
                // Look for duplicates
                // (THERE HAS TO BE A NICER WAY OF DOING THIS
                //   Python below uses tuples, would this work in typescript?)
                if (!inBlock) {
                    // If not currently in duplicated block, then create search string from current opcodes group
                    searchStr = checked_list.join(',')
                }
                // Look for duplicate
                const reg = new RegExp(searchStr, "g")
                const count = (full_list.match(reg) || []).length;
                console.log("count", count)
                if (count > 1) {
                    // If this is the start of a duplicated then need to increment count
                    this.duplicateCount += (inBlock ? 0 : 1)
                    inBlock = true
                } else {
                    inBlock = false
                }

                // remove the first item - we're shuffling along the group of opcodes we're using for search.
                checked_list.shift()
            }
            // We keep group of opcodes we check against.
            checked_list.push(opcode)
            // Once a duplicate has been found we keep appending items to
            // our search string so duplicate is only counted once.
            searchStr += "," + opcode

        })

        return this.duplicateCount
    }

    private calculateDepth(map: Map<string, CodeBlockDuplicateInterface>, node: CodeBlockDuplicateInterface): number {
        // If we reach a node that's already been added, then start to unwind.
        if (node.depth > 0) {
            return node.depth
        }

        if (node.parent !== null) {
            if (map.has(node.parent)) {
                // Move up to parent.
                const parent_depth = this.calculateDepth(map, (map.get(node.parent) as CodeBlockDuplicateInterface))
                node.depth = parent_depth + 1;
            }
        }

        return node.depth
    }

    /**
     * Walks up the code block tree until it finds top level or node that has already been added to list
     * Then unwinds through blocks appending script array (run order)
     */
    private walkUp(map: Map<string, CodeBlockDuplicateInterface>, node: CodeBlockDuplicateInterface, opCodeList: string[]) {
        // At start of a script
        if (node.topLevel) {
            if (!node.addedToCodeList) {
                node.addedToCodeList = true;
                opCodeList.push(node.opcode)
                return;
            }
        }

        // If we reach a node that's already been added, then start to unwind.
        if (node.addedToCodeList) {
            return
        }

        if (node.parent !== null) {
            if (map.has(node.parent)) {
                // Move up to parent.
                this.walkUp(map, (map.get(node.parent) as CodeBlockDuplicateInterface), opCodeList)

                // Add the opcodes to list as we unwind..
                node.addedToCodeList = true;
                // Only add functional style opcode
                if (!node.shadow) {
                    opCodeList.push(node.opcode)
                }
            }
        }
    }
}

export default Duplication

/**
 * Hairball...
 *
class DuplicateScripts(HairballPlugin):

    """Plugin that keeps track of which scripts have been
    used more than once whithin a project."""

    def __init__(self):
        super(DuplicateScripts, self).__init__()
        self.total_duplicate = 0
        self.list_duplicate = []
        self.list_duplicate_string = []

    def finalize(self):
        """Output the duplicate scripts detected."""
        if self.total_duplicate > 0:
            print "%d duplicate scripts found" % self.total_duplicate
            for duplicate in self.list_duplicate_string:
                print duplicate

    def analyze(self, scratch):
        """Run and return the results from the DuplicateScripts plugin.
        Only takes into account scripts with more than 5 blocks"""
        scripts_set = set()
        for script in self.iter_scripts(scratch):
            #Scripts defined by user are not considered
            if script[0].type.text != 'define %s':
                blocks_list = []
                blocks_list_string = []
                for name, _, block in self.iter_blocks(script.blocks):
                    blocks_list.append(name)
                    blocks_list_string.append(block.stringify())
                blocks_tuple = tuple(blocks_list)
                if blocks_tuple in scripts_set:
                    if len(blocks_list) > 5:
                        if not blocks_list in self.list_duplicate:
                            self.total_duplicate += 1
                            self.list_duplicate.append(blocks_list)
                            self.list_duplicate_string.append(blocks_list_string)
                else:
                    scripts_set.add(blocks_tuple)
 */


