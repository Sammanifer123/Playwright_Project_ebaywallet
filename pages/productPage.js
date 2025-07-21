
export class ProductPage {
  constructor(page) {
    this.page = page;

    // Main products section
    this.mainProductPrice = page.locator('[data-testid="x-price-primary"]');
    this.productTitle = page.locator('xpath=//*[@data-testid="x-item-title"]/h1[@class="x-item-title__mainTitle"]/span');
    this.mainProductImage = page.locator('[data-testid="ux-image-carousel-container"] img.img-scale-down');
    this.mainProductDescription = page.locator('//div[@id="viTabs_0_is"]');

    // Related products section
    this.relatedProductsSection = page.locator('xpath=//*[@data-testid="x-rx-slot-101875"]');
    this.relatedProductItems = page.locator('#placement101875 .Mgpb.rgAU');

  }

  async navigateToProductPage(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getMainProductTitle() {
    const title = this.productTitle;
    await title.waitFor({ timeout: 10000 });
    return await title.textContent();
  }

  async getMainProductPrice() {
    const price = this.mainProductPrice;
    await price.waitFor({ timeout: 10000 });
    return await price.textContent();
  }

  async getRelatedProductCount() {
    const section = this.relatedProductsSection;
    if (!(await section.isVisible())) {
      console.log('Related products section not visible.');
      return 0;
    }
    await section.scrollIntoViewIfNeeded();

    const products = this.relatedProductItems;
    const countBeforeWait = await products.count();
    console.log('Products count before waiting:', countBeforeWait);

    if (countBeforeWait === 0) return 0;

    await products.first().waitFor({ timeout: 10000 });

    const countAfterWait = await products.count();
    console.log('Products count after waiting:', countAfterWait);

    return countAfterWait;
  }



  async getRelatedProductTitles() {

    const isVisible = await this.relatedProductsSection.isVisible().catch(() => false);
    if (!isVisible) return [];

    const count = await this.relatedProductItems.count();
    console.log('Related products found:', count);

    const titles = [];
    for (let i = 0; i < count; i++) {
      const item = this.relatedProductItems.nth(i);
      const title = await item.innerText();
      titles.push(title);
    }
    return titles;
    
  }


  async getRelatedProductPrices() {
    const prices = [];
    const products = await this.relatedProductItems.all();
    for (const product of products) {
      try {
        const productPrice = product.productPrice;
        await productPrice.waitFor({ timeout: 5000 });
        const price = await productPrice.textContent();
        if (price) prices.push(price.trim());
      } catch {
        console.warn('Skipped product with missing price');
      }
    }
    return prices;
  }

  async isRelatedProductsSectionVisible() {
    const section = this.relatedProductsSection;
    try {
      return await section.isVisible();
    } catch {
      return false;
    }
  }
  async getRelatedProductTitle(index) {
    return await this.relatedProductItems.nth(index).locator('.s-item__title').textContent();
  }

  async getRelatedProductPrice(index) {
    return await this.relatedProductItems.nth(index).locator('.s-item__price').textContent();
  }

  async isRelatedProductImageVisible(index) {
    return await this.relatedProductItems.nth(index).locator('img').isVisible();
  }
}
