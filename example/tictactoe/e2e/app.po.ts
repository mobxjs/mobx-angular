import { browser, element, by } from 'protractor';

export class TictactoePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ttt-root h1')).getText();
  }
}
