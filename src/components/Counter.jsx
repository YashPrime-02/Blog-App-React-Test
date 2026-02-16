import { useState } from "react";

/*
  ✅ NOTE FOR LEARNERS:
  This is a small functional component for RTL testing.

  Features:
  - Shows a count
  - Button increases count
  - Button decreases count
  - Reset button resets count to 0
*/

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter Component</h2>

      {/* ✅ Accessible text */}
      <p aria-label="count-value">Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
