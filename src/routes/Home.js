import { dbService } from "fbase";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  // const getTweets = async () => {
  //   const q = query(collection(dbService, "tweets"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const tweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setTweets((prev) => [tweetObj, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getTweets();
    const q = query(
      collection(getFirestore(), "tweets")
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
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      setTweet(docRef);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          // value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="tweet" />
      </form>
      <div>
        {tweets.map((t) => (
          <div key={t.id}>
            <h4>{t.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
