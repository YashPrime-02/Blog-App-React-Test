import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import ActDemo from "../components/ActDemo";

describe("Act System Tests", () => {

  test("counter increases after 1 second (using act)", () => {
    // Use fake timers
    vi.useFakeTimers();

    render(<ActDemo />);

    const button = screen.getByRole("button", { name: /increase after 1s/i });

    // Click button
    button.click();

    // Fast-forward timer inside act
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();

    vi.useRealTimers();
  });

});