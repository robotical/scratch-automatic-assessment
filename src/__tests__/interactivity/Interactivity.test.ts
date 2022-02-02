import Interactivity from '../../models/analyzers/Interactivity';
import {
  onePointTargets_negative,
  onePointTargets_positive,
  twoPointTargets_negative,
  twoPointTargets_positive,
} from './dummy-data';

test('Logic_one_point_pos', () => {
  const l = new Interactivity(onePointTargets_positive);
  const results = l.execute();
  const expectation = 1;
  expect(results).toBe(expectation);
});

test('Logic_one_point_neg', () => {
  const l = new Interactivity(onePointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});

test('Logic_two_point_pos', () => {
  const l = new Interactivity(twoPointTargets_positive);
  const results = l.execute();
  const expectation = 2;
  expect(results).toBe(expectation);
});

test('Logic_two_point_neg', () => {
  const l = new Interactivity(twoPointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});
