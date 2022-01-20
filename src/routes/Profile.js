import { authService } from "fbase";
import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const onLogOutClick = () => {
    authService.signOut();
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
