import test, { expect } from '@playwright/test';


test.describe('Home Page - authenticated user', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home');
  });

  test('Display the welcome message', async ({ page }) => {
    await page.goto('/home');
    const header = page.getByRole('heading', { name: 'Welcome to the Budgeting app' });
    await expect(header).toBeVisible();
  });
});
