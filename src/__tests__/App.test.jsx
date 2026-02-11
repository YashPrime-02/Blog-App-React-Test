import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

/*
  ✅ NOTE FOR LEARNERS:
  - render(<App />) loads the component into a fake browser DOM (jsdom)
  - screen is used to search elements from the UI (like user sees it)
  - expect() is used to verify the output (assertions)
  - userEvent is used to simulate real user actions like typing and clicking
*/

describe("App Component Tests", () => {
  // ==========================================================
  // ✅ GROUP 1: UI / TEXT TESTS
  // ==========================================================
  describe("UI Rendering Tests", () => {
    // ✅ Test Case 1: Check if the heading is shown
    test("renders the correct heading", () => {
      // 1️⃣ Render the App component
      render(<App />);

      // 2️⃣ Find the heading text
      // /.../i is a RegEx and 'i' means case-insensitive
      const heading = screen.getByText(/first react test case/i);

      // 3️⃣ Verify heading exists
      expect(heading).toBeInTheDocument();
    });

    // ✅ Test Case 2: Check if developer text is shown
    test("renders developer name text", () => {
      render(<App />);

      const devText = screen.getByText(/developed by yash mishra/i);

      expect(devText).toBeInTheDocument();
    });
  });

  // ==========================================================
  // ✅ GROUP 2: IMAGE TESTS
  // ==========================================================
  describe("Image Tests", () => {
    // ✅ Test Case 3: Check if the image is present using alt text
    test("renders the image using alt text", () => {
      render(<App />);

      // getByAltText searches for <img alt="...">
      const image = screen.getByAltText("Sample online");

      expect(image).toBeInTheDocument();
    });

    // ✅ Test Case 4: Check if the image has correct title
    test("image has correct title attribute", () => {
      render(<App />);

      // getByTitle searches for title="..."
      const image = screen.getByTitle("React Test Image");

      expect(image).toBeInTheDocument();
    });

    // ✅ Test Case 5: Check if the image has correct src URL
    test("image has correct src URL", () => {
      render(<App />);

      const image = screen.getByAltText("Sample online");

      // toHaveAttribute checks HTML attributes like src, title, id, etc.
      expect(image).toHaveAttribute(
        "src",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
      );
    });
  });

  // ==========================================================
  // ✅ GROUP 3: INPUT TESTS
  // ==========================================================
  describe("Input Field Tests", () => {
    // ✅ Test Case 6: Check if Name input exists
    test("renders name input field", () => {
      render(<App />);

      // This checks: <input placeholder="Enter your name" />
      const nameInput = screen.getByPlaceholderText(/enter your name/i);

      expect(nameInput).toBeInTheDocument();
    });

    // ✅ Test Case 7: Check if Email input exists
    test("renders email input field", () => {
      render(<App />);

      const emailInput = screen.getByPlaceholderText(/enter your email/i);

      expect(emailInput).toBeInTheDocument();
    });

    // ✅ Test Case 8: Check if user can type in Name input
    test("allows typing inside name input", async () => {
      // userEvent is required for typing simulation
      const user = userEvent.setup();
      render(<App />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);

      // Simulate user typing
      await user.type(nameInput, "Yash Mishra");

      // Verify input value updated
      expect(nameInput).toHaveValue("Yash Mishra");
    });

    // ✅ Test Case 9: Check if user can type in Email input
    test("allows typing inside email input", async () => {
      const user = userEvent.setup();
      render(<App />);

      const emailInput = screen.getByPlaceholderText(/enter your email/i);

      await user.type(emailInput, "yash@gmail.com");

      expect(emailInput).toHaveValue("yash@gmail.com");
    });
  });

  // ==========================================================
  // ✅ GROUP 4: FORM SUBMIT + VALIDATION TESTS
  // ==========================================================
  describe("Form Submit + Validation Tests", () => {
    // ✅ Test Case 10: Check if Submit button exists
    test("renders submit button", () => {
      render(<App />);

      // getByRole is best practice for buttons (accessibility)
      const submitBtn = screen.getByRole("button", { name: /submit/i });

      expect(submitBtn).toBeInTheDocument();
    });

    // ✅ Test Case 11: Check if Submit button works (successful submit)
    test("submits the form and shows submitted message", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Get inputs
      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/enter your email/i);

      // Type values
      await user.type(nameInput, "Yash");
      await user.type(emailInput, "yash@gmail.com");

      // Click submit
      const submitBtn = screen.getByRole("button", { name: /submit/i });
      await user.click(submitBtn);

      // Verify success message appears
      expect(
        screen.getByText(/form submitted: yash \(yash@gmail\.com\)/i)
      ).toBeInTheDocument();
    });

    // ✅ Test Case 12: Validation check (submit empty form should show errors)
    test("shows required field errors when submitting empty form", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Click submit without typing anything
      const submitBtn = screen.getByRole("button", { name: /submit/i });
      await user.click(submitBtn);

      // Verify error messages appear
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    // ✅ Test Case 13: Inputs should clear after successful submit
    test("clears inputs after successful submit", async () => {
      const user = userEvent.setup();
      render(<App />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);
      const emailInput = screen.getByPlaceholderText(/enter your email/i);

      // Fill inputs
      await user.type(nameInput, "Yash");
      await user.type(emailInput, "yash@gmail.com");

      // Submit form
      const submitBtn = screen.getByRole("button", { name: /submit/i });
      await user.click(submitBtn);

      // Verify inputs are cleared
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
    });
  });
});
