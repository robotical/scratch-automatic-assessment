import { Target } from '../../types/main';
import { DEFINITION_OF_BLOCK_OPCODE, CLONE_OPCODE } from '../../models/analyzers/Abstraction';

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
          next: '',
          opcode: '',
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
          opcode: DEFINITION_OF_BLOCK_OPCODE,
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
          opcode: CLONE_OPCODE,
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
