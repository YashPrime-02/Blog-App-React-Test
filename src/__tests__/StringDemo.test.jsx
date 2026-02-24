import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import StringMatchDemo from "../components/StringMatchDemo";

/*
  ==========================================================
  ✅ TEXTMATCH TESTING (STRING vs REGEX)
  ==========================================================
*/

describe("TextMatch Demo (String vs Regex)", () => {

  // ==========================================================
  // ✅ GROUP 1: STRING MATCH
  // ==========================================================
  describe("String TextMatch Tests", () => {

    test("finds exact text using string (case sensitive)", () => {
      render(<StringMatchDemo />);
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
      const text = screen.getByText(/welcome to react testing library/i);
      expect(text).toBeInTheDocument();
    });

    test("finds partial text using regex", () => {
      render(<StringMatchDemo />);
      const text = screen.getByText(/hello yash/i);
      expect(text).toBeInTheDocument();
    });

    test("matches email pattern using regex", () => {
      render(<StringMatchDemo />);
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

      const element = screen.getByText((_, element) => {
        return (
          element?.tagName.toLowerCase() === "p" &&
          element.textContent === "User: Yash Mishra"
        );
      });

      expect(element).toBeInTheDocument();
    });

    test("matches element only if it is a paragraph", () => {
      render(<StringMatchDemo />);

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
      const element = screen.getByText((content) =>
        content.trim() === "Welcome to React Testing Library"
      );
      expect(element).toBeInTheDocument();
    });

    test("matches split text across multiple spans", () => {
      render(<StringMatchDemo />);

      const element = screen.getByText((_, element) => {
        return (
          element?.tagName.toLowerCase() === "p" &&
          element.textContent === "User: Yash Mishra"
        );
      });

      expect(element).toBeInTheDocument();
    });

    test("ignores extra whitespace manually", () => {
      render(<StringMatchDemo />);

      const element = screen.getByText((content) => {
        const normalized = content.replace(/\s+/g, " ").trim();
        return normalized === "Status: Active";
      });

      expect(element).toBeInTheDocument();
    });

    test("matches only paragraph elements (tag filtering)", () => {
      render(<StringMatchDemo />);

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

      const element = screen.getByText((_, element) => {
        return (
          element?.tagName.toLowerCase() === "p" &&
          element.textContent === "Account: Premium Plan"
        );
      });

      expect(element).toBeInTheDocument();
    });

  });

});