//jshint esversion:8
class LoginPage {

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

    async getUsernameField() {
      return await this.page.waitForSelector('input[id=user-name]');
      //return await this.checkIfElementExists('user-name');
    }

    /*
    async searchFor(word) {
        await this.page.type('input[id=search_form_input_homepage]', word);
        await this.page.click('input[type="submit"]');
    }
    */

}

module.exports = LoginPage;
