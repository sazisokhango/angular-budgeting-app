import test, { expect } from '@playwright/test';

test.describe('Home page - unauthenticated user', () => {
  test('To show login on page start', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL('/login');
  });
});

test.describe('Home Page - authenticated', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home');
  }); 

  test('display the welcome message', async ({ page }) => {
    await page.goto('/home')
    const header = page.getByRole('heading', { name: 'Welcome to the Budgeting app' });
    await expect(header).toBeVisible();
  });
});
