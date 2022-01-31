import { Target } from "../types/main";

abstract class Analyzer {

  constructor(targets: Target[]) {}

  public abstract execute(): number;
}

export default Analyzer;
