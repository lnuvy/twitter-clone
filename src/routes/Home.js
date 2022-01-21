import Tweet from "components/Tweet";
import Imymemine from "components/TweetFactory";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(getFirestore(), "tweets"),
      orderBy("createdAt", "desc")
      // 두번째 인자로 조건을 넣으면 됨
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tweetArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTweets(tweetArray);
      console.log(`Current tweets in CA: `, tweetArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Imymemine userObj={userObj} />
      <div>
        <br />
        <hr />
        <br />
        {tweets.map((t) => (
          <Tweet
            key={t.id}
            tweetObj={t}
            isOwner={t.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
