exports.LoginPage =
    class LoginPage {
        constructor(page) {
            this.page = page;
            this.usernameInput = "//input[@placeholder='Username']";
            this.passwordInput = "//input[@placeholder='Password']";
            this.loginButton = "//button[normalize-space()='Login']";
        }

        async goToWebsite() {
            await this.page.goto("/web/index.php/auth/login");
        }

        async login(username, password) {
            await this.page.locator(this.usernameInput).fill(username);
            await this.page.locator(this.passwordInput).fill(password);
            await this.page.locator(this.loginButton).click();
        }
    }