
import { AlgorithmsScores, Scores, Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import Conditionals from "./Conditionals";
import Operators from "./Operators";
import SyncAndMessages from "./SynchAndMessages";


class Manager extends Analyzer {
    public targets: Target[];
    public score = new AlgorithmsScores();
    public name: keyof Scores = "Algorithms";
    public static range: number[] = [(Conditionals.range[0] + Operators.range[0] + SyncAndMessages.range[0]), (Conditionals.range[1] + Operators.range[1] + SyncAndMessages.range[1])];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): AlgorithmsScores {
        this.score.Conditionals = new Conditionals(this.targets).execute();
        this.score.Operators = new Operators(this.targets).execute();
        this.score['Synchronization and Messages'] = new SyncAndMessages(this.targets).execute();
        return this.score;
    }

}

export default Manager;