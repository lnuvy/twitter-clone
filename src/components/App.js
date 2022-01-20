import React, { useState } from "react";
import AppRouter from "./Router";
import { fbase } from "fbase";
import { getAuth } from "firebase/auth";

function App() {
  console.log(getAuth(fbase).currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
