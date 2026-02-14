import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

/*
  ✅ NOTE FOR LEARNERS (TEST FILE 2):
  - This file is App.test.2.jsx
  - We are keeping the same tests but changing the test names
  - This helps us clearly identify which test file is running in the terminal

  🔥 EXTRA LEARNING:
  - test.skip(...)  => This test will NOT run
  - test.only(...)  => ONLY this test will run (all others will be ignored)

  ⚠️ IMPORTANT:
  - If you use test.only(), remember to remove it later
*/

describe("App Component Tests (File 2 - Form + UI)", () => {
  // ==========================================================
  // ✅ Test Case 1: Heading Test
  // ==========================================================
  test("Other renders the correct heading", () => {
    // 1️⃣ Render the App component in a virtual DOM (jsdom)
    render(<App />);

    // 2️⃣ Find the heading text on the screen
    const heading = screen.getByText(/first react test case/i);

    // 3️⃣ Verify heading exists
    expect(heading).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ Test Case 2: Image Alt Test
  // ==========================================================
  test("Other renders the image using alt text", () => {
    render(<App />);

    // getByAltText searches for <img alt="...">
    const image = screen.getByAltText("Sample online");

    expect(image).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ Test Case 3: Image Title Test
  // ==========================================================
  test("Other image has correct title attribute", () => {
    render(<App />);

    // getByTitle searches for title="..."
    const image = screen.getByTitle("React Test Image");

    expect(image).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ Test Case 4: Image Src Test
  // ==========================================================
  test("Other image has correct src URL", () => {
    render(<App />);

    const image = screen.getByAltText("Sample online");

    expect(image).toHaveAttribute(
      "src",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
    );
  });

  // ==========================================================
  // ✅ Test Case 5: Developer Text Test
  // ==========================================================
  test("Other renders developer name text", () => {
    render(<App />);

    const devText = screen.getByText(/developed by er yash mishra/i);

    expect(devText).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ Test Case 6: Name Input Exists
  // ==========================================================
  test("Other renders name input field", () => {
    render(<App />);

    const nameInput = screen.getByPlaceholderText(/enter your name/i);

    expect(nameInput).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ Test Case 7: Email Input Exists
  // ==========================================================
  test("Other renders email input field", () => {
    render(<App />);

    const emailInput = screen.getByPlaceholderText(/enter your email/i);

    expect(emailInput).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ Test Case 8: Typing in Name Input
  // ==========================================================
  test("Other allows typing inside name input", async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByPlaceholderText(/enter your name/i);

    await user.type(nameInput, "Yash Mishra");

    expect(nameInput).toHaveValue("Yash Mishra");
  });

  // ==========================================================
  // ✅ Test Case 9: Typing in Email Input
  // ==========================================================
  test("Other allows typing inside email input", async () => {
    const user = userEvent.setup();
    render(<App />);

    const emailInput = screen.getByPlaceholderText(/enter your email/i);

    await user.type(emailInput, "yash@gmail.com");

    expect(emailInput).toHaveValue("yash@gmail.com");
  });

  // ==========================================================
  // ✅ Test Case 10: Submit Button Exists
  // ==========================================================
  test("Other renders submit button", () => {
    render(<App />);

    const submitBtn = screen.getByRole("button", { name: /submit/i });

    expect(submitBtn).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ Test Case 11: Submit Works (Success Message)
  // ==========================================================

  /*
    👇 LEARNER TIP:
    If you want to run ONLY this test for debugging, change:

    test("Other submits the form ...", async () => {

    to:

    test.only("Other submits the form ...", async () => {

    ⚠️ Then remember to remove .only later
  */

  test("Other submits the form and shows submitted message", async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);

    await user.type(nameInput, "Yash");
    await user.type(emailInput, "yash@gmail.com");

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await user.click(submitBtn);

    expect(
      screen.getByText(/form submitted: yash \(yash@gmail\.com\)/i)
    ).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ Test Case 12: Validation Errors (Empty Submit)
  // ==========================================================

  /*
    👇 LEARNER TIP:
    If you want to SKIP this test temporarily, change:

    test("Other shows required field errors ...", async () => {

    to:

    test.skip("Other shows required field errors ...", async () => {

    ✅ This test will not run
  */

  test("Other shows required field errors when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<App />);

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await user.click(submitBtn);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ Test Case 13: Clear Inputs After Submit
  // ==========================================================
  test("Other clears inputs after successful submit", async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);

    await user.type(nameInput, "Yash");
    await user.type(emailInput, "yash@gmail.com");

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await user.click(submitBtn);

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  });
});
