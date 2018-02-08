import { MA2TodoAppPage } from './app.po';

describe('ma2-todo-app App', () => {
  let page: MA2TodoAppPage;

  beforeEach(() => {
    page = new MA2TodoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
