
import { AnalysisScores, Scores, Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import Comments from "./Comments";
import Debugging from "./Debugging";
import Naming from "./Naming";


class Manager extends Analyzer {
    public targets: Target[];
    public score = new AnalysisScores();
    public name: keyof Scores = "Analysis";
    public static range: number[] = [(Comments.range[0] + Debugging.range[0] + Naming.range[0]), (Comments.range[1] + Debugging.range[1] + Naming.range[1])];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): AnalysisScores {
        this.score.Comments = new Comments(this.targets).execute();
        this.score.Debugging = new Debugging(this.targets).execute();
        this.score.Naming = new Naming(this.targets).execute();
        return this.score;
    }

}

export default Manager;