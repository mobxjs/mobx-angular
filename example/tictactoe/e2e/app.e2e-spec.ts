import { TictactoePage } from './app.po';

describe('tictactoe App', function() {
  let page: TictactoePage;

  beforeEach(() => {
    page = new TictactoePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ttt works!');
  });
});
