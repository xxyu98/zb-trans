import { outOfChina } from '../index';
test('cs outOfChina', () => {
  expect(outOfChina(120.18048277777778, 30.330782222222222)).toBe(false);
});