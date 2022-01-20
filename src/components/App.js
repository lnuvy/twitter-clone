import React, { useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";

function App() {
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
