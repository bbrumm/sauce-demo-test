//jshint esversion:8
const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const LoginPage = require('../pages/LoginPage');

//Account details
const standardUser = 'standard_user';
const allUserPasswords = 'secret_sauce';

//Error message
const expectedErrorMessageTextColour = 'rgb(255, 255, 255)';
const expectedErrorMessageBackgroundColour = 'rgb(226, 35, 26)';


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
  Enter username, no password, login, see error (done)
  No username or password, login, see error
  No username, enter password, login, see error
  Username with wrong password, see error
  Username and password correct, login, see next page (done)
  */

  it('Username field entry', async () => {
    const loginPage = new LoginPage(page);
    await page.type(loginPage.getUsernameField(), standardUser);
    let usernameFieldValue = await page.$eval(loginPage.getUsernameField(), ele => ele.value);
    expect(usernameFieldValue).to.eql(standardUser);
  });

  it('Standard user login', async () => {
    const loginPage = new LoginPage(page);
    await page.type(loginPage.getUsernameField(), standardUser);
    await page.type(loginPage.getPasswordField(), allUserPasswords);

    //Login
    await page.click(loginPage.loginButtonSelector);

    //Wait for page to load
    let pageTitleSelector = '#header_container > div.header_secondary_container > span';
    await page.waitForSelector(pageTitleSelector);

    //Get page title
    let pageTitle = await page.$eval(pageTitleSelector, ele => ele.textContent);

    //let usernameFieldValue = await page.$eval(loginPage.getUsernameField(), ele => ele.value);
    expect(pageTitle).to.eql('Products');
  });

  it('Incorrect username with no password', async () => {
    const loginPage = new LoginPage(page);
    await page.type(loginPage.getUsernameField(), 'some-other-user');
    //await page.type(loginPage.getPasswordField(), allUserPasswords);

    //Login
    await page.click(loginPage.loginButtonSelector);

    //Wait for error message
    await page.waitForSelector(loginPage.errorMessageBoxSelector);

    //Get error message
    let errorMessage = await page.$eval(loginPage.errorMessageTextSelector, ele => ele.textContent);
    let errorMessageTextColour = await page.$eval(loginPage.errorMessageTextSelector, ele => getComputedStyle(ele).getPropertyValue('color'));
    let errorMessageBackgroundColour = await page.$eval(loginPage.errorMessageBoxSelector, ele => getComputedStyle(ele).getPropertyValue('background-color'));

    expect(errorMessage).to.eql('Epic sadface: Password is required');
    expect(errorMessageTextColour).to.eql(expectedErrorMessageTextColour);
    expect(errorMessageBackgroundColour).to.eql(expectedErrorMessageBackgroundColour);
  });

  it('Missing username and password', async () => {
    const loginPage = new LoginPage(page);
    await page.type(loginPage.getUsernameField(), '');
    //await page.type(loginPage.getPasswordField(), allUserPasswords);

    //Login
    await page.click(loginPage.loginButtonSelector);

    //Wait for error message
    await page.waitForSelector(loginPage.errorMessageBoxSelector);

    //Get error message
    let errorMessage = await page.$eval(loginPage.errorMessageTextSelector, ele => ele.textContent);
    let errorMessageTextColour = await page.$eval(loginPage.errorMessageTextSelector, ele => getComputedStyle(ele).getPropertyValue('color'));
    let errorMessageBackgroundColour = await page.$eval(loginPage.errorMessageBoxSelector, ele => getComputedStyle(ele).getPropertyValue('background-color'));

    expect(errorMessage).to.eql('Epic sadface: Username is required');
    expect(errorMessageTextColour).to.eql(expectedErrorMessageTextColour);
    expect(errorMessageBackgroundColour).to.eql(expectedErrorMessageBackgroundColour);
  });

});
