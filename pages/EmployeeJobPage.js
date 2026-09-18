exports.EmployeeJobPage =
    class EmployeeJobPage {
        constructor(page) {
            this.page = page;
            this.jobTab = "//a[normalize-space()='Job']";
            this.jobTitleDropdown = "//div[contains(@class,'oxd-input-group')][.//label[text()='Job Title']]//div[contains(@class,'oxd-select-text')]";
            this.employmentStatusDropdown = "//div[contains(@class,'oxd-input-group')][.//label[text()='Employment Status']]//div[contains(@class,'oxd-select-text')]";
            this.saveButton = "(//button[normalize-space()='Save'])[1]";
            this.successToast = "//div[contains(@class,'oxd-toast-content--success')]";
        }

        dropdownOption(text) {
            return `//div[contains(@class,'oxd-select-option')][normalize-space()='${text}']`;
        }

        async open() {
            await this.page.locator(this.jobTab).click();
        }

        async updateJobTitle(newTitle) {
            await this.page.locator(this.jobTitleDropdown).click();
            await this.page.locator(this.dropdownOption(newTitle)).click();
        }

        async updateEmploymentStatus(newStatus) {
            await this.page.locator(this.employmentStatusDropdown).click();
            await this.page.locator(this.dropdownOption(newStatus)).click();
        }

        async save() {
            await this.page.locator(this.saveButton).click();
            await this.page.locator(this.successToast).waitFor({ state: 'visible', timeout: 20000 });
        }
    }