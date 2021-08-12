//jshint esversion:8
const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const LoginPage = require('../pages/LoginPage');


describe('Login Page for Standard User', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('https://www.saucedemo.com/');
  });

  afterEach(async () => {
    await browser.close();
  });

  it('should have the correct title (with timeout)', function(done) {
    this.timeout(5000);
    (async () => {
      const loginPage = new LoginPage(page);
      let actualTitle = await loginPage.getTitle();
      expect(actualTitle).to.eql('Swag Labs');
    })().then(done);
  });

  it('incorrect title test', function(done) {
    this.timeout(5000);
    (async () => {
      const loginPage = new LoginPage(page);
      let actualTitle = await loginPage.getTitle();
      expect(actualTitle).to.not.eql('Wrong Value');
    })().then(done);
  });
  

  it('username field exists', async () => {
    const loginPage = new LoginPage(page);
    expect(await loginPage.usernameFieldExists()).to.eql(true);
  });

  it('password field exists', async () => {
    const loginPage = new LoginPage(page);
    expect(await loginPage.passwordFieldExists()).to.eql(true);
  });

});
