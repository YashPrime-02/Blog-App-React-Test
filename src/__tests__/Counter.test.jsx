import { render, screen } from "@testing-library/react";
import Counter from "../components/Counter";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

/*
  ==========================================================
  ✅ SMALL RTL TEST FILE (Counter Component)
  ==========================================================

  This file teaches:
  - render()
  - getByText()
  - getByRole()
  - userEvent.click()
  - expect()
*/

describe("Counter Component (RTL Basics)", () => {
  test("renders heading and default count", () => {
    render(<Counter />);

    // Heading test (getByText)
    expect(screen.getByText(/counter component/i)).toBeInTheDocument();

    // Default count
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });

  test("increases count when Increase button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    // getByRole is best practice for buttons
    const increaseBtn = screen.getByRole("button", { name: /increase/i });

    await user.click(increaseBtn);

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });

  test("decreases count when Decrease button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const decreaseBtn = screen.getByRole("button", { name: /decrease/i });

    await user.click(decreaseBtn);

    expect(screen.getByText(/count: -1/i)).toBeInTheDocument();
  });

  test("resets count when Reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const increaseBtn = screen.getByRole("button", { name: /increase/i });
    const resetBtn = screen.getByRole("button", { name: /reset/i });

    // Increase first
    await user.click(increaseBtn);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();

    // Reset now
    await user.click(resetBtn);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });
});
