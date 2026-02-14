import { render, screen } from "@testing-library/react";
import User from "../components/users";
import { describe, test, expect } from "vitest";

/*
  ✅ NOTE FOR LEARNERS (CLASS COMPONENT TESTING)

  Class components are tested the same way as functional components.
  React Testing Library doesn't care if it is:
  - function component
  - class component

  We just render it and check the output.
*/

describe("User Class Component (Required Tests)", () => {
  test("renders heading and user details correctly", () => {
    // 1️⃣ Render User component with props
    render(<User name="Yash Mishra" email="yash@gmail.com" />);

    // 2️⃣ Check heading
    const heading = screen.getByText(/user details/i);
    expect(heading).toBeInTheDocument();

    // 3️⃣ Check name
    const nameText = screen.getByText(/name: yash mishra/i);
    expect(nameText).toBeInTheDocument();

    // 4️⃣ Check email
    const emailText = screen.getByText(/email: yash@gmail\.com/i);
    expect(emailText).toBeInTheDocument();
  });
});
