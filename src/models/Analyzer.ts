import { Target } from '../types/main';

abstract class Analyzer {
  abstract score: number | object;
  static readonly range: number[];
  abstract targets: Target[];
  abstract name: string;

  public abstract execute(): number | object;
}

export default Analyzer;
