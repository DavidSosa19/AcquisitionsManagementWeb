import { UnitNamePipe } from './pipes/unit-name.pipe';

describe('UnitNamePipe', () => {
  it('create an instance', () => {
    const pipe = new UnitNamePipe();
    expect(pipe).toBeTruthy();
  });
});
