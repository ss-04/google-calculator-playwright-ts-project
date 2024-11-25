# Playwright Test Automation with TypeScript
This project contains automated test scripts for performing E2E (End-to-End) testing using Playwright and TypeScript. The tests are designed to verify the functionality of a web application (in this case, a calculator web app).

# Setup and Installation
Follow these steps to set up the project:

1. Clone the Repository
Clone the repository to your local machine:

bash
``git clone https://github.com/ss-04/playwright-calculator-tests.git``

cd playwright-calculator-tests

2. Install Dependencies
Install the necessary dependencies using npm (Node.js package manager):

bash
npm install

3. Install Playwright Browsers
Playwright requires browser binaries to be installed. You can install them by running the following:

bash
npx playwright install

# Running the Tests
You can run the Playwright tests using the following command:

bash
npx playwright test

This will run all tests in the tests folder, and Playwright will launch a browser, execute the tests, and generate a report.

# Running Specific Tests
To run a specific test, use the -g flag followed by the test name or pattern:

bash
npx playwright test -g "should add two numbers"

# Running Tests in Debug Mode
If you need to debug a test, you can use the --debug flag:

bash
npx playwright test --debug

# Test Execution Report
` npx playwright show-trace <trace-file-path> `
