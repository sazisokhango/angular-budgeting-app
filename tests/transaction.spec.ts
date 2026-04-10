import test from "@playwright/test";

test.describe('Transaction page - create new transaction', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/transaction')
    } )
})