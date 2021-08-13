//jshint esversion:8
const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const ProductsPage = require('../pages/ProductsPage');

//Account details
const standardUser = 'standard_user';
const allUserPasswords = 'secret_sauce';


describe('Products Page for Standard User', function() {
    let browser;
    let page;
    this.timeout(5000); //Timeout set as sometimes it takes a while for the URL to load
  
    beforeEach(async () => {
      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto('https://www.saucedemo.com/inventory.html');
    });
  
    afterEach(async () => {
      await browser.close();
    });
  
    it('Page should have the correct title', function(done) {
      (async () => {
        const productsPage = new ProductsPage(page);
        let actualTitle = await productsPage.getTitle();
        expect(actualTitle).to.eql('Swag Labs');
      })().then(done);
    });


});
