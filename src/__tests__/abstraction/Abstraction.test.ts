import Abstraction from '../../models/analyzers/Abstraction';
import {
  onePointTargets_negative,
  onePointTargets_positive,
  threePointTargets_negative,
  threePointTargets_positive,
  twoPointTargets_negative,
  twoPointTargets_positive,
} from './dummy-data';

test('Logic_one_point_pos', () => {
  const l = new Abstraction(onePointTargets_positive);
  const results = l.execute();
  const expectation = 1;
  expect(results).toBe(expectation);
});

test('Logic_one_point_neg', () => {
  const l = new Abstraction(onePointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});

test('Logic_two_point_pos', () => {
  const l = new Abstraction(twoPointTargets_positive);
  const results = l.execute();
  const expectation = 2;
  expect(results).toBe(expectation);
});

test('Logic_two_point_neg', () => {
  const l = new Abstraction(twoPointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});

test('Logic_three_point_pos', () => {
  const l = new Abstraction(threePointTargets_positive);
  const results = l.execute();
  const expectation = 3;
  expect(results).toBe(expectation);
});

test('Logic_three_point_neg', () => {
  const l = new Abstraction(threePointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});
