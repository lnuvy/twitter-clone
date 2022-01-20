import React from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const onDeleteClick = () => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm("Are you sure want to delete?");
    if (ok) {
      // delete
    }
  };
  return (
    <div key={tweetObj.id}>
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Tweet</button>
          <button>Edit Tweet</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
