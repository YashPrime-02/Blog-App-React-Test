import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

/*
  ==========================================================
  ✅ RTL QUERIES MASTER FILE (GOOGLE ENGINEER STYLE)
  ==========================================================

  🎯 GOAL:
  Learn ALL React Testing Library queries properly.

  ----------------------------------------------------------
  ✅ IMPORTANT RULE (BEST PRACTICE ORDER)
  ----------------------------------------------------------

  1️⃣ getByRole()          ✅ BEST (closest to real user)
  2️⃣ getByLabelText()     ✅ BEST for forms
  3️⃣ getByPlaceholderText ✅ OK (not best, but useful)
  4️⃣ getByText()          ✅ OK (for headings, paragraphs)
  5️⃣ getByAltText()       ✅ BEST for images
  6️⃣ getByTitle()         ⚠️ Use only if needed
  7️⃣ getByDisplayValue()  ✅ Good for input value checking
  8️⃣ getByTestId()        ⚠️ LAST option (when nothing works)

  ----------------------------------------------------------
  ✅ QUERY TYPES
  ----------------------------------------------------------

  getBy...    => element MUST exist, else test fails (throws error)
  queryBy...  => element MAY NOT exist, returns null (no error)
  findBy...   => async wait (for API calls, timers, loading states)

  ----------------------------------------------------------
  🔥 NOTE:
  We are testing App.jsx which has:
  - Heading
  - Image
  - Form (name + email + submit)
  - Validation errors
  - Success message
*/

