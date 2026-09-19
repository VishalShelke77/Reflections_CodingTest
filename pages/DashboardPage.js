exports.DashboardPage =
    class DashboardPage {
        constructor(page) {
            this.page = page;
            this.dashboardHeader = "//h6[normalize-space()='Dashboard']";
            this.userDropdown = "//span[contains(@class,'oxd-userdropdown-tab')]";
            this.logoutLink = "//a[normalize-space()='Logout']";
            this.sidebarPimLink = "//span[normalize-space()='PIM']";
        }

        async isLoaded() {
            return this.page.locator(this.dashboardHeader).isVisible();
        }

        async logout() {
            await this.page.locator(this.userDropdown).click();
            
            await this.page.locator(this.logoutLink).click();
        }

        async goToPIM() {
            await this.page.locator(this.sidebarPimLink).click();
        }
    }