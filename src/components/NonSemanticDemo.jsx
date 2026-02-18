import { useState } from "react";

/*
  ✅ NOTE FOR LEARNERS (NON-SEMANTIC ELEMENT TESTING)

  Non-semantic elements:
  - <div>
  - <span>

  They do NOT have meaning by default.
  So for accessibility + testing, we add:
  ✅ role=""
  ✅ tabIndex={0}
  ✅ aria-label
  ✅ keyboard support (Enter / Space)

  This component teaches:
  - <div role="button">
  - <span role="checkbox">
*/

export default function NonSemanticDemo() {
  const [likes, setLikes] = useState(0);
  const [agreed, setAgreed] = useState(false);

  const handleLike = () => setLikes((prev) => prev + 1);

  const toggleAgree = () => setAgreed((prev) => !prev);

  return (
    <div>
      <h2>Non Semantic Demo</h2>

      {/* ======================================================
          ✅ NON-SEMANTIC BUTTON
          - <div> is NOT a button by default
          - We add role="button" + aria-label
      ======================================================= */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Like Button"
        onClick={handleLike}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleLike();
        }}
        style={{
          padding: "10px 14px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          cursor: "pointer",
          width: "fit-content",
          marginBottom: "12px",
          userSelect: "none",
        }}
      >
        👍 Like (Likes: {likes})
      </div>

      {/* ======================================================
          ✅ NON-SEMANTIC CHECKBOX
          - <span> is NOT a checkbox by default
          - We add role="checkbox"
          - aria-checked is REQUIRED for checkbox role
      ======================================================= */}
      <span
        role="checkbox"
        tabIndex={0}
        aria-label="Terms Checkbox"
        aria-checked={agreed}
        onClick={toggleAgree}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleAgree();
        }}
        style={{
          display: "inline-block",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {agreed ? "☑" : "☐"} I agree to terms
      </span>

      {/* Output text (easy to test) */}
      <p style={{ marginTop: "12px" }}>
        Status: {agreed ? "Agreed" : "Not Agreed"}
      </p>
    </div>
  );
}
