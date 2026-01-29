# Playwright JS Assessment

This repository contains a **Playwright JavaScript test automation framework** used to validate both **UI** and **API** functionality.

The framework is structured for clarity, reusability, and CI execution, with a clear separation between:
- UI tests
- API tests
- Page Objects
- Controllers
- Test data

---

## Tech Stack

- **Node.js**
- **JavaScript**
- **Playwright Test**
- **npm**
- **GitHub Actions** (CI)

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Gx-Lizo/playwright_js_capitec_assessment
cd PLAYWRIGHT_JS_ASSESSMENT
```

---

### 2. Install dependencies
- npm install

---

### 3. Install Playwright browsers
- npx playwright install
---

## Running Tests

### Tests are executed using npm scripts defined in package.json.

### Run all tests (UI + API)

npm test

### Run API tests only

npm run test:api

### Run UI tests only

npm run test:ui

---

## Reporting

### To view the report:

npm run test:report

### Reports are stored in:

playwright-report/

---
## CI Execution

### This project includes a GitHub Actions workflow:

- The pipeline:

- Installs dependencies

- Installs Playwright browsers

- Runs tests

- Publishes test results

- Best Practices Followed

- Page Object Model (POM)

- Controller-based API logic

- Clear separation of UI and API tests

- Centralised test data

- CI-ready setup

Author
Lizo Gxagxisa
