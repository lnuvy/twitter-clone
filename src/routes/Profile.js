import { authService, dbService } from "fbase";
import { signOut } from "firebase/auth";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ userObj }) => {
  const onLogOutClick = () => {
    signOut(authService);
  };

  const getMyTweets = async () => {
    const q = query(
      collection(dbService, "tweets"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((test) => console.log(test.data()));
  };

  return (
    <>
      <Link to="/">
        <button onClick={onLogOutClick}>Log Out</button>
      </Link>
      <button onClick={getMyTweets}>test</button>
    </>
  );
};
export default Profile;
