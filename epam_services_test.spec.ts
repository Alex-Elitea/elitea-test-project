import { test, expect } from '@playwright/test';

test.describe('EPAM - Services -> Client Work', () => {
  test('should navigate from Services to Explore Our Client Work and verify Client Work is visible', async ({ page }) => {
    await page.goto('https://www.epam.com/');

    // Accept cookies/consent if present (does not fail if the banner is absent).
    const acceptCookies = page.getByRole('button', { name: /accept|agree/i });
    if (await acceptCookies.isVisible().catch(() => false)) {
      await acceptCookies.click();
    }

    const services = page
      .getByRole('link', { name: /^Services$/ })
      .or(page.getByRole('button', { name: /^Services$/ }));
    await services.first().click();

    await page.getByRole('link', { name: 'Explore Our Client Work' }).click();

    await expect(
      page
        .getByRole('heading', { name: /Client Work/i })
        .or(page.getByText(/Client Work/i))
        .first(),
    ).toBeVisible();
  });
});
