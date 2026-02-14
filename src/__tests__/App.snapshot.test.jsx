import { render } from "@testing-library/react";
import App from "../App";
import { describe, test, expect } from "vitest";

/*
  ✅ NOTE FOR LEARNERS:
  Snapshot testing means:
  - We render the component
  - We save the HTML output as a "snapshot"
  - Next time, Vitest compares the new output with the saved snapshot

  If the UI changes, the snapshot test will fail.
  Then you can decide:
  - UI change is wrong ❌ (fix code)
  - UI change is correct ✅ (update snapshot)
*/

describe("App Snapshot Tests", () => {
  test("matches the App component snapshot", () => {
    // 1️⃣ Render the component
    const { container } = render(<App />);

    // 2️⃣ Compare with stored snapshot
    // If snapshot does not exist, Vitest creates it automatically
    expect(container).toMatchSnapshot();
  });
});
