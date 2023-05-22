import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Login() {
  const [errors, setErrors] = useState(null);
  const { setToken } = useStateContext();

  const emailRef = createRef();
  const passwordRef = createRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        if (data.code == 0) {
          setErrors(data.message);
        } else {
          setToken(data.access_token);
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          {errors && (
            <div className="alert">
              <p k>{errors}</p>
            </div>
          )}
          <input
            className="text-input"
            ref={emailRef}
            type="email"
            placeholder="Email"
          />
          <input
            className="text-input"
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
          <button className="btn btn-block">Login</button>

          <p className="message">
            Not registered? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
