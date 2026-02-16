import { useState } from "react";

/*
  ✅ NOTE FOR LEARNERS:
  This is a Functional Component.

  It uses:
  - props (name, role, isOnline)
  - state (likes)
  - button click event
*/

export default function ProfileCard({ name, role, isOnline }) {
  const [likes, setLikes] = useState(0);

  return (
    <div data-testid="profile-card">
      <h2 data-testid="profile-heading">Profile Card</h2>

      <p data-testid="profile-name">Name: {name}</p>
      <p data-testid="profile-role">Role: {role}</p>

      {/* Conditional Rendering */}
      <p data-testid="profile-status">
        Status: {isOnline ? "Online" : "Offline"}
      </p>

      {/* State update */}
      <p data-testid="profile-likes">Likes: {likes}</p>

      <button data-testid="like-btn" onClick={() => setLikes(likes + 1)}>
        Like
      </button>
    </div>
  );
}
