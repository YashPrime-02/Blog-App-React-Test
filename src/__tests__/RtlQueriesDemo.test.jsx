import { render, screen } from "@testing-library/react";
import RtlQueriesDemo from "../components/RtlQueriesDemo";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

/*
  ==========================================================
  ✅ RTL QUERIES TEST FILE (ENGINEER LEVEL LEARNING)
  ==========================================================

  We will test EACH RTL query in 2 ways:

  1) Basic test => element exists
  2) Value test => element works / has correct value

  This is the BEST practical format.
*/

describe("RTL Queries Demo (All Main Queries)", () => {
  // ==========================================================
  // ✅ GROUP 1: getByText()
  // ==========================================================
  describe("getByText() tests", () => {
    test("Basic: renders heading using getByText", () => {
      render(<RtlQueriesDemo />);

      const heading = screen.getByText(/rtl queries demo/i);
      expect(heading).toBeInTheDocument();
    });

    test("Value: heading text is exactly correct", () => {
      render(<RtlQueriesDemo />);

      const heading = screen.getByText(/rtl queries demo/i);
      expect(heading).toHaveTextContent("RTL Queries Demo");
    });
  });

  // ==========================================================
  // ✅ GROUP 8: CUSTOM ROLE TESTS
  // ==========================================================
  describe("Custom role='button' tests", () => {
    test("Basic: finds custom div button using getByRole", () => {
      render(<RtlQueriesDemo />);

      /*
        ✅ IMPORTANT:
        This is NOT a real <button>.
        It is a <div role="button">.
      */
      const customBtn = screen.getByRole("button", { name: /custom button/i });

      expect(customBtn).toBeInTheDocument();
    });

    test("Value: clicking custom button updates click count", async () => {
      const user = userEvent.setup();
      render(<RtlQueriesDemo />);

      const customBtn = screen.getByRole("button", { name: /custom button/i });

      // Before click
      expect(customBtn).toHaveTextContent(/clicks: 0/i);

      // Click once
      await user.click(customBtn);

      // After click
      expect(customBtn).toHaveTextContent(/clicks: 1/i);
    });
  });

  // ==========================================================
  // ✅ GROUP 2: getByAltText() + getByTitle()
  // ==========================================================
  describe("Image queries tests", () => {
    test("Basic: finds image using getByAltText", () => {
      render(<RtlQueriesDemo />);

      const image = screen.getByAltText("Demo Image");
      expect(image).toBeInTheDocument();
    });

    test("Value: checks image title + src attribute", () => {
      render(<RtlQueriesDemo />);

      const image = screen.getByTitle("Profile Demo");

      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "https://via.placeholder.com/150");
    });
  });

  // ==========================================================
  // ✅ GROUP 3: getByLabelText()
  // ==========================================================
  describe("getByLabelText() tests", () => {
    test("Basic: finds input using label", () => {
      render(<RtlQueriesDemo />);

      // Because <label htmlFor="name"> matches <input id="name" />
      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toBeInTheDocument();
    });

    test("Value: typing updates input value", async () => {
      const user = userEvent.setup();
      render(<RtlQueriesDemo />);

      const nameInput = screen.getByLabelText(/name/i);

      await user.type(nameInput, "Yash");

      expect(nameInput).toHaveValue("Yash");
    });
  });

  // ==========================================================
  // ✅ GROUP 4: getByPlaceholderText()
  // ==========================================================
  describe("getByPlaceholderText() tests", () => {
    test("Basic: finds input using placeholder", () => {
      render(<RtlQueriesDemo />);

      const nameInput = screen.getByPlaceholderText(/enter name/i);
      expect(nameInput).toBeInTheDocument();
    });

    test("Value: typing updates input value (placeholder query)", async () => {
      const user = userEvent.setup();
      render(<RtlQueriesDemo />);

      const nameInput = screen.getByPlaceholderText(/enter name/i);

      await user.type(nameInput, "Mishra");

      expect(nameInput).toHaveValue("Mishra");
    });
  });

  // ==========================================================
  // ✅ GROUP 5: getByRole()
  // ==========================================================
  describe("getByRole() tests", () => {
    test("Basic: finds Submit button using role", () => {
      render(<RtlQueriesDemo />);

      // Best practice: buttons should be tested using getByRole
      const submitBtn = screen.getByRole("button", { name: /submit/i });

      expect(submitBtn).toBeInTheDocument();
    });

    test("Value: finds textbox using role", () => {
      render(<RtlQueriesDemo />);

      /*
        ✅ IMPORTANT:
        <input type="text" /> has role="textbox"
        This is very common in tutorials.
      */
      const textbox = screen.getByRole("textbox", { name: /name/i });

      expect(textbox).toBeInTheDocument();
    });
  });

  // ==========================================================
  // ✅ GROUP 6: queryByText()
  // ==========================================================
  describe("queryByText() tests", () => {
    test("Basic: message is NOT visible before submit", () => {
      render(<RtlQueriesDemo />);

      // queryByText returns null (no error thrown)
      const msg = screen.queryByText(/hello/i);

      expect(msg).not.toBeInTheDocument();
    });

    test("Value: message becomes visible after submit", async () => {
      const user = userEvent.setup();
      render(<RtlQueriesDemo />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, "Yash");

      const submitBtn = screen.getByRole("button", { name: /submit/i });
      await user.click(submitBtn);

      // Now queryByText should find it
      const msg = screen.queryByText(/hello yash/i);
      expect(msg).toBeInTheDocument();
    });
  });

  // ==========================================================
  // ✅ GROUP 7: getByTestId()
  // ==========================================================
  describe("getByTestId() tests (last option)", () => {
    test("Basic: finds wrapper using testid", () => {
      render(<RtlQueriesDemo />);

      const wrapper = screen.getByTestId("rtl-demo");
      expect(wrapper).toBeInTheDocument();
    });

    test("Value: wrapper contains heading + form", () => {
      render(<RtlQueriesDemo />);

      const wrapper = screen.getByTestId("rtl-demo");

      // This confirms wrapper actually contains our UI
      expect(wrapper).toHaveTextContent("RTL Queries Demo");
      expect(wrapper).toHaveTextContent("Submit");
    });
  });
});
