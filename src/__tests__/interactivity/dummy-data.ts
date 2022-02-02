import { Target } from '../../types/main';
import { GREEN_FLAG_CLICKED_OPCODE, SPRITE_CLICKED_OPCODE } from '../../models/analyzers/Interactivity';

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
          opcode: GREEN_FLAG_CLICKED_OPCODE,
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
          opcode: GREEN_FLAG_CLICKED_OPCODE,
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
          next: 'there is next',
          opcode: SPRITE_CLICKED_OPCODE,
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
          next: null,
          opcode: SPRITE_CLICKED_OPCODE,
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
