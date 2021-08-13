//jshint esversion:8
class ProductsPage {

    pageHeadingSelector = '#header_container > div.header_secondary_container > span';

    constructor(page) {
        this.page = page;
    }

    async getTitle() {
        return this.page.title();
    }

}

module.exports = ProductsPage;
