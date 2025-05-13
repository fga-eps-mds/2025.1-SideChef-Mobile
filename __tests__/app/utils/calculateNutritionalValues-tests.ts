import calculateNutritionalValues from '../../../app/utils/calculateNutritionalValues';

describe('Test calories estimation functions', () => {
  test('should return the total value of callories', () => {
    expect(calculateNutritionalValues.calculateCalories(100, 50)).toBe(5000.0);
});
})