describe("RTL Queries Master Tests (App Component)", () => {
  // ==========================================================
  // ✅ GROUP 1: getByText() (Basic text rendering)
  // ==========================================================
  describe("getByText() queries", () => {
    test("renders heading using getByText", () => {
      render(<App />);

      // getByText finds elements by visible text content
      const heading = screen.getByText(/first react test case/i);

      expect(heading).toBeInTheDocument();
    });

    test("renders developer name using getByText", () => {
      render(<App />);

      // NOTE: your current text is:
      // Developed By Er Yash Mishra
      const devText = screen.getByText(/developed by er yash mishra/i);

      expect(devText).toBeInTheDocument();
    });
  });

  // ==========================================================
  // ✅ GROUP 2: getByRole() (MOST IMPORTANT)
  // ==========================================================
  describe("getByRole() queries", () => {
    test("finds submit button using role", () => {
      render(<App />);

      // getByRole is best practice for buttons
      const submitBtn = screen.getByRole("button", { name: /submit/i });

      expect(submitBtn).toBeInTheDocument();
    });

    test("finds textbox inputs using role", () => {
      render(<App />);

      /*
        Name input type="text" => role is "textbox"
        Email input type="email" => also role is "textbox"
        So we need different selector method OR use label text.
      */

      const inputs = screen.getAllByRole("textbox");

      // In our form we have 2 textbox inputs
      expect(inputs.length).toBe(2);
    });
  });

  // ==========================================================
  // ✅ GROUP 3: getByLabelText() (BEST for forms)
  // ==========================================================
  describe("getByLabelText() queries", () => {
    test("finds Name input using label text", () => {
      render(<App />);

      // Works because you have: <label htmlFor="name">Name</label>
      const nameInput = screen.getByLabelText(/name/i);

      expect(nameInput).toBeInTheDocument();
    });

    test("finds Email input using label text", () => {
      render(<App />);

      // Works because you have: <label htmlFor="email">Email</label>
      const emailInput = screen.getByLabelText(/email/i);

      expect(emailInput).toBeInTheDocument();
    });
  });

  // ==========================================================
  // ✅ GROUP 4: getByPlaceholderText() (Common beginner method)
  // ==========================================================
  describe("getByPlaceholderText() queries", () => {
    test("finds Name input using placeholder", () => {
      render(<App />);

      const nameInput = screen.getByPlaceholderText(/enter your name/i);

      expect(nameInput).toBeInTheDocument();
    });

    test("finds Email input using placeholder", () => {
      render(<App />);

      const emailInput = screen.getByPlaceholderText(/enter your email/i);

      expect(emailInput).toBeInTheDocument();
    });
  });

  // ==========================================================
  // ✅ GROUP 5: getByAltText() + getByTitle() (Images)
  // ==========================================================
  describe("Image queries", () => {
    test("finds image using alt text", () => {
      render(<App />);

      // Best practice for images
      const image = screen.getByAltText(/sample online/i);

      expect(image).toBeInTheDocument();
    });

    test("finds image using title attribute", () => {
      render(<App />);

      // Works because: title="React Test Image"
      const image = screen.getByTitle(/react test image/i);

      expect(image).toBeInTheDocument();
    });

    test("checks image src attribute", () => {
      render(<App />);

      const image = screen.getByAltText(/sample online/i);

      expect(image).toHaveAttribute(
        "src",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
      );
    });
  });

  // ==========================================================
  // ✅ GROUP 6: userEvent() + typing tests
  // ==========================================================
  describe("Typing + userEvent tests", () => {
    test("allows user to type inside name input", async () => {
      const user = userEvent.setup();
      render(<App />);

      const nameInput = screen.getByLabelText(/name/i);

      await user.type(nameInput, "Yash Mishra");

      expect(nameInput).toHaveValue("Yash Mishra");
    });

    test("allows user to type inside email input", async () => {
      const user = userEvent.setup();
      render(<App />);

      const emailInput = screen.getByLabelText(/email/i);

      await user.type(emailInput, "yash@gmail.com");

      expect(emailInput).toHaveValue("yash@gmail.com");
    });
  });

  // ==========================================================
  // ✅ GROUP 7: queryBy... (for optional elements)
  // ==========================================================
  describe("queryBy... queries (element may not exist)", () => {
    test("success message should NOT exist before submit", () => {
      render(<App />);

      // queryByText returns null if not found (does not crash test)
      const msg = screen.queryByText(/form submitted/i);

      expect(msg).toBeNull();
    });

    test("error messages should NOT exist before submit", () => {
      render(<App />);

      const nameErr = screen.queryByText(/name is required/i);
      const emailErr = screen.queryByText(/email is required/i);

      expect(nameErr).toBeNull();
      expect(emailErr).toBeNull();
    });
  });

  // ==========================================================
  // ✅ GROUP 8: Validation + Submit tests
  // ==========================================================
  describe("Form submit + validation tests", () => {
    test("shows validation errors when submitting empty form", async () => {
      const user = userEvent.setup();
      render(<App />);

      const submitBtn = screen.getByRole("button", { name: /submit/i });
      await user.click(submitBtn);

      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    test("submits successfully and shows success message", async () => {
      const user = userEvent.setup();
      render(<App />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);

      await user.type(nameInput, "Yash");
      await user.type(emailInput, "yash@gmail.com");

      const submitBtn = screen.getByRole("button", { name: /submit/i });
      await user.click(submitBtn);

      expect(
        screen.getByText(/form submitted: yash \(yash@gmail\.com\)/i)
      ).toBeInTheDocument();
    });

    test("clears inputs after successful submit", async () => {
      const user = userEvent.setup();
      render(<App />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);

      await user.type(nameInput, "Yash");
      await user.type(emailInput, "yash@gmail.com");

      const submitBtn = screen.getByRole("button", { name: /submit/i });
      await user.click(submitBtn);

      // After submit, inputs should reset
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
    });
  });

  // ==========================================================
  // ✅ GROUP 9: getByDisplayValue() (advanced input checking)
  // ==========================================================
  describe("getByDisplayValue() query", () => {
    test("finds input by its current value", async () => {
      const user = userEvent.setup();
      render(<App />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, "Yash");

      // getByDisplayValue finds inputs by their visible value
      const inputByValue = screen.getByDisplayValue("Yash");

      expect(inputByValue).toBeInTheDocument();
    });
  });

  // ==========================================================
  // ✅ GROUP 10: getByTestId() (last option)
  // ==========================================================
  describe("getByTestId() query (last option)", () => {
    test("example: finding something using testid", () => {
      render(<App />);

      /*
        You currently do NOT have data-testid in App.jsx.
        So this is just a learning example.

        If you add:
        <form data-testid="contact-form" ...>

        Then you can test like:
        screen.getByTestId("contact-form")
      */

      expect(true).toBe(true);
    });
  });
});
