import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import QueryMethodsDemo from "../components/QueryMethodsDemo";

/*
  ==========================================================
  ✅ RTL QUERY METHODS TESTING
  ==========================================================

  KEY DIFFERENCE:

  getBy      → must exist immediately
  queryBy    → safe check for absence
  findBy     → waits for async element

  Same logic applies to getAllBy / queryAllBy / findAllBy
*/

describe("QueryMethodsDemo Component", () => {

  // ==========================================================
  // ✅ getBy (Element MUST exist)
  // ==========================================================
  test("getBy finds heading immediately", () => {
    render(<QueryMethodsDemo />);

    const heading = screen.getByText(/query methods demo/i);
    expect(heading).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ queryBy (Element may NOT exist)
  // ==========================================================
  test("queryBy returns null when element is absent", () => {
    render(<QueryMethodsDemo />);

    const message = screen.queryByText(/async message loaded/i);
    expect(message).not.toBeInTheDocument();
  });

  // ==========================================================
  // ✅ getAllBy (Multiple elements must exist)
  // ==========================================================
  test("getAllBy finds multiple buttons", () => {
    render(<QueryMethodsDemo />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });

  // ==========================================================
  // ✅ queryAllBy (Returns empty array if none)
  // ==========================================================
  test("queryAllBy returns empty array when no list items exist", () => {
    render(<QueryMethodsDemo />);

    const items = screen.queryAllByRole("listitem");
    expect(items.length).toBe(0);
  });

  // ==========================================================
  // ✅ findBy (Async single element)
  // ==========================================================
  test("findBy waits for async message", async () => {
    const user = userEvent.setup();
    render(<QueryMethodsDemo />);

    const button = screen.getByRole("button", { name: /load message/i });
    await user.click(button);

    const message = await screen.findByText(/async message loaded/i);
    expect(message).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ findAllBy (Async multiple elements)
  // ==========================================================
  test("findAllBy waits for async list items", async () => {
    const user = userEvent.setup();
    render(<QueryMethodsDemo />);

    const button = screen.getByRole("button", { name: /load items/i });
    await user.click(button);

    const items = await screen.findAllByRole("listitem");
    expect(items.length).toBe(3);
  });

});