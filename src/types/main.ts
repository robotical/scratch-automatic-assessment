export type Script = string;

export type Block = {
  _blocks: _BlocksObj;
  _scripts: Script[];
};

export type _BlocksObj = {
  [key: string]: {
    fields: FieldsObj;
    id: string;
    inputs: InputsObj;
    next: string | null;
    opcode: string;
    parent: string | null;
    shadow: boolean;
    topLevel: boolean;
  };
};

export type InputsObj = {
  [key: string]: {
    block: string;
    name: string;
    shadow: string;
  };
};

export type FieldsObj = {
  [key: string]: {
    id: string | null;
    name: string;
    value: string;
  };
};

export type Target = {
  blocks: Block;
  comments: any[];
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
  id: string;
  isCloud: boolean;
  name: string;
  type: string;
  value: number;
};

export type Sprite = {
  name: string;
};
