import {
  onePointTargets_positive,
  onePointTargets_negative,
  threePointTargets_negative,
  threePointTargets_positive_1,
  threePointTargets_positive_2,
  threePointTargets_positive_3,
  threePointTargets_positive_4,
  twoPointTargets_negative,
  twoPointTargets_positive_1,
  twoPointTargets_positive_2,
} from './dummy-data';
import Parallelism from '../../models/analyzers/Parallelism';

test('Logic_one_point_pos', () => {
  const l = new Parallelism(onePointTargets_positive);
  const results = l.execute();
  const expectation = 1;
  expect(results).toBe(expectation);
});

test('Logic_one_point_neg', () => {
  const l = new Parallelism(onePointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});

test('Logic_two_point_pos_1', () => {
  const l = new Parallelism(twoPointTargets_positive_1);
  const results = l.execute();
  const expectation = 2;
  expect(results).toBe(expectation);
});

test('Logic_two_point_pos_2', () => {
  const l = new Parallelism(twoPointTargets_positive_2);
  const results = l.execute();
  const expectation = 2;
  expect(results).toBe(expectation);
});

test('Logic_two_point_neg', () => {
  const l = new Parallelism(twoPointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});

test('Logic_three_point_pos_1', () => {
  const l = new Parallelism(threePointTargets_positive_1);
  const results = l.execute();
  const expectation = 3;
  expect(results).toBe(expectation);
});

test('Logic_three_point_pos_2', () => {
  const l = new Parallelism(threePointTargets_positive_2);
  const results = l.execute();
  const expectation = 3;
  expect(results).toBe(expectation);
});

test('Logic_three_point_pos_3', () => {
  const l = new Parallelism(threePointTargets_positive_3);
  const results = l.execute();
  const expectation = 3;
  expect(results).toBe(expectation);
});

test('Logic_three_point_pos_4', () => {
  const l = new Parallelism(threePointTargets_positive_4);
  const results = l.execute();
  const expectation = 3;
  expect(results).toBe(expectation);
});

test('Logic_three_point_neg', () => {
  const l = new Parallelism(threePointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});
