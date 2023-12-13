import { Target } from "../../types/main";
import Analyzer from "../Analyzer";

const OPTCODE_DATA_VARIABLE = "data_variable"


class BadNaming extends Analyzer {
    readonly name: string = 'BadNaming'
    score: number;
    public static readonly range: number[] = [0, 3];
    targets: Target[]

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
        this.score = 0;
    }

    public execute(): number {
        const badNames: string[] = ["sprite", "myvar",]
        let badNameCount = 0
        let variableCount = 0

        for (const target of this.targets) {
            for (const _blockKey of Object.keys(target.blocks._blocks)) {
                const block = target.blocks._blocks[_blockKey]
                // Check variable name (if variable)
                if (block.opcode === OPTCODE_DATA_VARIABLE) {
                    if (block.fields["VARIABLE"]["value"] != undefined) {
                        ++variableCount;
                        const variableName = this.replaceAll(block.fields["VARIABLE"]["value"].toLowerCase(), " ", "");
                        const findIndex = badNames.findIndex((name: string) => (variableName.substring(0, name.length) === name))
                        badNameCount += (findIndex === -1) ? 0 : 1
                    }
                }
            }
        }

        return badNameCount
    }

    private replaceAll(str: string, find: string, replace: string) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
}


export default BadNaming;

/**
 * Hairball...
 *
 class SpriteNaming(HairballPlugin):

    """Plugin that keeps track of how often sprites default

    names (like Sprite1, Sprite2...) are used within a project.

    """

    def __init__(self):
        super(SpriteNaming, self).__init__()
        self.total_default = 0
        self.list_default = []
        self.default_names = ["Sprite","Objeto"]

    def finalize(self):
        """Output the default sprite names found in the project."""
        print("%d default sprite names found:" % self.total_default)
        for name in self.list_default:
            print name

    def analyze(self, scratch):
        """Run and return the results from the SpriteNaming plugin."""
        for sprite in self.iter_sprites(scratch):
            for default in self.default_names:
                if default in sprite.name:
                    self.total_default += 1
                    self.list_default.append(sprite.name)

class BackdropNaming(HairballPlugin):

    """Plugin that keeps track of how often backdrop default

    names (like backdrop1, backdrop2...) are used within a project.

    """

    def __init__(self):
        super(BackdropNaming, self).__init__()
        self.total_default = 0
        self.list_default = []
        self.default_names = ["backdrop"]

    def finalize(self):
        """Output the default backdrop names found in the project."""
        print("%d default backgdrop names found" % self.total_default)
        for name in self.list_default:
            print name

    def analyze(self, scratch):
        """Run and return the results from the BackdropNaming plugin."""
        for background in scratch.stage.backgrounds:
            for default in self.default_names:
                if default in background.name:
                    self.total_default += 1
                    self.list_default.append(background.name)
 */