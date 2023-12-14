
import { PatternRecAndDataRepScores, Scores, Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import DataTypes from "./DataTypes";
import Loops from "./Loops";
import VariablesAndDataStructures from "./VariablesAndDataStructures";
import VariablesInsteadOfLiterals from "./VariablesAndDataStructures";


class Manager extends Analyzer {
    public targets: Target[];
    public score = new PatternRecAndDataRepScores();
    public name: keyof Scores = "Pattern Recognition and Data Representation";
    public static range: number[] = [(DataTypes.range[0] + Loops.range[0] + VariablesAndDataStructures.range[0] + VariablesInsteadOfLiterals.range[0]), (DataTypes.range[1] + Loops.range[1] + VariablesAndDataStructures.range[1] + VariablesInsteadOfLiterals.range[1])];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): PatternRecAndDataRepScores {
        this.score['Data Types'] = new DataTypes(this.targets).execute();
        this.score['Loops'] = new Loops(this.targets).execute();
        this.score['Variables and Data Structures'] = new VariablesInsteadOfLiterals(this.targets).execute();
        return this.score;
    }

}

export default Manager;