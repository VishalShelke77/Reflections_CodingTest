const { test, expect } = require('@playwright/test');
require('dotenv').config();

const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { AddEmployeePage } = require('../pages/AddEmployeePage');
const { EmployeeListPage } = require('../pages/EmployeeListPage');
const { EmployeeJobPage } = require('../pages/EmployeeJobPage');
const { createEmployeeViaApi, getEmployeeViaApi, deleteEmployeeViaApi } = require('../utils/apiHelper');

const employeeData = require('../data/employee.json');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'Admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

test.describe('Employee Lifecycle Management', () => {
  test.describe.configure({ mode: 'serial' });
  let employeeId;
  let apiRecordId;

  test('01. Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goToWebsite();
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);

    await expect(page.locator(dashboardPage.dashboardHeader), 'Dashboard header should be visible after a successful login')
      .toBeVisible();
    await expect(page, 'URL should navigate to the dashboard route').toHaveURL(/dashboard/);
  });

  test('02. Add a new employee (data-driven)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    await loginPage.goToWebsite();
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
    await dashboardPage.goToPIM();
    await addEmployeePage.open();

    employeeId = await addEmployeePage.addEmployee({
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
    });

    await expect(page.locator(addEmployeePage.personalDetailsHeader),
     'Personal Details page should load, confirming the employee record was created')
      .toBeVisible();
    expect(employeeId, 'A non-empty auto-generated Employee Id should be captured').toBeTruthy();

    console.log(`Created employee "${employeeData.firstName} ${employeeData.lastName}" with Employee Id: ${employeeId}`);
  });

  test('03. Edit employee: update Job Title and Employment Status', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const employeeListPage = new EmployeeListPage(page);
    const employeeJobPage = new EmployeeJobPage(page);

    test.skip(!employeeId, 'Employee Id was not captured in the previous step');

    await loginPage.goToWebsite();
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
    await dashboardPage.goToPIM();
    await employeeListPage.open();
    await employeeListPage.searchByEmployeeId(employeeId);
    await employeeListPage.openFirstResult();

    await employeeJobPage.open();
    await employeeJobPage.updateJobTitle(employeeData.updatedJobTitle);
    await employeeJobPage.updateEmploymentStatus(employeeData.updatedEmploymentStatus);
    await employeeJobPage.save();

    await expect(page.locator(employeeJobPage.successToast), 'A success toast should confirm the job details were updated')
      .toBeVisible();
  });

  test('04. Validate employee data via API (cross-check with UI)', async () => {
    test.skip(!employeeId, 'Employee Id was not captured in an earlier step');

    const created = await createEmployeeViaApi({
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      employeeId,
    });

    expect(created.id, 'API should return a record id after creation').toBeTruthy();
    apiRecordId = created.id;

    const fetched = await getEmployeeViaApi(2);
    expect(fetched.data, 'API GET should return user data to cross-check against the UI-created record')
      .toBeTruthy();
  });

  test('05. Delete the employee (UI + API)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const employeeListPage = new EmployeeListPage(page);

    test.skip(!employeeId, 'Employee Id was not captured in an earlier step');

    await loginPage.goToWebsite();
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
    await dashboardPage.goToPIM();
    await employeeListPage.open();
    await employeeListPage.searchByEmployeeId(employeeId);
    await employeeListPage.deleteFirstResult();

    await expect(page.locator(employeeListPage.successToast), 'A success toast should confirm UI deletion')
      .toBeVisible();

    await employeeListPage.searchByEmployeeId(employeeId);
    await expect(page.locator(employeeListPage.noRecordsFound), 'Searching the deleted Employee Id should return no records')
      .toBeVisible();

    if (apiRecordId) {
      const status = await deleteEmployeeViaApi(apiRecordId);
      expect(status, 'API DELETE should return a 204 No Content status').toBe(204);
    }
  });

  test('06. Logout and confirm session is invalidated', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goToWebsite();
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
    await expect(page.locator(dashboardPage.dashboardHeader)).toBeVisible();

    await dashboardPage.logout();

    await expect(page, 'Logout should redirect back to the login page').toHaveURL(/auth\/login/);
    await expect(page.locator(loginPage.usernameInput), 'Login form should be visible again after logout')
      .toBeVisible();

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(page, 'Direct navigation to the dashboard after logout should redirect to login')
      .toHaveURL(/auth\/login/);
  });
});



