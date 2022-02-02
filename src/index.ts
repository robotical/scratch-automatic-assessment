import Abstraction from './models/analyzers/Abstraction';
import DataRepresentation from './models/analyzers/DataRepresentation';
import FlowControl from './models/analyzers/FlowControl';
import Interactivity from './models/analyzers/Interactivity';
import Logic from './models/analyzers/Logic';
import Parallelism from './models/analyzers/Parallelism';
import Synchronisation from './models/analyzers/Synchronisation';
import AssessmentsManager from './models/AssessmentsManager';
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
