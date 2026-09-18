const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test('Login with valid credentials shows the dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goToWebsite();
    await loginPage.login('Admin', 'admin123');

    await expect(page.locator(dashboardPage.dashboardHeader), 'Dashboard header should be visible after login')
        .toBeVisible();
});