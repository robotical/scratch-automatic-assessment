import Synchronisation from '../../models/analyzers/Synchronisation';

import {
  onePointTargets_negative,
  onePointTargets_positive,
  threePointTargets_negative_1,
  threePointTargets_negative_2,
  threePointTargets_positive,
  twoPointTargets_negative,
  twoPointTargets_positive,
} from './dummy-data';

test('Logic_one_point_pos', () => {
  const l = new Synchronisation(onePointTargets_positive);
  const results = l.execute();
  const expectation = 1;
  expect(results).toBe(expectation);
});

test('Logic_one_point_neg', () => {
  const l = new Synchronisation(onePointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});

test('Logic_two_point_pos', () => {
  const l = new Synchronisation(twoPointTargets_positive);
  const results = l.execute();
  const expectation = 2;
  expect(results).toBe(expectation);
});

test('Logic_two_point_neg', () => {
  const l = new Synchronisation(twoPointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});

test('Logic_three_point_pos', () => {
  const l = new Synchronisation(threePointTargets_positive);
  const results = l.execute();
  const expectation = 3;
  expect(results).toBe(expectation);
});

test('Logic_three_point_neg_1', () => {
  const l = new Synchronisation(threePointTargets_negative_1);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});

test('Logic_three_point_neg_2', () => {
  const l = new Synchronisation(threePointTargets_negative_2);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});
