import Logic from '../../models/analyzers/Logic';
import {
  onePointTargets_positive,
  onePointTargets_negative,
  twoPointsTargets_positive,
  twoPointsTargets_negative,
  threePointsTargets_positive_1,
  threePointsTargets_positive_2,
  threePointsTargets_positive_3,
  threePointsTargets_negative,
} from './dummy-data';

test('Logic_one_point_pos', () => {
  const l = new Logic(onePointTargets_positive);
  const results = l.execute();
  const expectation = 1;
  expect(results).toBe(expectation);
});

test('Logic_one_point_neg', () => {
  const l = new Logic(onePointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});

test('Logic_two_points_pos', () => {
  const l = new Logic(twoPointsTargets_positive);
  const results = l.execute();
  const expectation = 2;
  expect(results).toBe(expectation);
});

test('Logic_two_points_neg', () => {
  const l = new Logic(twoPointsTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});

test('Logic_three_points_pos_1', () => {
  const l = new Logic(threePointsTargets_positive_1);
  const results = l.execute();
  const expectation = 3;
  expect(results).toBe(expectation);
});

test('Logic_three_points_pos_2', () => {
  const l = new Logic(threePointsTargets_positive_2);
  const results = l.execute();
  const expectation = 3;
  expect(results).toBe(expectation);
});

test('Logic_three_points_pos_3', () => {
  const l = new Logic(threePointsTargets_positive_3);
  const results = l.execute();
  const expectation = 3;
  expect(results).toBe(expectation);
});

test('Logic_three_points_neg', () => {
  const l = new Logic(threePointsTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});
