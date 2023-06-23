import { bytesToMegaBytes } from './utils';

describe('utils/utils', () => {
  describe('bytesToMegaBytes', () => {
    it('calculates correctly', () => {
      expect(bytesToMegaBytes(3000000)).toBe(2.86102294921875);
      expect(bytesToMegaBytes(300)).toBe(0.000286102294921875);
      expect(bytesToMegaBytes(5000000)).toBe(4.76837158203125);
      expect(bytesToMegaBytes(23)).toBe(0.00002193450927734375);
      expect(bytesToMegaBytes(200000000)).toBe(190.73486328125);
    });
  });
});
