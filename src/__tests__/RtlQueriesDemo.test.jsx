import { render, screen } from "@testing-library/react";
import RtlQueriesDemo from "../components/RtlQueriesDemo";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

/*
  ==========================================================
  ✅ RTL QUERIES TEST FILE (LEARNER LEVEL)
  ==========================================================

  IMPORTANT:
  React Testing Library gives you multiple query types:

  1) getBy...    => Throws error if element not found (MOST USED)
  2) queryBy...  => Returns null if not found (best for negative testing)
  3) findBy...   => Async (used when UI updates later, API calls, timers)

  In this file we will learn:
  ✅ getByRole
  ✅ getByText
  ✅ getByLabelText
  ✅ getByPlaceholderText
  ✅ getByAltText
  ✅ getByTitle
  ✅ getByTestId (last option)
  ✅ queryByText (negative test)
*/

describe("RTL Queries Demo (All Main Queries)", () => {
  // ==========================================================
  // ✅ TEST 1: getByText
  // ==========================================================
  test("renders heading using getByText", () => {
    render(<RtlQueriesDemo />);

    const heading = screen.getByText(/rtl queries demo/i);
    expect(heading).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ TEST 2: getByAltText + getByTitle
  // ==========================================================
  test("renders image using alt text and title", () => {
    render(<RtlQueriesDemo />);

    const image = screen.getByAltText("Demo Image");
    expect(image).toBeInTheDocument();

    const imageByTitle = screen.getByTitle("Profile Demo");
    expect(imageByTitle).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ TEST 3: getByLabelText (BEST for forms)
  // ==========================================================
  test("finds input using label (getByLabelText)", () => {
    render(<RtlQueriesDemo />);

    // Because label is connected with htmlFor="name"
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ TEST 4: getByPlaceholderText
  // ==========================================================
  test("finds input using placeholder text", () => {
    render(<RtlQueriesDemo />);

    const nameInput = screen.getByPlaceholderText(/enter name/i);
    expect(nameInput).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ TEST 5: getByRole (BEST PRACTICE)
  // ==========================================================
  test("finds submit button using role", () => {
    render(<RtlQueriesDemo />);

    // Buttons should be tested using role
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    expect(submitBtn).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ TEST 6: queryByText (negative test)
  // ==========================================================
  test("does NOT show message before submit (queryByText)", () => {
    render(<RtlQueriesDemo />);

    // queryByText returns null if element doesn't exist
    const message = screen.queryByText(/hello/i);
    expect(message).not.toBeInTheDocument();
  });

  // ==========================================================
  // ✅ TEST 7: userEvent + getByText after submit
  // ==========================================================
  test("shows message after submit", async () => {
    const user = userEvent.setup();
    render(<RtlQueriesDemo />);

    // getByLabelText (best)
    const nameInput = screen.getByLabelText(/name/i);

    // Type
    await user.type(nameInput, "Yash");

    // Submit
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await user.click(submitBtn);

    // Now message should appear
    expect(screen.getByText(/hello yash/i)).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ TEST 8: getByTestId (LAST OPTION)
  // ==========================================================
  test("finds wrapper using testid", () => {
    render(<RtlQueriesDemo />);

    // testid should be used only if no other query works
    const wrapper = screen.getByTestId("rtl-demo");
    expect(wrapper).toBeInTheDocument();
  });
});
