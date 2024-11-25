import { test, expect, Page } from '@playwright/test';
import CalculatorPage from './calculatorPage';

test.describe('Google Calculator E2E Functionality Tests', () => {
    let calculator: CalculatorPage;

    test.beforeEach(async ({ page }: { page: Page }) => {
        await page.goto('https://www.google.com/search?q=calculator');
        await page.locator('#cwos').waitFor({ timeout: 20000 });
        calculator = new CalculatorPage();
    });

    test('should add two numbers correctly', async ({ page }: { page: Page }) => {
        await calculator.clickNumber(page, '2');
        await calculator.clickOperator(page, '+');
        await calculator.clickNumber(page, '3');
        await calculator.clickOperator(page, '=');
        await calculator.verifyResult(page, '5');
    });

    test('should subtract two numbers correctly', async ({ page }: { page: Page }) => {
        await calculator.clickNumber(page, '5');
        await calculator.clickOperator(page, '−');
        await calculator.clickNumber(page, '3');
        await calculator.clickOperator(page, '=');
        await calculator.verifyResult(page, '2');
    });

    // Parameterized test for multiplication
    const multiplicationTestCases = [
        { multiplier: '4', multiplicand: '3', expected: '12' },
        { multiplier: '5', multiplicand: '0', expected: '0' },
        { multiplier: '0', multiplicand: '5', expected: '0' }
    ];

    multiplicationTestCases.forEach(({ multiplier, multiplicand, expected }) => {
        test(`should multiply ${multiplier} by ${multiplicand} correctly`, async ({ page }: { page: Page }) => {
            await calculator.clickNumber(page, multiplier);
            await calculator.clickOperator(page, '×');
            await calculator.clickNumber(page, multiplicand);
            await calculator.clickOperator(page, '=');
            await calculator.verifyResult(page, expected);
        });
    });

    test('should divide two numbers correctly', async ({ page }: { page: Page }) => {
        await calculator.clickNumber(page, '6');
        await calculator.clickOperator(page, '÷');
        await calculator.clickNumber(page, '2');
        await calculator.clickOperator(page, '=');
        await calculator.verifyResult(page, '3');
    });

    // Test cases for division by zero
    const divisionByZeroTestCases = [
        { numerator: '5', denominator: '0', expected: 'Infinity' },
        { numerator: '0', denominator: '5', expected: '0' },
    ];

    divisionByZeroTestCases.forEach(({ numerator, denominator, expected }) => {
        test(`should divide ${numerator} by ${denominator} correctly`, async ({ page }: { page: Page }) => {
            await calculator.clickNumber(page, numerator);
            await calculator.clickOperator(page, '÷');
            await calculator.clickNumber(page, denominator);
            await calculator.clickOperator(page, '=');
            await calculator.verifyResult(page, expected);
        });
    });

    // Parameterized test for decimal operations
    const decimalTestCases = [
        { numerator: '5.5', operator: '+', denominator: '2.5', expected: '8' },
        { numerator: '9', operator: '−', denominator: '4.5', expected: '4.5' },
        { numerator: '8.4', operator: '×', denominator: '0.1', expected: '0.84' },
        { numerator: '2', operator: '÷', denominator: '0.01', expected: '200' },
        { numerator: '2', operator: '÷', denominator: '0.001', expected: '2000' },
        { numerator: '15', operator: '÷', denominator: '0.5', expected: '30' }
    ];

    decimalTestCases.forEach(({ numerator, operator, denominator, expected }) => {
        test(`should calculate ${numerator} ${operator} ${denominator} correctly`, async ({ page }: { page: Page }) => {
            await calculator.clickNumber(page, numerator);
            await calculator.clickOperator(page, operator);
            await calculator.clickNumber(page, denominator);
            await calculator.clickOperator(page, '=');
            await calculator.verifyResult(page, expected);
        });
    });

    // Negative number test cases
    const negativeNumberTestCases = [
        { numerator: '−5', operator: '+', denominator: '3', expected: '-2' },
        { numerator: '−5', operator: '−', denominator: '3', expected: '-8' },
        { numerator: '−5', operator: '×', denominator: '−3', expected: '15' },
        { numerator: '5', operator: '×', denominator: '−3', expected: '-15' },
        { numerator: '−10', operator: '÷', denominator: '2', expected: '-5' },
        { numerator: '−10', operator: '÷', denominator: '−2', expected: '5' },
    ];

    negativeNumberTestCases.forEach(({ numerator, operator, denominator, expected }) => {
        test(`should calculate ${numerator} ${operator} ${denominator} correctly`, async ({ page }: { page: Page }) => {
            await calculator.clickNumber(page, numerator);
            await calculator.clickOperator(page, operator);
            await calculator.clickNumber(page, denominator);
            await calculator.clickOperator(page, '=');
            await calculator.verifyResult(page, expected);
        });
    });

    // Test multiple operations
    test('should handle multiple operations correctly', async ({ page }: { page: Page }) => {
        await calculator.clickNumber(page, '2');
        await calculator.clickOperator(page, '+');
        await calculator.clickNumber(page, '3');
        await calculator.clickOperator(page, '×');
        await calculator.clickNumber(page, '4');
        await calculator.clickOperator(page, '=');
        await calculator.verifyResult(page, '14');
    });

    test('should reset the result to zero after clearing calculator', async ({ page }: { page: Page }) => {
        await calculator.clickNumber(page, '9');
        await calculator.clickOperator(page, '×');
        await calculator.clickNumber(page, '2');
        await calculator.clickOperator(page, '=');
        await calculator.verifyResult(page, '18');
        await calculator.clear(page);
        await calculator.verifyResult(page, '0');
    });
});
