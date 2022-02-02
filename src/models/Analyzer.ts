import { Target } from '../types/main';

abstract class Analyzer {
  abstract score: number;
  abstract targets: Target[];

  public abstract execute(): number;
}

export default Analyzer;
