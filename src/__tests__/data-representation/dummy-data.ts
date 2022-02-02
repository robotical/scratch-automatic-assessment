import { Target } from '../../types/main';
import {
  CHANGE_VARIABLE_OPCODE,
  LIST_OPCODE_PREFIX,
  MOTION_OPCODE_PREFIX,
  SET_VARIABLE_OPCODE,
  LIST_OPCODE_STRING,
} from '../../models/analyzers/DataRepresentation';

export const onePointTargets_positive: Target[] = [
  {
    blocks: {
      _blocks: {},
      _scripts: [],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
  {
    blocks: {
      _blocks: {
        whatever: {
          fields: { whatever: { id: '', name: '', value: '' } },
          id: '',
          inputs: { whatever: { block: '', name: '', shadow: '' } },
          next: 'there is next',
          opcode: MOTION_OPCODE_PREFIX,
          parent: '',
          shadow: true,
          topLevel: true,
        },
      },
      _scripts: ['b', 'a'],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
];

export const onePointTargets_negative: Target[] = [
  {
    blocks: {
      _blocks: {},
      _scripts: [],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
  {
    blocks: {
      _blocks: {
        whatever: {
          fields: { whatever: { id: '', name: '', value: '' } },
          id: '',
          inputs: { whatever: { block: '', name: '', shadow: '' } },
          next: '',
          opcode: '',
          parent: '',
          shadow: true,
          topLevel: true,
        },
      },
      _scripts: ['b'],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
];

export const twoPointTargets_positive_1: Target[] = [
  {
    blocks: {
      _blocks: {},
      _scripts: [],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
  {
    blocks: {
      _blocks: {
        whatever: {
          fields: { whatever: { id: '', name: '', value: '' } },
          id: '',
          inputs: { whatever: { block: '', name: '', shadow: '' } },
          next: '',
          opcode: CHANGE_VARIABLE_OPCODE,
          parent: '',
          shadow: true,
          topLevel: true,
        },
      },
      _scripts: ['b', 'a'],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
];

export const twoPointTargets_positive_2: Target[] = [
  {
    blocks: {
      _blocks: {},
      _scripts: [],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
  {
    blocks: {
      _blocks: {
        whatever: {
          fields: { whatever: { id: '', name: '', value: '' } },
          id: '',
          inputs: { whatever: { block: '', name: '', shadow: '' } },
          next: '',
          opcode: SET_VARIABLE_OPCODE,
          parent: '',
          shadow: true,
          topLevel: true,
        },
      },
      _scripts: ['b', 'a'],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
];

export const twoPointTargets_negative: Target[] = [
  {
    blocks: {
      _blocks: {},
      _scripts: [],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
  {
    blocks: {
      _blocks: {
        whatever: {
          fields: { whatever: { id: '', name: '', value: '' } },
          id: '',
          inputs: {},
          next: '',
          opcode: '',
          parent: '',
          shadow: true,
          topLevel: true,
        },
      },
      _scripts: ['b'],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
];

export const threePointTargets_positive: Target[] = [
  {
    blocks: {
      _blocks: {},
      _scripts: [],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
  {
    blocks: {
      _blocks: {
        whatever: {
          fields: { whatever: { id: '', name: '', value: '' } },
          id: '',
          inputs: { whatever: { block: '', name: '', shadow: '' } },
          next: '',
          opcode: LIST_OPCODE_PREFIX + 'whatever' + LIST_OPCODE_STRING,
          parent: '',
          shadow: true,
          topLevel: true,
        },
      },
      _scripts: ['b', 'a'],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
];

export const threePointTargets_negative: Target[] = [
  {
    blocks: {
      _blocks: {},
      _scripts: [],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
  {
    blocks: {
      _blocks: {
        whatever: {
          fields: { whatever: { id: '', name: '', value: '' } },
          id: '',
          inputs: {},
          next: '',
          opcode: '',
          parent: '',
          shadow: true,
          topLevel: true,
        },
      },
      _scripts: ['b'],
    },
    comments: [],
    currentCostumes: 0,
    direction: 0,
    drawableID: 0,
    id: '',
    isOriginal: true,
    isStage: false,
    sprite: { name: '' },
    variables: { id: '', isCloud: true, name: '', type: '', value: 0 },
    visible: true,
  },
];
