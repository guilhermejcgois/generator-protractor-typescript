import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class AppPage {

  private defaultRootCssSelector = 'app-root';
  private _rootCssSelector = this.defaultRootCssSelector;

  set rootCssSelector(selector: string) {
    this._rootCssSelector = selector || this.defaultRootCssSelector;
  }

  navigateTo(route = '') {
    return browser.get('/' + route);
  }

  refresh() {
    return browser.driver.navigate().refresh();
  }

  get(selector: number|string, child = '') {
    if (typeof selector === 'number') {
      return this.getByIndex(selector as number, child);
    } else if (typeof selector === 'string') {
      return this.getById(selector as string, child);
    }
    return null;
  }

  getAll(cssSelector = this._rootCssSelector) {
    return element.all(by.css(cssSelector));
  }

  getById(id: string, child: string, cssSelector = this._rootCssSelector) {
    return this.query(cssSelector, child);
  }

  getByIndex(index: number, child: string, cssSelector = this._rootCssSelector) {
    return this.query(cssSelector, child, false).get(index);
  }

  getUrl() {
    browser.waitForAngular();
    return browser.getCurrentUrl();
  }

  waitFor() {
    browser.waitForAngular();
  }

  private query(parent: string, child = '', single = true): ElementFinder | ElementArrayFinder {
    if (child) {
      child = ' ' + child;
    }

    console.log('Querying for "' + parent + child + '" in current opened page...');

    const finder = (single) ? element : element.all;
    return finder(by.css(parent + child));
  }
}
