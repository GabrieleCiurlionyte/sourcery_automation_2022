class SearchResultsPage {

    constructor(page) {
      this.page = page;
    }

    async getResultHeadingHrefAttribute(index) {
      return await this.page.locator(`#r1-${index} h2 a`).getAttribute('href');
    }

    async getQueryInputText() {
        return await this.page.locator('input[name=q]').getAttribute('value');
    }
  
  }

  module.exports = { SearchResultsPage };
