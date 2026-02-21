export default function TextMatchDemo() {
  return (
    <div>
      <h2>TextMatch Demo</h2>

      <p>Welcome to React Testing Library</p>

      <p>Hello Yash Mishra</p>

      <p>Email: yash@gmail.com</p>

      {/* Split text */}
      <p>
        User: <span>Yash</span> <span>Mishra</span>
      </p>

      {/* Nested text */}
      <p>
        Account: <strong>Premium</strong> Plan
      </p>

      {/* Extra whitespace */}
      <p>
        Status:      Active
      </p>

      <button>Click Me</button>
    </div>
  );
}