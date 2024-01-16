import { BadgesCounts } from '../types/badges';
import BadgeAnalyzer from './BadgeAnalyzer';

class BadgesManager {
  public analyzers: BadgeAnalyzer[];
  static counts: BadgesCounts = new BadgesCounts();
  static haveBadgesBeenInitialised: boolean = true; // true for testing
  constructor() {
    this.analyzers = [];
  }

  public registerAnalyzer(analyzer: BadgeAnalyzer) {
    this.analyzers.push(analyzer);
  }

  public analyze() {
    if (!BadgesManager.haveBadgesBeenInitialised) {
      console.warn('BadgesManager counts have not been initialised');
      return BadgesManager.counts;
    }
    this.analyzers.forEach((analyzer: BadgeAnalyzer) => {
      const score = analyzer.execute();
      if (analyzer.wasCountMoreThanMax) {
        const star = analyzer.star - 1;
        const analyzerName = analyzer.name;
        BadgesManager.counts[analyzerName][star] += score;
      } 
    });
    return BadgesManager.counts;
  }

  static initialiseBadgeCounts(counts: BadgesCounts): void {
    BadgesManager.counts = counts;
    BadgesManager.haveBadgesBeenInitialised = true;
  }

  static resetBadgeCounts(): void {
    BadgesManager.counts = new BadgesCounts();
    BadgesManager.haveBadgesBeenInitialised = false;
  }
}

export default BadgesManager;
