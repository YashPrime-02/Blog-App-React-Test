import React from "react";

/*
  ✅ NOTE FOR LEARNERS:
  This is a Class Component in React.
  (Old style, but still important for interviews and legacy projects)
*/

class User extends React.Component {
  render() {
    // Props coming from parent (App.jsx)
    const { name, email } = this.props;

    return (
      <div>
        <h2>User Details</h2>

        <p>Name: {name}</p>
        <p>Email: {email}</p>
      </div>
    );
  }
}

export default User;
