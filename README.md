# Playwright_Project_ebaywallet
This repository contains the automation framework and test suite developed for the **eBay Wallet feature**, as part of the **QA Skills Assessment**. The project utilizes [Playwright](https://playwright.dev/) for end-to-end automation testing.

## 📁 Project Structure
  * tests/:  # Playwright test scripts
  * pages/:  # Page Object Model files (recommended)
  * playwright.config.js:  # Playwright configuration
  * README.md:  # Project documentation


---

## 🧪 Manual Testing (Scenario Overview)

This project simulates a shopper buying a wallet on eBay. The manual test scenario includes:

- **Main Product Page**: After a search, the shopper lands on the main product page.
- **Related Products Section**: Up to **six "best seller"** related products should be shown.
- These related products must:
  - Belong to the **same category**
  - Be within a **similar price range**

📌 **Assumptions**: Clarifications and assumptions will be documented in the test strategy and test case documentation.

---

## 🤖 Automation Testing

### ✅ Prerequisites

Make sure the following are installed:

- [Node.js (LTS)](https://nodejs.org/)
- npm (comes with Node.js) or [Yarn](https://yarnpkg.com/)
- Git

---

### 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Sammanifer123/Playwright_Project_ebaywallet.git
cd Playwright_Project_ebaywallet
```


### Install dependencies:

```bash
npm install
# or
yarn install
```

## ⚙️ Configuration
The test configuration is managed via playwright.config.js. You can modify this file to:

 * Enable or disable headless mode
 * Set timeouts and retries
 * Select browsers (Chromium, Firefox, WebKit)
 * Define base URL or environment variables

## ▶️ Running Tests
To run all tests:

```bash
npx playwright test
```

To run a specific test file:

```bash
npx playwright test tests/relatedProducts.spec.js
```

To open the Playwright HTML report after test run:
```bash
npx playwright show-report
```
## 📄 License
This project is for educational and assessment purposes only.
All trademarks (like “eBay”) are property of their respective owners.

## 👤 Author

**Sammanifer123**  
GitHub: [https://github.com/Sammanifer123](https://github.com/Sammanifer123)  
Email: sammanif1@gmail.com  
LinkedIn:(https://www.linkedin.com/in/prabuddya-sammani-fernando-50149a202/)


