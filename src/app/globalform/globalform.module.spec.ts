import { GlobalformModule } from './globalform.module';

describe('GlobalformModule', () => {
  let globalformModule: GlobalformModule;

  beforeEach(() => {
    globalformModule = new GlobalformModule();
  });

  it('should create an instance', () => {
    expect(globalformModule).toBeTruthy();
  });
});
