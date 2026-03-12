import { test, expect } from '@playwright/test';

test.describe('EPAM - Services navigation', () => {
  test('Navigate to Client Work from Services and verify header', async ({ page }) => {
    await page.goto('https://www.epam.com/');

    // Optional: close cookie/banner dialogs if present
    const acceptCookies = page.getByRole('button', { name: /accept|agree/i }).first();
    if (await acceptCookies.isVisible().catch(() => false)) {
      await acceptCookies.click();
    }

    // Step 2: Select "Services" from the header menu
    await page.getByRole('link', { name: /^Services$/ }).click();

    // Step 3: Click the "Explore Our Client Work" link
    await page.getByRole('link', { name: /Explore Our Client Work/i }).click();

    // Step 4: Verify that the text "Client Work" is visible on the page
    await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
  });
});