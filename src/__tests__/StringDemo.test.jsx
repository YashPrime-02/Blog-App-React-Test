import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import StringMatchDemo from "../components/StringMatchDemo";
/*
  ==========================================================
  ✅ TEXTMATCH TESTING (STRING vs REGEX)
  ==========================================================

  TextMatch in RTL can be:

  1️⃣ String
     - Exact match
     - Case sensitive
     - Must match full text

  2️⃣ Regex
     - Flexible
     - Can ignore case (/i)
     - Can match partial text
*/

describe("TextMatch Demo (String vs Regex)", () => {

  // ==========================================================
  // ✅ GROUP 1: STRING MATCH
  // ==========================================================
  describe("String TextMatch Tests", () => {

    test("finds exact text using string (case sensitive)", () => {
      render(<StringMatchDemo />);

      /*
        ✅ String match must match EXACT text
        - Case sensitive
        - Full text required
      */
      const text = screen.getByText("Welcome to React Testing Library");

      expect(text).toBeInTheDocument();
    });

    test("finds button using exact string", () => {
      render(<StringMatchDemo />);

      const button = screen.getByText("Click Me");

      expect(button).toBeInTheDocument();
    });

  });

  // ==========================================================
  // ✅ GROUP 2: REGEX MATCH
  // ==========================================================
  describe("Regex TextMatch Tests", () => {

    test("finds text ignoring case using regex", () => {
      render(<StringMatchDemo />);

      /*
        /i makes regex case-insensitive
        So even if text is uppercase/lowercase,
        test will pass.
      */
      const text = screen.getByText(/welcome to react testing library/i);

      expect(text).toBeInTheDocument();
    });

    test("finds partial text using regex", () => {
      render(<StringMatchDemo />);

      /*
        Regex can match PARTIAL text.
        No need to write full sentence.
      */
      const text = screen.getByText(/hello yash/i);

      expect(text).toBeInTheDocument();
    });

    test("matches email pattern using regex", () => {
      render(<StringMatchDemo />);

      /*
        Regex can match patterns.
        Here we match email format.
      */
      const email = screen.getByText(/yash@gmail\.com/i);

      expect(email).toBeInTheDocument();
    });

  });

// ==========================================================
// ✅ GROUP 3: FUNCTION TEXTMATCH
// ==========================================================
describe("Function TextMatch Tests", () => {

  test("matches split text using function matcher", () => {
    render(<StringMatchDemo />);

    /*
      IMPORTANT:

      This will FAIL:
      screen.getByText("User: Yash Mishra")

      Because text is split into:
      <span>Yash</span>
      <span>Mishra</span>

      So we use function matcher.
    */

    const element = screen.getByText((content, element) => {
      return content.includes("User: Yash Mishra");
    });

    expect(element).toBeInTheDocument();
  });

  test("matches element only if it is a paragraph", () => {
    render(<StringMatchDemo />);

    /*
      Function matcher gives access to:

      - content (textContent)
      - element (DOM node)

      So we can filter by tagName.
    */

    const element = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "p" &&
        content.includes("Hello Yash Mishra")
      );
    });

    expect(element).toBeInTheDocument();
  });

});


// ==========================================================
// ✅ FUNCTION TEXTMATCH (ADVANCED STRING CONTROL)
// ==========================================================
describe("Function TextMatch Advanced Tests", () => {

  test("matches exact full text using function", () => {
    render(<StringMatchDemo />);

    /*
      Function matcher allows FULL control.
      Here we match EXACT string manually.
    */
    const element = screen.getByText((content) =>
      content.trim() === "Welcome to React Testing Library"
    );

    expect(element).toBeInTheDocument();
  });

  test("matches split text across multiple spans", () => {
    render(<StringMatchDemo />);

    /*
      Because text is split:
      User: <span>Yash</span> <span>Mishra</span>

      Normal string match fails.
      Function matcher handles it.
    */
    const element = screen.getByText((content) =>
      content.includes("User: Yash Mishra")
    );

    expect(element).toBeInTheDocument();
  });

  test("ignores extra whitespace manually", () => {
    render(<StringMatchDemo />);

    /*
      This text has extra spaces:
      "Status:      Active"

      We normalize manually.
    */
    const element = screen.getByText((content) => {
      const normalized = content.replace(/\s+/g, " ").trim();
      return normalized === "Status: Active";
    });

    expect(element).toBeInTheDocument();
  });

  test("matches only paragraph elements (tag filtering)", () => {
    render(<StringMatchDemo />);

    /*
      Function matcher gives access to DOM element.
      We can filter by tagName.
    */
    const element = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "p" &&
        content.includes("Hello Yash Mishra")
      );
    });

    expect(element).toBeInTheDocument();
  });

  test("matches nested strong element text", () => {
    render(<StringMatchDemo />);

    /*
      Text is:
      Account: <strong>Premium</strong> Plan

      We match full combined content.
    */
    const element = screen.getByText((content) =>
      content.includes("Account: Premium Plan")
    );

    expect(element).toBeInTheDocument();
  });

});

});