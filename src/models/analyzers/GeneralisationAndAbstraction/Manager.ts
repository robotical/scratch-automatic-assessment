
import { GeneralisationAndAbstractionScores, Scores, Target, _BlocksObj } from "../../../types/main";
import Analyzer from "../../Analyzer";
import FunctionReUser from "./FunctionReUse";
import FunctionsWithArguments from "./FunctionsWithArguments";
import VariablesInsteadOfLiterals from "./VariablesInsteadOfLiterals";


class Manager extends Analyzer {
    public targets: Target[];
    public score = new GeneralisationAndAbstractionScores();
    public name: keyof Scores = "Generalisation and Abstraction";
    public static range: number[] = [(FunctionReUser.range[0] + FunctionsWithArguments.range[0] + VariablesInsteadOfLiterals.range[0]), (FunctionReUser.range[1] + FunctionsWithArguments.range[1] + VariablesInsteadOfLiterals.range[1])];

    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }

    public execute(): GeneralisationAndAbstractionScores {
        this.score['Function Reuse'] = new FunctionReUser(this.targets).execute();
        this.score['Functions with Arguments'] = new FunctionsWithArguments(this.targets).execute();
        this.score['Variables Instead of Literals'] = new VariablesInsteadOfLiterals(this.targets).execute();
        return this.score;
    }

}

export default Manager;