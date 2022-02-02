import DataRepresentation from '../../models/analyzers/DataRepresentation';
import {
  onePointTargets_negative,
  onePointTargets_positive,
  threePointTargets_negative,
  threePointTargets_positive,
  twoPointTargets_negative,
  twoPointTargets_positive_1,
  twoPointTargets_positive_2,
} from './dummy-data';

test('Logic_one_point_pos', () => {
  const l = new DataRepresentation(onePointTargets_positive);
  const results = l.execute();
  const expectation = 1;
  expect(results).toBe(expectation);
});

test('Logic_one_point_neg', () => {
  const l = new DataRepresentation(onePointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});

test('Logic_two_point_pos_1', () => {
  const l = new DataRepresentation(twoPointTargets_positive_1);
  const results = l.execute();
  const expectation = 2;
  expect(results).toBe(expectation);
});

test('Logic_two_point_pos_2', () => {
  const l = new DataRepresentation(twoPointTargets_positive_2);
  const results = l.execute();
  const expectation = 2;
  expect(results).toBe(expectation);
});

test('Logic_two_point_neg', () => {
  const l = new DataRepresentation(twoPointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});

test('Logic_three_point_pos', () => {
  const l = new DataRepresentation(threePointTargets_positive);
  const results = l.execute();
  const expectation = 3;
  expect(results).toBe(expectation);
});

test('Logic_three_point_neg', () => {
  const l = new DataRepresentation(threePointTargets_negative);
  const results = l.execute();
  const expectation = 0;
  expect(results).toBe(expectation);
});
