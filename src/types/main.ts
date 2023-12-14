export type Script = string;

export type Blocks = {
  _blocks: _BlocksObj;
  _scripts: Script[];
};

export type _BlocksObj = {
  [key: string]: {
    fields: FieldsObj;
    id: string;
    isDeadCode?: boolean;
    inputs: InputsObj;
    next: string | null;
    opcode: string;
    mutation?: {
      proccode: string;
    };
    parent: string | null;
    shadow: boolean;
    topLevel: boolean;
    [key: string]: string | null | boolean | FieldsObj | InputsObj | number | undefined | any;
  };
};

export type InputsObj = {
  [key: string]: {
    block: string;
    name: string;
    shadow: string;
    [key: string]: string | null;
  };
};

export type FieldsObj = {
  [key: string]: {
    id: string | null;
    name: string;
    value: string;
    [key: string]: string | null;
  };
};

export type Target = {
  blocks: Blocks;
  comments: any;
  currentCostumes: number;
  direction: number;
  drawableID: number;
  id: string;
  isOriginal: boolean;
  isStage: boolean;
  sprite: Sprite;
  variables: VariablesObj;
  visible: boolean;
};

export type VariablesObj = {
  id?: string;
  isCloud?: boolean;
  name?: string;
  type?: string;
  value?: number;
};

export type Sprite = {
  name: string;
};

export type ScoreName = keyof Scores | keyof DecompositionScores | keyof PatternRecAndDataRepScores | keyof GeneralisationAndAbstractionScores | keyof AlgorithmsScores | keyof AnalysisScores | keyof RepetitionScores | keyof DeadCodeScores;

export class Scores {
  'Decomposition' = new DecompositionScores();
  'Pattern Recognition and Data Representation' = new PatternRecAndDataRepScores();
  'Generalisation and Abstraction' = new GeneralisationAndAbstractionScores();
  'Algorithms' = new AlgorithmsScores();
  'Analysis' = new AnalysisScores();
  'Repetition' = new RepetitionScores();
  'Dead Code' = new DeadCodeScores();
};

export class DecompositionScores {
  'Functions' = 0;
  'Parallelism' = 0;
  'Sequencing' = 0;
}
export class PatternRecAndDataRepScores {
  'Variables and Data Structures' = 0;
  'Data Types' = 0;
  'Loops' = 0;
}

export class GeneralisationAndAbstractionScores {
  'Function Reuse' = 0;
  'Functions with Arguments' = 0;
  'Variables Instead of Literals' = 0;
}

export class AlgorithmsScores {
  'Conditionals' = 0;
  'Operators' = 0;
  'Synchronization and Messages' = 0;
}

export class AnalysisScores {
  'Naming' = 0;
  'Debugging' = 0;
  'Comments' = 0;
}

export class RepetitionScores {
  'Total Scripts Count' = 0;
  'Duplicate Scripts Count' = 0;
};

export class DeadCodeScores {
  'Total Scripts Count' = 0;
  'Dead Scripts Count' = 0;
};

// export class NamingScores {
//   'Good Names Proportion' = 0;
// }