import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimePipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform()', () => {
    it('should transfrom number into time', () => {
      const pipe = new TimePipe();
      const result = pipe.transform(125);

      expect(result).toBe('02h 05min');
    });
  });
});
