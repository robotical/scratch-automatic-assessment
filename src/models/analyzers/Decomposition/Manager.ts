
import { DecompositionScores, Scores, Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import Functions from "./Functions";
import Parallelism from "./Parallelism";
import Sequencing from "./Sequencing";


class Manager extends Analyzer {
    public targets: Target[];
    public score = new DecompositionScores();
    public name: keyof Scores = "Decomposition";
    public static range: number[] = [(Functions.range[0] + Parallelism.range[0] + Sequencing.range[0]), (Functions.range[1] + Parallelism.range[1] + Sequencing.range[1])];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): DecompositionScores {
        this.score.Functions = new Functions(this.targets).execute();
        this.score.Parallelism = new Parallelism(this.targets).execute();
        this.score.Sequencing = new Sequencing(this.targets).execute();
        return this.score;
    }

}

export default Manager;