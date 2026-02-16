import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import User from "./components/users";
import ProfileCard from "./components/profileCard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <header className="appHeader">
        <nav className="appNav">
          <Link className="navLink" to="/">
            Form
          </Link>

          <Link className="navLink" to="/user">
            User
          </Link>

          <Link className="navLink" to="/profile">
            Profile
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<App />} />

        <Route
          path="/user"
          element={<User name="Yash Mishra" email="yash@gmail.com" />}
        />

        <Route
          path="/profile"
          element={
            <ProfileCard
              name="Yash"
              role="Frontend Developer"
              isOnline={true}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
