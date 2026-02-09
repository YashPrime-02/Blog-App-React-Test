import { render, screen } from "@testing-library/react";
import App from "./App";

// ✅ Test Case: Check if the main heading is present on the screen
test("renders vite + react heading", () => {
  // 1️⃣ Render the App component in a virtual DOM (jsdom)
  render(<App />);

  // 2️⃣ Find the heading text "Vite + React" on the screen
  // (Regex is used so it matches even if casing changes)
  const heading = screen.getByText(/vite \+ react/i);

  // 3️⃣ Assert (verify) that the heading exists in the document
  expect(heading).toBeInTheDocument();
});
