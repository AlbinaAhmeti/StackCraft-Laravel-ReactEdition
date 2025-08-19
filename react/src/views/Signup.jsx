import { useRef, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextsProvider";
import axiosClient from "../axios-client";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    console.log("POST to:", axiosClient.defaults.baseURL + "/signup");

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for free</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={nameRef} placeholder="Full Name"></input>
          <input ref={emailRef} type="email" placeholder="Email"></input>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
          ></input>
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Password Confirmation"
          ></input>
          <button className="btn btn-block">Sign up</button>
          <p className="message">
            Aready Registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
