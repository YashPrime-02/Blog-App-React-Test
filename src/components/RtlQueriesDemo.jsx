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
*/

export default function RtlQueriesDemo() {
  const [name, setName] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMsg(true);
  };

  return (
    <div data-testid="rtl-demo">
      {/* getByRole / getByText */}
      <h2>RTL Queries Demo</h2>

      {/* getByAltText */}
      <img
        src="https://via.placeholder.com/150"
        alt="Demo Image"
        title="Profile Demo"
      />

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
