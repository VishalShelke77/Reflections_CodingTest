const path = require('path');

exports.AddEmployeePage =
    class AddEmployeePage {
        constructor(page) {
            this.page = page;
            this.addEmployeeTab = "//a[normalize-space()='Add Employee']";
            this.firstNameInput = "//input[@name='firstName']";
            this.lastNameInput = "//input[@name='lastName']";
            this.employeeIdInput = "//div[contains(@class,'oxd-input-group')][.//label[text()='Employee Id']]//input";
            this.uploadInput = "//input[@type='file']";
            this.saveButton = "//button[normalize-space()='Save']";
            this.successToast = "//div[contains(@class,'oxd-toast-content--success')]";
            this.personalDetailsHeader = "//h6[normalize-space()='Personal Details']";
        }

        
        async open() {
            await this.page.locator(this.addEmployeeTab).click();
        }

        async addEmployee({ firstName, lastName, profilePicture }) {

            await this.page.locator(this.firstNameInput).fill(firstName);
            await this.page.locator(this.lastNameInput).fill(lastName);

            const employeeId = await this.page.locator(this.employeeIdInput).inputValue();

            if (profilePicture) {
                await this.page.locator(this.uploadInput).setInputFiles(path.resolve(profilePicture));
            }

            await this.page.locator(this.saveButton).click();
            
            await this.page.locator(this.personalDetailsHeader).waitFor({ state: 'visible', timeout: 20000 });

            return employeeId;
        }
    }