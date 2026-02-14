import { useState } from "react";
import "../src/App.css";
import User from "./components/users";

export default function App() {
  // ✅ Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // ✅ Error states (for validation)
  const [errors, setErrors] = useState({
    name: "",
    email: ""
  });

  // ✅ Success message after submit
  const [submittedMsg, setSubmittedMsg] = useState("");

  // ✅ Validation function
  const validateForm = () => {
    let newErrors = { name: "", email: "" };
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ✅ Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1️⃣ Validate
    const isValid = validateForm();

    // 2️⃣ If not valid, stop submit
    if (!isValid) return;

    // 3️⃣ Show success message
    setSubmittedMsg(`Form Submitted: ${name} (${email})`);

    // 4️⃣ Clear inputs after submit
    setName("");
    setEmail("");

    // 5️⃣ Clear errors after submit
    setErrors({ name: "", email: "" });
  };

  return (
    <div>
      <h1>First React Test Case</h1>

      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
        alt="Sample online"
        title="React Test Image"
      />

      <p>Developed By Er Yash Mishra</p>

      <form className="contactForm" onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="formGroup">
          <label className="formLabel" htmlFor="name">
            Name
          </label>

          <input
            className="formInput"
            id="name"
            type="text"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* ✅ Error message (testable) */}
          {errors.name && <p className="errorText">{errors.name}</p>}
        </div>

        {/* EMAIL */}
        <div className="formGroup">
          <label className="formLabel" htmlFor="email">
            Email
          </label>

          <input
            className="formInput"
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* ✅ Error message (testable) */}
          {errors.email && <p className="errorText">{errors.email}</p>}
        </div>

        <button className="formBtn" type="submit">
          Submit
        </button>
      </form>

      {/* ✅ Success message (testable) */}
      {submittedMsg && <p className="successText">{submittedMsg}</p>}
    </div>
  );
}
