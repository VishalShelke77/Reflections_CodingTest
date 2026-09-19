# OrangeHRM Employee Lifecycle - Playwright Automation

This repo contains my solution for the Quality Engineer (Automation) technical
assessment. I automated the Employee Lifecycle Management scenario given in the
assignment doc, using Playwright with JavaScript and Page Object Model.

## What's inside

- Login
- Add new employee (data driven from json file)
- Edit employee (update Job Title and Employment Status)
- API validation step
- Delete employee
- Logout and session check


## Tech used

- Playwright Test (JavaScript)
- Page Object Model for all pages
- axios for the API call
- dotenv for login credentials

## Project structure

Reflections_CodingTest/
- pages/
  - LoginPage.js
  - DashboardPage.js
  - AddEmployeePage.js
  - EmployeeListPage.js
  - EmployeeJobPage.js
- tests/
  - employeeLifecycle.spec.js
- utils/
  - apiHelper.js
- data/
  - employee.json
- playwright.config.js
- package.json
- .env.example
- README.md

## Setup (how to run on your machine)

1. Clone the repo and go inside the folder

bash
git clone <repo-url>
cd Reflections_CodingTest


2. Install the dependency's

bash
npm install



## Running the tests

npx playwright test --headed


## Deliverables checklist (as per assignment)

- [x] Source code with test scripts - in `pages/` and `tests/`
- [x] Config and dependency files - `package.json`, `playwright.config.js`
- [x] HTML report of execution - included in repo under `playwright-report/`
      (also can be regenerated anytime by running the tests again)
- [x] Test run video - saved under `test-results/`, also see the drive link below
      if the file is too big for github
- [x] This README with execution steps


Submitted for: Reflections Info Systems coding assessment