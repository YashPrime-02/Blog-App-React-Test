import { render, screen, cleanup } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import {
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  describe,
  test,
  expect
} from "vitest";
import { DbClean } from "../../dbService";

/*
  ✅ NOTE FOR LEARNERS:
  This file is ONLY for learning test hooks.

  Hooks are used to run code automatically:
  - beforeAll  => runs once before ALL tests
  - afterAll   => runs once after ALL tests
  - beforeEach => runs before EACH test
  - afterEach  => runs after EACH test
*/

describe("App Hook Tests (beforeEach / afterEach / beforeAll / afterAll)", () => {
  // Runs ONCE before all tests start
  beforeAll(() => {
    console.log("✅ beforeAll: Runs once before ALL tests");
  });

  // Runs before EVERY test
  beforeEach(() => {
    console.log("🔁 beforeEach: Runs before EACH test");

    // We render App here so we don't repeat render(<App />) in every test
    render(<App />);
  });

  // Runs after EVERY test
  afterEach(() => {
    console.log("🧹 afterEach: Runs after EACH test");

    // cleanup removes rendered component from the DOM
    cleanup();
  });

  // ==========================================================
  // ✅ TEST 1: Heading Exists
  // ==========================================================
  test("renders heading using hooks", () => {
    console.log("🧪 Running Test 1: Heading Exists");

    const heading = screen.getByText(/first react test case/i);
    expect(heading).toBeInTheDocument();

    console.log("✅ Test 1 Passed: Heading found");
  });

  // ==========================================================
  // ✅ TEST 2: Inputs Exist
  // ==========================================================
  test("renders name and email inputs using hooks", () => {
    console.log("🧪 Running Test 2: Inputs Exist");

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();

    console.log("✅ Test 2 Passed: Both inputs found");
  });

  // ==========================================================
  // ✅ TEST 3: Validation Errors (Empty Submit)
  // ==========================================================
  test("shows validation errors on empty submit using hooks", async () => {
    console.log("🧪 Running Test 3: Empty Submit Validation");

    const user = userEvent.setup();

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await user.click(submitBtn);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();

    console.log("✅ Test 3 Passed: Validation errors displayed");
  });

  // ==========================================================
  // ✅ TEST 4: Successful Submit (Message Appears)
  // ==========================================================
  test("submits form successfully using hooks", async () => {
    console.log("🧪 Running Test 4: Successful Submit");

    const user = userEvent.setup();

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);

    await user.type(nameInput, "Yash");
    await user.type(emailInput, "yash@gmail.com");

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await user.click(submitBtn);

    expect(
      screen.getByText(/form submitted: yash \(yash@gmail\.com\)/i)
    ).toBeInTheDocument();

    console.log("✅ Test 4 Passed: Submit message shown");
  });

  // ==========================================================
  // ✅ TEST 5: Inputs Clear After Submit
  // ==========================================================
  test("clears inputs after submit using hooks", async () => {
    console.log("🧪 Running Test 5: Clear Inputs After Submit");

    const user = userEvent.setup();

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);

    await user.type(nameInput, "Yash");
    await user.type(emailInput, "yash@gmail.com");

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await user.click(submitBtn);

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");

    console.log("✅ Test 5 Passed: Inputs cleared after submit");
  });

  // Runs ONCE after all tests finish
  afterAll(() => {
   DbClean();
});
});
