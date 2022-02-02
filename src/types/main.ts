export type Script = string;

export type Blocks = {
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
    [key: string]: string | null | boolean | FieldsObj | InputsObj | number;
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
  comments: object;
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
