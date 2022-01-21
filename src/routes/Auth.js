import React from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "fbase";
import AuthForm from "components/AuthForm";
import "./CSS/Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <div className="auth-container">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="auth-BtnContainer">
        <button name="google" onClick={onSocialClick} className="auth-btn">
          <FontAwesomeIcon icon={faGoogle} /> Continue with Google
        </button>
        <button name="github" onClick={onSocialClick} className="auth-btn">
          <FontAwesomeIcon icon={faGithub} /> Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
