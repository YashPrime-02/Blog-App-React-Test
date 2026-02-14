import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

/*
  ✅ NOTE FOR LEARNERS (REQUIRED TEST FILE)

  This file contains ONLY the "must-have" tests.

  In real projects:
  - We do NOT test everything like images, exact text, UI styling, etc.
  - We test the main behavior (core functionality)

  For this App, the core functionality is:
  1) Form renders correctly
  2) Validation works (required fields)
  3) Successful submit works
  4) Inputs clear after submit
*/

describe("App Required Tests (Form + Validation)", () => {
  // ==========================================================
  // ✅ REQUIRED TEST 1: Inputs and Submit Button Render
  // ==========================================================
  test("renders required form fields and submit button", () => {
    // 1️⃣ Render the App component
    render(<App />);

    // 2️⃣ Check if required inputs exist
    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);

    // 3️⃣ Check if submit button exists
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    // 4️⃣ Assertions
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ REQUIRED TEST 2: Validation Errors for Empty Submit
  // ==========================================================
  test("shows validation errors when submitting empty form", async () => {
    // userEvent simulates real user actions (click, type, tab, etc.)
    const user = userEvent.setup();

    render(<App />);

    // Click submit without filling anything
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await user.click(submitBtn);

    // Check validation messages
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ REQUIRED TEST 3: Successful Submit Shows Message
  // ==========================================================
  test("submits the form successfully and shows success message", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Get inputs
    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);

    // Fill inputs
    await user.type(nameInput, "Yash");
    await user.type(emailInput, "yash@gmail.com");

    // Submit
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await user.click(submitBtn);

    // Check success message
    expect(
      screen.getByText(/form submitted: yash \(yash@gmail\.com\)/i)
    ).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ REQUIRED TEST 4: Inputs Clear After Successful Submit
  // ==========================================================
  test("clears name and email inputs after successful submit", async () => {
    const user = userEvent.setup();

    render(<App />);

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);

    // Fill inputs
    await user.type(nameInput, "Yash");
    await user.type(emailInput, "yash@gmail.com");

    // Submit
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await user.click(submitBtn);

    // After submit, inputs should reset to empty
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  });
});
