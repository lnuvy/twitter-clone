import { authService } from "fbase";
import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const onLogOutClick = () => {
    signOut(authService);
  };

  return (
    <>
      <Link to="/">
        <button onClick={onLogOutClick}>Log Out</button>
      </Link>
    </>
  );
};
export default Profile;
