// @ts-check
const { test, expect } = require('@playwright/test');
const { ResultsPage } = require('../pages/ResultsPage');
const { SearchPage } = require('../pages/SearchPage')
/*
test.describe('Search Results tests', () => {
  test('Search Devbridge - first result should contain devbridge.com', async ({ page }) => {
    let searchPage = new SearchPage(page);
    await searchPage.navigateTo();
    let resultsPage = await searchPage.search('devbridge');
    await resultsPage.assertNthResultFirstLinkContains(0, 'devbridge.com');
  });
  
  test('Search Devbridge - second result should contain linkedin', async ({ page }) => {
    let searchPage = new SearchPage(page);
    await searchPage.navigateTo();
    let resultsPage = await searchPage.search('devbridge');
    await resultsPage.assertNthResultFirstLinkContains(1, 'linkedin');
  });
});*/

test('Only integer field checked', async ({ page }) => {

  
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild', { label: '3'});
    await page.selectOption('#selectOperationDropdown', {label: 'Add'});

    //Check if marked
    const state = await page.locator('#integerSelect').isChecked();
    if(!state){
      test.fail();
      break;
    }
  
})