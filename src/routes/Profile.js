import { authService, dbService } from "fbase";
import { signOut, updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    signOut(authService);
  };

  const getMyTweets = async () => {
    const q = query(
      collection(dbService, "tweets"),
      where("creatorId", "==", userObj.uid)
      // orderBy("createdAt")
    );
    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((test) => console.log(test.data()));
    querySnapshot.docs.map((doc) => console.log(doc.data()));
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(await authService.currentUser, {
        displayName: newDisplayName,
      });
    }
    refreshUser();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={newDisplayName}
          placeholder="Display name..."
        />
        <input type="submit" value="Update Profile" />
      </form>
      <Link to="/">
        <button onClick={onLogOutClick}>Log Out</button>
      </Link>
      <button onClick={getMyTweets}>test</button>
    </>
  );
};
export default Profile;
