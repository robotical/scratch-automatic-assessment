import Abstraction from './models/analyzers/Abstraction';
import AttributeInitialisation from './models/analyzers/AttributeInitialisation';
import BadNaming from './models/analyzers/BadNaming';
import DataRepresentation from './models/analyzers/DataRepresentation';
import DeadCode from './models/analyzers/DeadCode';
import Duplication from './models/analyzers/Duplication';
import FlowControl from './models/analyzers/FlowControl';
import Interactivity from './models/analyzers/Interactivity';
import Logic from './models/analyzers/Logic';
import Parallelism from './models/analyzers/Parallelism';
import Synchronisation from './models/analyzers/Synchronisation';
import AssessmentsManager from './models/AssessmentsManager';
import BadHabitsManager from './models/BadHabitsManager';
import { Target } from './types/main';

export const Greeter = (name: string) => `Hello ${name}`;

export const assess = (targets: Target[]) => {
  const am = new AssessmentsManager();
  am.registerAnalyzer(new DataRepresentation(targets));
  am.registerAnalyzer(new FlowControl(targets));
  am.registerAnalyzer(new Interactivity(targets));
  am.registerAnalyzer(new Logic(targets));
  am.registerAnalyzer(new Parallelism(targets));
  am.registerAnalyzer(new Synchronisation(targets));
  am.registerAnalyzer(new Abstraction(targets));
  return am.analyze();
};

export const assessBadHabits = (targets: Target[]) => {
  const bh = new BadHabitsManager();
  bh.registerAnalyzer(new BadNaming(targets));
  bh.registerAnalyzer(new DeadCode(targets));
  // bh.registerAnalyzer(new AttributeInitialisation(targets));
  bh.registerAnalyzer(new Duplication(targets));
  return bh.analyze();
}
