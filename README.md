# QA Live Case — Playwright

End-to-end tests against [Sauce Demo](https://www.saucedemo.com/) using [Playwright](https://playwright.dev/).

## Requirements

- Node.js 18+ (20 LTS recommended)
- npm 9+
- Git

## Setup

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd qa-live-case-playwright
npm install
```

Install the Playwright browsers (Chromium, Firefox, WebKit):

```bash
npx playwright install
```

On Linux, also install the required system libraries:

```bash
npx playwright install --with-deps
```

Verify everything is ready:

```bash
npx playwright --version
```

## Running the tests

```bash
npm test                # headless, all browsers
npm run test:chromium   # chromium only — fastest feedback
npm run test:headed     # with a visible browser
npm run test:ui         # Playwright UI mode (interactive runner)
```

Run a single spec:

```bash
npx playwright test tests/login.spec.ts
```

Run a single test by title:

```bash
npx playwright test -g "standard user can log in"
```

## Viewing the report

After a run, open the HTML report:

```bash
npm run report
```

## Project layout

```
.
├── playwright.config.ts    # Playwright configuration
├── package.json
└── tests/
    ├── login.spec.ts       # login scenarios
    ├── inventory.spec.ts   # product listing
    ├── cart.spec.ts        # shopping cart
    └── checkout.spec.ts    # end-to-end checkout flow
```

## System under test

- URL: https://www.saucedemo.com/
- Password for all users: `secret_sauce`
- Users available:
  - `standard_user` — happy path
  - `locked_out_user` — blocked account
  - `problem_user` — broken UI elements
  - `performance_glitch_user` — slow responses
  - `error_user`, `visual_user` — other edge cases

## Useful docs

- Playwright intro: https://playwright.dev/docs/intro
- Locators: https://playwright.dev/docs/locators
- Assertions: https://playwright.dev/docs/test-assertions
- Best practices: https://playwright.dev/docs/best-practices
