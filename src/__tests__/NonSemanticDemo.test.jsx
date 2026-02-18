import { render, screen } from "@testing-library/react";
import NonSemanticDemo from "../components/NonSemanticDemo";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

/*
  ==========================================================
  ✅ NON-SEMANTIC ELEMENT TESTING (RTL)
  ==========================================================

  Non-semantic elements:
  - <div>
  - <span>

  They do NOT have default meaning like:
  - <button>
  - <input>

  So we make them testable + accessible using:
  ✅ role=""
  ✅ aria-label
  ✅ tabIndex
  ✅ aria-checked (for checkbox)

  Queries we use here:
  ✅ getByRole()
  ✅ toHaveTextContent()
  ✅ toHaveAttribute()
*/

describe("NonSemanticDemo Component (Non-Semantic Elements)", () => {
  // ==========================================================
  // ✅ TEST 1: Non-semantic button exists
  // ==========================================================
  test("renders Like div button using role", () => {
    // 1️⃣ Render component
    render(<NonSemanticDemo />);

    /*
      2️⃣ Find element using getByRole

      - Even though it is a <div>,
        we added: role="button"
      - We also added: aria-label="Like Button"
        so it has an accessible name
    */
    const likeBtn = screen.getByRole("button", { name: /like button/i });

    // 3️⃣ Verify it exists
    expect(likeBtn).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ TEST 2: Clicking Like increases likes
  // ==========================================================
  test("increments likes when Like div button is clicked", async () => {
    // 1️⃣ Setup userEvent (needed for real user simulation)
    const user = userEvent.setup();

    // 2️⃣ Render component
    render(<NonSemanticDemo />);

    // 3️⃣ Find the custom div button using role
    const likeBtn = screen.getByRole("button", { name: /like button/i });

    // 4️⃣ Verify default value first (important for real testing)
    expect(likeBtn).toHaveTextContent(/likes: 0/i);

    // 5️⃣ Click the div button
    await user.click(likeBtn);

    // 6️⃣ Verify likes increased
    expect(likeBtn).toHaveTextContent(/likes: 1/i);
  });

  // ==========================================================
  // ✅ TEST 3: Non-semantic checkbox exists
  // ==========================================================
  test("renders checkbox span using role", () => {
    // 1️⃣ Render component
    render(<NonSemanticDemo />);

    /*
      2️⃣ Find checkbox using role

      - It is a <span>
      - But we added role="checkbox"
      - We also added aria-label="Terms Checkbox"
    */
    const checkbox = screen.getByRole("checkbox", {
      name: /terms checkbox/i,
    });

    // 3️⃣ Verify checkbox exists
    expect(checkbox).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ TEST 4: Checkbox toggles aria-checked properly
  // ==========================================================
  test("toggles checkbox state when clicked", async () => {
    // 1️⃣ Setup userEvent
    const user = userEvent.setup();

    // 2️⃣ Render component
    render(<NonSemanticDemo />);

    // 3️⃣ Find checkbox span using role
    const checkbox = screen.getByRole("checkbox", {
      name: /terms checkbox/i,
    });

    /*
      4️⃣ Verify default checkbox state

      For role="checkbox":
      - aria-checked is REQUIRED
      - It should be "false" by default
    */
    expect(checkbox).toHaveAttribute("aria-checked", "false");

    // Also verify default UI text
    expect(screen.getByText(/status: not agreed/i)).toBeInTheDocument();

    // 5️⃣ Click checkbox (span)
    await user.click(checkbox);

    // 6️⃣ Verify checkbox is now checked
    expect(checkbox).toHaveAttribute("aria-checked", "true");

    // Also verify updated UI text
    expect(screen.getByText(/status: agreed/i)).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ TEST 5: getAllByRole() example
  // ==========================================================
  test("finds all roles using getAllByRole", () => {
    render(<NonSemanticDemo />);

    /*
      ✅ NOTE FOR LEARNERS:
      getAllByRole() returns an ARRAY of elements.
      Useful when multiple items share the same role.
    */

    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBe(1);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(1);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBe(1);
  });
});
