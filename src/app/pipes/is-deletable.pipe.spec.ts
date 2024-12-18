import { IsDeletablePipe } from './is-deletable.pipe';

describe('IsDeletablePipe', () => {
  it('create an instance', () => {
    const pipe = new IsDeletablePipe();
    expect(pipe).toBeTruthy();
  });
});
