import { Page } from '@playwright/test';

class CalculatorPage {

  // Method to click a number (supports both positive and negative numbers)
  async clickNumber(page: Page, number: string): Promise<void> {
    if (number.startsWith('−')) {
      await page.locator("//div[@role='button'][contains(text(), '−')]").click();
      number = number.slice(1);
    }
    await this.clickPositiveNumber(page, number);
  }

  // Method to click a positive number
  async clickPositiveNumber(page: Page, number: string): Promise<void> {
    for (const digit of number.toString()) {
      await page.locator(`//div[@role='button'][text() = '${digit}']`).click();
    }
  }

  // Method to click an operator button (+, −, ×, ÷, =, etc.)
  async clickOperator(page: Page, operator: string): Promise<void> {
    const operatorXPaths: { [key: string]: string } = {
      '+': "//div[@aria-label='plus'][contains(text(), '+')]",
      '−': "//div[@aria-label='minus'][contains(text(), '−')]",
      '×': "//div[@aria-label='multiply'][contains(text(), '×')]",
      '÷': "//div[@aria-label='divide'][contains(text(), '÷')]",
      '=': "//div[@aria-label='equals'][contains(text(), '=')]",
      '.': "//div[@aria-label='point'][contains(text(), '.')]",
      'AC': "//div[@aria-label='all clear']",
      'CE': "//div[@aria-label='clear entry']",
    };

    await page.locator(operatorXPaths[operator]).click();
  }

  // Method to verify the result displayed on the calculator
  async verifyResult(page: Page, expectedResult: string): Promise<void> {
    const result = await page.locator('#cwos').textContent();
    if (result !== expectedResult) {
      throw new Error(`Expected result "${expectedResult}", but got "${result}"`);
    }
  }

  // Method to clear the calculator using 'AC'
  async clear(page: Page): Promise<void> {
    await this.clickOperator(page, 'AC');
  }

  // Method to clear the current entry using 'CE'
  async clearEntry(page: Page): Promise<void> {
    await this.clickOperator(page, 'CE');
  }
}

export default CalculatorPage;
