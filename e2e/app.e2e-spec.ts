import { NocreepyPage } from './app.po';

describe('nocreepy App', () => {
  let page: NocreepyPage;

  beforeEach(() => {
    page = new NocreepyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
