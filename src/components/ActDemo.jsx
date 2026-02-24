import { useState } from "react";

export default function ActDemo() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  return (
    <div>
      <h2>Act Demo Counter</h2>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increase After 1s</button>
    </div>
  );
}