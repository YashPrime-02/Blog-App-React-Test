import { render, screen } from "@testing-library/react";
import App from "./App";

// ✅ Test Case 1: Check if the heading "First React Test Case" is shown
test("renders the correct heading", () => {
  // 1️⃣ Render the App component in a virtual DOM (jsdom)
  render(<App />);

  // 2️⃣ Find the heading text on the screen
  // /.../i is a RegEx (pattern) and 'i' means case-insensitive
  const heading = screen.getByText(/first react test case/i);

  // 3️⃣ Verify that the heading is present in the document
  expect(heading).toBeInTheDocument();
});

// ✅ Test Case 2: Check if the image is present using its alt text
test("renders the image using alt text", () => {
  // 1️⃣ Render the App component
  render(<App />);

  // 2️⃣ Find the image by its alt attribute
  // getByAltText searches for <img alt="...">
  const image = screen.getByAltText("Sample online");

  // 3️⃣ Verify that the image exists
  expect(image).toBeInTheDocument();
});

// ✅ Test Case 3: Check if the image has the correct title attribute
test("image has correct title attribute", () => {
  // 1️⃣ Render the App component
  render(<App />);

  // 2️⃣ Find the element by its title attribute
  // getByTitle searches for title="..."
  const image = screen.getByTitle("React Test Image");

  // 3️⃣ Verify it exists
  expect(image).toBeInTheDocument();
});

// ✅ Test Case 4: Check if the image has the correct src URL
test("image has correct src URL", () => {
  // 1️⃣ Render the App component
  render(<App />);

  // 2️⃣ Get the image using alt text
  const image = screen.getByAltText("Sample online");

  // 3️⃣ Verify that the src attribute matches the expected URL
  expect(image).toHaveAttribute(
    "src",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
  );
});

// ✅ Test Case 5: Check if the developer name is shown
test("renders developer name text", () => {
  // 1️⃣ Render the App component
  render(<App />);

  // 2️⃣ Find the paragraph text
  const devText = screen.getByText(/developed by yash mishra/i);

  // 3️⃣ Verify it exists
  expect(devText).toBeInTheDocument();
});
