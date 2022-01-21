import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDelete = async (event) => {
    const target = event.target.innerText;
    const ok = window.confirm(`Are you sure want to ${target}?`);
    if (ok) {
      const TweetRef = doc(dbService, `tweets/${tweetObj.id}`);
      await deleteDoc(TweetRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(tweetObj, newTweet);
    const TweetRef = doc(dbService, `tweets/${tweetObj.id}`);
    await updateDoc(TweetRef, {
      text: newTweet,
    });
    toggleEditing();
  };

  return (
    <div key={tweetObj.id}>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Tweet..."
              value={newTweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Edit" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDelete}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
