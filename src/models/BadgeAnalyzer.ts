import { BadgesCounts } from "../types/badges";
import { Target } from "../types/main";

abstract class BadgeAnalyzer {
  static progressionRanges: number[][]; // [[0, 1], [1, 20], [20, 100]]
  static count: number;
  abstract newSessionCount: number; // difference between current count and previous count
  abstract star: number;
  abstract targets: Target[];
  abstract name: keyof BadgesCounts;
  abstract wasCountMoreThanMax: boolean;
  abstract setCount(count: number): void;

    public abstract execute(): number;
}

export default BadgeAnalyzer;
