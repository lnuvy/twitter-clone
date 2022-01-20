import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const onClick = async (event) => {
    const target = event.target.innerText;
    console.log(target);

    const ok = window.confirm(`Are you sure want to ${target}?`);
    if (ok) {
      const TweetRef = doc(dbService, `tweets/${tweetObj.id}`);
      if (target.includes("Delete")) {
        console.log(`delete`);
        await deleteDoc(TweetRef);
      } else if (target.includes("Edit")) {
        console.log(`Edit`);
        await updateDoc(TweetRef);
      }
    } else {
      return;
    }
  };
  return (
    <div key={tweetObj.id}>
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onClick}>Delete Tweet</button>
          <button onClick={onClick}>Edit Tweet</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
