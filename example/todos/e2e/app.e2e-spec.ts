import { ExamplePage } from './app.po';

describe('example App', function() {
  let page: ExamplePage;

  beforeEach(() => {
    page = new ExamplePage();
  });

  it('should display message saying todos', async () => {
    page.navigateTo();
    expect(await page.getParagraphText()).toEqual('todos');
  });
});
