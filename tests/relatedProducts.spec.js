import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

const PRODUCT_URL = 'https://www.ebay.com/itm/152804707962';

test.describe('eBay Wallet Product Page', () => {
  let productPage;
  let mainProductPriceText;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.navigateToProductPage(PRODUCT_URL);

    await productPage.mainProductPrice.waitFor({ timeout: 15000 });
    const rawPrice = await productPage.mainProductPrice.textContent();
    mainProductPriceText = rawPrice ? rawPrice.replace(/[^\d.]/g, '') : '0';
  });

  test('TC_01: Verify that the related products section is visible in the page ', async () => {
    // Assert that the related products section is visible on the product detail page
    await expect(productPage.relatedProductsSection).toBeVisible();

  });

  test('TC_02: Verify that the maximum of six related products are displayed in the related product section', async () => {
     // Get the total number of related products displayed
    const count = await productPage.getRelatedProductCount();
      //Assert that the number of related products is not more than 6
    expect(count).toBeLessThanOrEqual(6);
    
  });

  test('TC_03: Verify that the products are in the same category in the related product section', async () => {
    const titles = await productPage.getRelatedProductTitles();
    console.log('Related product titles:', titles);

    // If no related products found, skip the test gracefully
    if (titles.length === 0) {
      console.warn(' No related product titles found - skipping the test.');
      test.skip();
    }

    // Check each title matches the expected category keywords
    const categoryRegex = /Wallet|Purse|Card Holder|Leather|RFID|Men|Bifold/i;

    for (const title of titles) {
      console.log('Checking title:', title);
      expect(title.toLowerCase()).toMatch(categoryRegex);
    }
  });

  test('TC_04: Verify products are in the same price range in the related product section', async () => {
    const mainPrice = parseFloat(mainProductPriceText);
    expect(mainPrice).toBeGreaterThan(0);// Ensure main product price is valid

    //Get all related product prices from the UI
    const prices = await productPage.getRelatedProductPrices();

      // Define acceptable price tolerance (e.g., ±20%)
    const tolerance = 0.20;

    for (const priceText of prices) {
      // Clean and convert the price string to a float
      const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
      const [low, high] = [mainPrice * (1 - tolerance), mainPrice * (1 + tolerance)];

      // Assert that the price falls within the acceptable range
      expect(price).toBeGreaterThanOrEqual(low);
      expect(price).toBeLessThanOrEqual(high);
    }
  });

  test('TC_05: Verify that the related product details are displayed correctly ', async () => {
    //Get the number of related products displayed on the page
    const count = await productPage.getRelatedProductCount();

    // If no related products are found, skip the test
    if (count === 0) {
      console.warn('No related products found - skipping test.');
      test.skip();
    }

    //Loop through each related product and verify its details
    for (let i = 0; i < count; i++) {
       // Get product title
      const title = await productPage.getRelatedProductTitle(i);
      // Get product price
      const price = await productPage.getRelatedProductPrice(i);
      // Check if the product image is visible
      const imageVisible = await productPage.isRelatedProductImageVisible(i);

      expect(title?.trim().length).toBeGreaterThan(0);
      expect(price?.trim().length).toBeGreaterThan(0);
      expect(imageVisible).toBe(true);
    }
  });

  test('TC_07 (Negative): Verify behavior when there is no matching related product in the related product section.', async ({ page }) => {
    const isVisible = await productPage.isRelatedProductsSectionVisible();
    if (!isVisible) {
      //If section is not visible
      console.log('No related products section present (expected for negative test).');
    } else {
      //If section is visible, ensure that no related products are listed
      const count = await productPage.getRelatedProductCount();
      expect(count).toBe(0);
    }
  });

  test('TC_11 (Negative): Verify behavior when the product URL is incorrect', async ({ page }) => {
    // Navigate to an invalid product URL
    await productPage.navigateToProductPage('https://www.ebay.com/itm/INVALID_PRODUCT_ID');

      // Verify that the error message "We looked everywhere" is visible on the page
    await expect(page.locator('text=We looked everywhere')).toBeVisible();
  });

});
