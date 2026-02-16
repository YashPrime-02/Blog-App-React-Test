import { render, screen } from "@testing-library/react";
import ProfileCard from "../components/profileCard";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

/*
  ✅ NOTE FOR LEARNERS (FUNCTIONAL COMPONENT TESTING)

  Best Practice:
  - Prefer getByRole(), getByText(), getByLabelText()
  - Use data-testid only when needed

  In this file, we are learning BOTH:
  ✅ text based testing
  ✅ test id based testing
*/

describe("ProfileCard Functional Component (Required Tests)", () => {
  // ==========================================================
  // ✅ TEST 1: Renders UI correctly using props (TEXT BASED)
  // ==========================================================
  test("renders profile details using props (text based)", () => {
    // 1️⃣ Render component with props
    render(<ProfileCard name="Yash" role="Frontend Developer" isOnline={true} />);

    // 2️⃣ Check UI using normal visible text
    expect(screen.getByText(/profile card/i)).toBeInTheDocument();
    expect(screen.getByText(/name: yash/i)).toBeInTheDocument();
    expect(screen.getByText(/role: frontend developer/i)).toBeInTheDocument();
  });

  // ==========================================================
  // ✅ TEST 2: Renders UI correctly using props (TEST ID BASED)
  // ==========================================================
  test("renders profile details using props (testid based)", () => {
    render(<ProfileCard name="Yash" role="Frontend Developer" isOnline={true} />);

    // Using data-testid (useful when text is dynamic / hard to select)
    expect(screen.getByTestId("profile-heading")).toHaveTextContent(
      "Profile Card"
    );

    expect(screen.getByTestId("profile-name")).toHaveTextContent("Name: Yash");

    expect(screen.getByTestId("profile-role")).toHaveTextContent(
      "Role: Frontend Developer"
    );
  });

  // ==========================================================
  // ✅ TEST 3: Conditional rendering (Online/Offline)
  // ==========================================================
  test("shows Online when isOnline is true", () => {
    render(<ProfileCard name="Yash" role="Frontend Developer" isOnline={true} />);

    // Text based
    expect(screen.getByText(/status: online/i)).toBeInTheDocument();

    // TestId based
    expect(screen.getByTestId("profile-status")).toHaveTextContent(
      "Status: Online"
    );
  });

  test("shows Offline when isOnline is false", () => {
    render(
      <ProfileCard name="Yash" role="Frontend Developer" isOnline={false} />
    );

    expect(screen.getByText(/status: offline/i)).toBeInTheDocument();

    expect(screen.getByTestId("profile-status")).toHaveTextContent(
      "Status: Offline"
    );
  });

  // ==========================================================
  // ✅ TEST 4: Like button updates state
  // ==========================================================
  test("increments likes when Like button is clicked", async () => {
    // userEvent simulates real user interaction (recommended)
    const user = userEvent.setup();

    render(<ProfileCard name="Yash" role="Frontend Developer" isOnline={true} />);

    // Check initial likes (text based)
    expect(screen.getByText(/likes: 0/i)).toBeInTheDocument();

    // Click Like (role based - best practice)
    const likeBtn = screen.getByRole("button", { name: /like/i });
    await user.click(likeBtn);

    // Check updated likes (testid based)
    expect(screen.getByTestId("profile-likes")).toHaveTextContent("Likes: 1");
  });
});
