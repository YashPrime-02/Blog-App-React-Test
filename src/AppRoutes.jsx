import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import User from "./components/users";
import ProfileCard from "./components/profileCard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <Link to="/">Form</Link>
        <Link to="/user">User</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<App />} />

        <Route
          path="/user"
          element={<User name="Yash Mishra" email="yash@gmail.com" />}
        />

        <Route
          path="/profile"
          element={
            <ProfileCard name="Yash" role="Frontend Developer" isOnline={true} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
