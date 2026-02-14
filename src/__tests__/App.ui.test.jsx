import { render, screen } from "@testing-library/react";
import App from "../App";
import { describe, test, expect } from "vitest";

/*
  ✅ NOTE FOR LEARNERS (UI TEST FILE)

  This file contains "optional UI tests".

  These tests are NOT compulsory in real projects because:
  - UI text changes often
  - Image URLs change often
  - Minor UI changes can break tests

  But these tests are still useful for:
  ✅ learning
  ✅ small apps
  ✅ basic UI confidence
*/

describe("App UI Tests (Optional)", () => {
  // ==========================================================
  // ✅ UI TEST 1: Heading is shown
  // ==========================================================
  test("renders the heading text", () => {
    render(<App />);

    // Checks the <h1> text
    const heading = screen.getByText(/first react test case/i);

    expect(heading).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ UI TEST 2: Developer name is shown
  // ==========================================================
  test("renders developer name text", () => {
    render(<App />);

    // Your App currently has: "Developed By Er Yash Mishra"
    const devText = screen.getByText(/developed by er yash mishra/i);

    expect(devText).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ UI TEST 3: Image exists using alt text
  // ==========================================================
  test("renders the image using alt text", () => {
    render(<App />);

    // Checks: <img alt="Sample online" />
    const image = screen.getByAltText("Sample online");

    expect(image).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ UI TEST 4: Image has correct title attribute
  // ==========================================================
  test("image has correct title attribute", () => {
    render(<App />);

    // Checks: title="React Test Image"
    const image = screen.getByTitle("React Test Image");

    expect(image).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ UI TEST 5: Image has correct src URL
  // ==========================================================
  test("image has correct src URL", () => {
    render(<App />);

    const image = screen.getByAltText("Sample online");

    // Checks the src attribute value
    expect(image).toHaveAttribute(
      "src",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
    );
  });
});
