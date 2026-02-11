# React Testing Setup (Vite + Vitest)

This project uses **React + Vite** with a basic testing setup using **Vitest** and **React Testing Library**.

---

## Testing Tools Used

- **Vitest** (Test Runner)
- **jsdom** (Browser-like environment for testing)
- **@testing-library/react** (Testing React components)
- **@testing-library/user-event** (Typing/clicking like a real user)
- **@testing-library/jest-dom** (Extra matchers like `toBeInTheDocument()`)

---

## Run Tests

### Start test runner (watch mode)
```bash
npm test
```

### Run tests one time (no watch)
```bash
npx vitest run
```

---

## Test File Naming Convention

Vitest automatically detects test files like:

- `App.test.jsx`
- `App.spec.jsx`
- `sum.test.js`

### Recommended (Professional)
- `App.ui.test.jsx`
- `App.form.test.jsx`

### Also Works (Beginner)
- `App.test.2.jsx`

---

## Test Case Naming Convention

Write test names clearly so the output is easy to understand.

Examples:
- `"renders the correct heading"`
- `"shows required field errors when submitting empty form"`
- `"clears inputs after successful submit"`

If you have multiple test files, you can add a prefix:
- `"[File 2] submits the form successfully"`

---

## Notes for Learners

### `test.only()`
Runs only one test (useful for debugging):
```js
test.only("my test", () => {});
```

### `test.skip()`
Skips a test temporarily:
```js
test.skip("my test", () => {});
```

⚠️ Always remove `.only()` after debugging.

---
