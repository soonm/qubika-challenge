# Qubika Challenge E2E Tests

## Solution Overview

This project provides automated end-to-end (E2E) tests for the Qubika Sports Club management platform using [Playwright](https://playwright.dev/).

- **Dynamic Test Data:**  
  The suite uses [`@faker-js/faker`](https://github.com/faker-js/faker) to generate unique emails, passwords, and category names for each test run. This ensures that tests do not conflict with existing data and can be run repeatedly without manual cleanup.
- **Environment Management:**  
  The suite uses [`dotenv`](https://github.com/motdotla/dotenv) to load environment variables from a `.env` file when running locally, making it easy to switch between QA and other environments without changing code.
- **User Registration and Login:**  
  Each test registers a new user with a unique email and password, then logs in with those credentials to simulate a real user flow.
- **Category Management:**  
  Tests cover creating categories and subcategories, verifying their presence in the UI.
- **Navigation and Page Objects:**  
  The project uses the Page Object Model pattern for maintainable and reusable test code, encapsulating navigation and UI interactions.
- **Cross-Browser:**  
  Tests can be run on Chromium, Firefox, and WebKit.
- **CI Integration:**  
  The suite is integrated with GitHub Actions for automated runs, with browser and environment selection available via GitHub Actions workflow inputs and HTML reports published to GitHub Pages for easy review. 

This approach ensures robust, repeatable, and maintainable E2E testing for the platform.

## Project Structure

```
.
├── fixtures/                # Playwright fixtures and custom test setup
│   └── pageObjects.ts
├── pages/                   # Page Object Models (e.g., loginPage.ts, categoryPage.ts)
├── tests/                   # Test specs
├── utils/                   # API calls and test data
├── playwright.config.ts     # Playwright configuration
├── .github/workflows/       # GitHub Actions workflows
├── package.json
├── package-lock.json
└── README.md
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers and dependencies:**
   ```bash
   npx playwright install --with-deps
   ```

> **Note:**  
> The commands above use Bash syntax, which works on Linux, macOS, and Windows with [Git Bash](https://gitforwindows.org/) or [WSL](https://docs.microsoft.com/en-us/windows/wsl/).  
> On Windows Command Prompt or PowerShell, use the same `npm` and `npx` commands, but setting environment variables is different:
>
> - **Command Prompt:**
>   ```
>   set ENV=qa
>   ```
> - **PowerShell:**
>   ```
>   $env:ENV="qa"
>   ```

## Running the Tests Locally

1. **Set environment variables:**  
   Create a `.env` file or set them in your terminal as described above, add more environment URLs variables if needed.
   ```
   ENV=qa
   QA_BASE_URL=https://club-administration.qa.qubika.com
   ```

2. **Run all tests:**
   ```bash
   npx playwright test
   ```

3. **Run tests for a specific browser:**
   ```bash
   npx playwright test --project=firefox
   ```

4. **Run tests for a specific environment:**
    ```bash
    ENV=qa npx playwright test
    ```

5. **View the HTML report:**
   ```bash
   npx playwright show-report
   ```

## Running in GitHub Actions

- Go to the **Actions** tab on your GitHub repository.
- Select the **Playwright Tests** workflow.
- Click **Run workflow**.
- Choose the desired environment and browser from the dropdown menus.
- Click the green **Run workflow** button.

> **Important:**  
> - Make sure that GitHub Actions workflows have **read and write permissions** for your repository.  
>   Go to **Settings > Actions > General > Workflow permissions** and select  
>   **"Read and write permissions"** for all scopes. This is required for publishing reports to GitHub Pages.
>
> - **GitHub Pages setup:**  
>   After the first workflow run, go to **Settings > Pages** in your repository,  
>   set the **Source** to the `gh-pages` branch and the folder to `/ (root)`.  
>   This will make your Playwright HTML reports publicly accessible.

After the workflow completes:
- Download the Playwright HTML report artifact from the workflow run, **or**
- View the latest report published to GitHub Pages at:  
  ```
  https://<your-username>.github.io/<your-repo>/
  ```
  *(Replace `<your-username>` and `<your-repo>` with your actual GitHub username and repository name.)*
- The exact report URL will also be printed in the workflow logs as part of the `Print report URL` step. For example:  
[https://soonm.github.io/qubika-challenge/](https://soonm.github.io/qubika-challenge/)

**Note:**  
- **WebKit on Linux requires extra system dependencies:**  
  Unlike Firefox or Chromium, WebKit needs additional system libraries to run on Linux.  
  When running tests on WebKit in CI (Linux), you must use `npx playwright install --with-deps` to install all required libraries.  
  Installing only the browser (e.g., `npx playwright install webkit`) will result in missing library errors and test failures.

## Notes

- Some UI interactions use `{ force: true }` for WebKit on Linux due to platform-specific issues.
- The workflow retries failed tests and runs serially on CI for stability.

## Suggestions / Future Improvements

- **Implement cleanup steps:**  
  While Faker ensures unique test data and prevents collisions, adding functionality to delete test users and categories after tests run will help keep the database clean and prevent unnecessary data growth over time.
- **Automated cleanup in CI:**  
  Integrate cleanup scripts into the CI workflow to ensure the database remains clean after each test run, especially in case of unexpected failures.
- **Expand environment support:**  
  Add support for additional environments as needed (e.g., staging).

---