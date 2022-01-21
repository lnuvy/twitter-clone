import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import "./CSS/AuthForm.css";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      const errMsg = errorMsg(error.message);
      setError(errMsg);
    }
  };

  const errorMsg = (err) => {
    if (err.includes("already")) {
      return "이미 사용중인 이메일입니다.";
    } else if (err.includes("not-found")) {
      return "올바르지 못한 이메일입니다.";
    } else if (err.includes("wrong-password")) {
      return "비밀번호가 일치하지 않습니다.";
    } else if (err.includes("invalid-email")) {
      return "유효하지 않은 이메일입니다.";
    } else {
      console.log(err);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className="form-container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="auth-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="auth-input"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
          className="auth-submit"
        />
        {error && <span className="auth-error">{error}</span>}
        {newAccount ? (
          <span className="auth-info">
            If you have Account already, Click Log in
          </span>
        ) : (
          <span className="auth-info">Do you want to create Account?</span>
        )}
      </form>
      <span onClick={toggleAccount} className="auth-switch">
        {newAccount ? "Log in" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
