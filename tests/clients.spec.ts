import { test, expect } from '@playwright/test';
import { ClientsPage } from '../pages/clients/clientsPage';
import { BaseNavigationPage } from '../pages/baseNavigationPage';
import { time } from 'console';

test.describe('Dashboard Tests - Using Global Authentication', () => {
  let baseNavigation: BaseNavigationPage;
  let clientsPage: ClientsPage;

  test.beforeEach(async ({ page }) => {
    baseNavigation = new BaseNavigationPage(page);
    clientsPage = new ClientsPage(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await page.screenshot({ 
        path: `test-results/failed-${testInfo.title.replace(/\s+/g, '-')}.png` 
      });
    }
  });

  test.only('TC001 - Verify dashboard loads with authenticated user', async ({ page }) => {
    await test.step('Wait for dashboard to load', async () => {
      await clientsPage.gotoClients();
      await page.waitForTimeout(3000);
      await clientsPage.typeInFilterInput("test");
      await page.waitForTimeout(3000);
      console.log('✅ Dashboard test completed with global authentication');
    });
  });
});