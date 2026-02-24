import { useState } from "react";

/*
  ==========================================================
  ✅ RTL QUERY METHODS DEMO
  ==========================================================

  This component is made to demonstrate:

  1️⃣ getBy*      → Synchronous, throws error if not found
  2️⃣ getAllBy*   → Synchronous, throws if none found
  3️⃣ queryBy*    → Returns null if not found
  4️⃣ queryAllBy* → Returns [] if none found
  5️⃣ findBy*     → Async (waits for element)
  6️⃣ findAllBy*  → Async (waits for multiple elements)

  Used for learning proper testing strategy.
*/

export default function QueryMethodsDemo() {
  const [showMessage, setShowMessage] = useState(false);
  const [items, setItems] = useState([]);
  const loadMessage = () => {
    setTimeout(() => {
      setShowMessage(true);
    }, 500);
  };
  const loadItems = () => {
    setTimeout(() => {
      setItems(["React", "Vitest", "RTL"]);
    }, 500);
  };
   return (
    <div>
      <h2>Query Methods Demo</h2>

      <button onClick={loadMessage}>Load Message</button>
      <button onClick={loadItems}>Load Items</button>

      {showMessage && <p>Async Message Loaded</p>}

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}