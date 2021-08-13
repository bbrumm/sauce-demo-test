//jshint esversion:8
const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const LoginPage = require('../pages/LoginPage');


describe('Login Page for Standard User', function() {
  let browser;
  let page;
  this.timeout(5000); //Timeout set as sometimes it takes a while for the URL to load

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('https://www.saucedemo.com/');
  });

  afterEach(async () => {
    await browser.close();
  });

  it('Page should have the correct title', function(done) {
    (async () => {
      const loginPage = new LoginPage(page);
      let actualTitle = await loginPage.getTitle();
      expect(actualTitle).to.eql('Swag Labs');
    })().then(done);
  });

  it('Page with incorrect title', function(done) {
    (async () => {
      const loginPage = new LoginPage(page);
      let actualTitle = await loginPage.getTitle();
      expect(actualTitle).to.not.eql('Wrong Value');
    })().then(done);
  });
  

  it('Username field exists', async () => {
    const loginPage = new LoginPage(page);
    expect(await loginPage.usernameFieldExists()).to.eql(true);
  });

  it('Password field exists', async () => {
    const loginPage = new LoginPage(page);
    expect(await loginPage.passwordFieldExists()).to.eql(true);
  });


  /*
  Tests to write:
  Enter username, no password, login, see error
  No username or password, login, see error
  No username, enter password, login, see error
  Username with wrong password, see error
  Username and password correct, login, see next page
  */

  it('Standard user login', async () => {
    const loginPage = new LoginPage(page);
    //const usernameField = loginPage.getUsernameField();
    //console.log('username field:' + usernameField);
    await page.type('input[id=user-name]', 'standard-user');
    let usernameFieldValue = await page.$eval('input[id=user-name]', ele => ele.value);

    expect(usernameFieldValue).to.eql('standard-user');
  });


});
