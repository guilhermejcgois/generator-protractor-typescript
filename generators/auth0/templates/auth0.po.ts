import { browser, by, element, protractor, ElementFinder } from 'protractor';

const Auth0FormSelector = 'form.auth0-lock-widget';
const InputEmailSelector = 'input.auth0-lock-input[type="email"][name="email"]';
const InputPaswordSelector = 'input.auth0-lock-input[type="password"][name="password"]';

const EC = protractor.ExpectedConditions;

export class <%= pageObjectClass %> {
  emailInput: ElementFinder = null;
  passwordInput: ElementFinder = null;
  form: ElementFinder = null;

  constructor () {
    this.emailInput = element(by.css(InputEmailSelector));
    this.passwordInput = element(by.css(InputPaswordSelector));
    this.form = element(by.css(Auth0FormSelector));
  }

  signin = (email: string, password: string) => this.fillAndSubmitForm(email, password)

  wait() { return browser.driver.wait(EC.visibilityOf(this.emailInput)); }

  private fillAndSubmitForm = (email: string, password: string, name?: string) => {
    browser.driver.wait(EC.visibilityOf(this.emailInput));
    this.emailInput.clear();
    this.emailInput.sendKeys(email);

    this.passwordInput.clear();
    this.passwordInput.sendKeys(password);

    return this.form.submit();
  }
}
