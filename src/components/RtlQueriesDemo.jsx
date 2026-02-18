import { useState } from "react";

/*
  ✅ NOTE FOR LEARNERS (RTL QUERIES DEMO COMPONENT)

  This component is specially made to learn React Testing Library queries.

  It includes:
  ✅ getByRole
  ✅ getByLabelText
  ✅ getByPlaceholderText
  ✅ getByText
  ✅ getByAltText
  ✅ getByTitle
  ✅ getByTestId (last option)

  NEW ADDITION:
  ✅ Custom role="button" on a <div> (for learning)
*/

export default function RtlQueriesDemo() {
  const [name, setName] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  // ✅ Custom role demo state
  const [customClicks, setCustomClicks] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMsg(true);
  };

  const handleCustomClick = () => {
    setCustomClicks(customClicks + 1);
  };

  return (
    <div data-testid="rtl-demo">
      {/* getByRole / getByText */}
      <h2>RTL Queries Demo</h2>

      {/* getByAltText + getByTitle */}
      <img
        src="https://via.placeholder.com/150"
        alt="Demo Image"
        title="Profile Demo"
      />

      {/* =====================================================
          ✅ CUSTOM ROLE EXAMPLE
          - div is NOT a button by default
          - so we add role="button"
          - tabIndex makes it focusable (keyboard accessible)
          - aria-label gives it an accessible name
      ====================================================== */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Custom Button"
        onClick={handleCustomClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleCustomClick();
        }}
        style={{
          margin: "14px 0",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        Custom Role Button (Clicks: {customClicks})
      </div>

      <form onSubmit={handleSubmit}>
        {/* getByLabelText */}
        <label htmlFor="name">Name</label>

        {/* getByLabelText + getByPlaceholderText */}
        <input
          id="name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* getByRole */}
        <button type="submit">Submit</button>
      </form>

      {/* queryByText + getByText */}
      {showMsg && <p>Hello {name}</p>}
    </div>
  );
}
