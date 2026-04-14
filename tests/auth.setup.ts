import { test } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

test('authenticate', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel(/email/i).fill('testuser@mailinator.com');
  await page.getByLabel(/password/i).fill('Password123!');
  await page.click('button[type="submit"]');

  await page.waitForURL(/\/home/);
  await page.context().storageState({ path: authFile });
});
