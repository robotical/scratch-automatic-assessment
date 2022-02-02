import { Target } from '../../types/main';
import { WAIT_OPCODE, STOP_OPCODE, WAIT_UNTIL_OPCODE } from '../../models/analyzers/Synchronisation';

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
          opcode: WAIT_OPCODE,
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
          next: null,
          opcode: WAIT_OPCODE,
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

export const twoPointTargets_positive: Target[] = [
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
          opcode: STOP_OPCODE,
          parent: 'there is parent',
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
          inputs: { whatever: { block: '', name: '', shadow: '' } },
          next: '',
          opcode: STOP_OPCODE,
          parent: null,
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
          next: 'there is next',
          opcode: WAIT_UNTIL_OPCODE,
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

export const threePointTargets_negative_1: Target[] = [
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
          next: 'there is next',
          opcode: WAIT_UNTIL_OPCODE,
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

export const threePointTargets_negative_2: Target[] = [
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
          fields: {},
          id: '',
          inputs: { whatever: { block: '', name: '', shadow: '' } },
          next: null,
          opcode: WAIT_UNTIL_OPCODE,
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
