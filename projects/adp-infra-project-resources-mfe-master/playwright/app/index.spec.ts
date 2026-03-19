import { test, expect } from '@playwright/test';

let _title = "adp-infra-project-resources-mfe-title";


test('Test', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState("networkidle");
  await expect(page.getByTestId(_title)).toBeVisible();
});
