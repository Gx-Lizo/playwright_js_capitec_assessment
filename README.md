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

## Project Structure

PLAYWRIGHT_JS_CAPITEC_ASSESSMENT
│
├── .github
│ └── workflows
│ └── playwright.yml
│
├── node_modules
├── playwright-report
│
├── src
│ ├── controller
│ │ └── booking_api_controller.js
│ │
│ ├── data
│ │ ├── customer_info.json
│ │ ├── inventory.json
│ │ └── users.json
│ │
│ ├── pages
│ │ ├── cart_page.js
│ │ ├── checkout_page.js
│ │ ├── inventory_page.js
│ │ └── login_page.js
│ │
│ ├── tests
│ │ ├── api
│ │ │ └── booking_api.spec.js
│ │ └── ui
│ │ ├── cart_page.spec.js
│ │ ├── checkout_page.spec.js
│ │ ├── inventory_page.spec.js
│ │ └── login_page.spec.js
│ │
│ └── utils
│ └── helper.js
│
├── test-results
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md


---

## Folder Overview

### `src/controller`
Contains **controller classes** that handle:
- API request logic
- Business flows
- Reusable operations that should not live in tests

Example:
- Booking API workflows
- Request payload handling

---

### `src/data`
Holds **static test data** used across UI and API tests:
- User credentials
- Customer information
- Inventory data

---

### `src/pages`
Implements the **Page Object Model (POM)**:
- Page locators
- Page-specific actions
- UI abstraction layer

---

### `src/tests/ui`
Contains **UI test cases**:
- Browser-based tests
- Uses Page Objects
- Focuses on user behaviour and validations

---

### `src/tests/api`
Contains **API test cases**:
- Uses Playwright’s `request` fixture
- Validates status codes and responses
- Uses controllers for API logic

---

### `src/utils`
Reusable helper functions:
- Common utilities
- Shared logic across tests

---

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd PLAYWRIGHT_JS_ASSESSMENT

---

### 2. Install dependencies
npm install

---

### 3. Install Playwright browsers

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