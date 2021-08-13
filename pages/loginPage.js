//jshint esversion:8
class LoginPage {

  loginButtonSelector = 'input[id=login-button]';
  errorMessageBoxSelector = '#login_button_container > div > form > div.error-message-container.error';
  errorMessageTextSelector = '#login_button_container > div > form > div.error-message-container.error > h3';

    constructor(page) {
        this.page = page;
    }

    async getTitle() {
        return this.page.title();
    }

    async usernameFieldExists() {
      //return await this.page.waitForSelector('input[id=user-name]') !== null;
      return await this.checkIfElementExists('user-name');
    }

    async passwordFieldExists() {
      //return await this.page.waitForSelector('input[id=password]') !== null;
      return await this.checkIfElementExists('password');
    }

    async checkIfElementExists(elementID) {
      return await this.page.waitForSelector('input[id='+ elementID +']') !== null;
    }

    getUsernameField() {
      return 'input[id=user-name]';
    }

    getPasswordField() {
      return 'input[id=password]';
    }

    /*
    getLoginButton() {
      return 'input[id=login-button]';
    }
    */

    /*
    async searchFor(word) {
        await this.page.type('input[id=search_form_input_homepage]', word);
        await this.page.click('input[type="submit"]');
    }
    */

}

module.exports = LoginPage;
