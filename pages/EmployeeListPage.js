exports.EmployeeListPage =
    class EmployeeListPage {
        constructor(page) {
            this.page = page;
            this.employeeListTab = "//a[normalize-space()='Employee List']";
            this.employeeIdSearchInput = "//div[contains(@class,'oxd-input-group')][.//label[text()='Employee Id']]//input";
            this.searchButton = "//button[normalize-space()='Search']";
            this.resultRow = "(//div[contains(@class,'oxd-table-card')])[1]";
            this.resultCheckbox = "(//div[contains(@class,'oxd-table-card')])[1]//input[@type='checkbox']";
            this.deleteSelectedButton = "//button[contains(.,'Delete Selected')]";
            this.confirmDeleteButton = "//button[normalize-space()='Yes, Delete']";
            this.successToast = "//div[contains(@class,'oxd-toast-content--success')]";
            this.noRecordsFound = "//span[normalize-space()='No Records Found']";
        }

        async open() {
            await this.page.locator(this.employeeListTab).click();
        }

        async searchByEmployeeId(employeeId) {
            await this.page.locator(this.employeeIdSearchInput).fill(employeeId);
            await this.page.locator(this.searchButton).click();
        }

        async openFirstResult() {
            await this.page.locator(this.resultRow).click();
        }

        async deleteFirstResult() {
            await this.page.locator(this.resultCheckbox).check();
            await this.page.locator(this.deleteSelectedButton).click();
            await this.page.locator(this.confirmDeleteButton).click();
            await this.page.locator(this.successToast).waitFor({ state: 'visible', timeout: 20000 });
        }
    }