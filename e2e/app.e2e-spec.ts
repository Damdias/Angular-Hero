import { NgheroAppPage } from './app.po';

describe('nghero-app App', () => {
  let page: NgheroAppPage;

  beforeEach(() => {
    page = new NgheroAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
