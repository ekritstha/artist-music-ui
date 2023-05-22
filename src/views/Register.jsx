import React, { createRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function Register() {
  const [startDate, _setStartDate] = useState(new Date());
  const [dob, setDOB] = useState(null);
  const [errors, setErrors] = useState(null);

  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const phoneRef = createRef();
  const genderRef = createRef();
  const addressRef = createRef();

  const setStartDate = (date) => {
    _setStartDate(date);
    setDOB(moment(date).format("YYYY-MM-DD"));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      phone: phoneRef.current.value,
      dob: dob,
      gender: genderRef.current.value,
      address: addressRef.current.value,
    };

    axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        if (data.code == 0) {
          console.log("asd");
          setErrors(data.message);
        } else {
          const navigate = useNavigate();
          navigate("/login");
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
          <h1 className="title">Signup</h1>
          {errors && (
            <div className="alert">
              <p>{errors}</p>
            </div>
          )}
          <input
            className="text-input"
            ref={firstNameRef}
            type="text"
            placeholder="First Name"
          />
          <input
            className="text-input"
            ref={lastNameRef}
            type="text"
            placeholder="Last Name"
          />
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
          <input
            className="text-input"
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Password Confirmation"
          />
          <input
            className="text-input"
            ref={phoneRef}
            type="number"
            placeholder="Phone Number"
          />
          <DatePicker
            className="text-input"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
          />
          <select
            className="text-input"
            ref={genderRef}
            type="text"
            placeholder="Gender"
          >
            <option>Select Gender</option>
            <option value="m">Male</option>
            <option value="f">Female</option>
            <option value="o">Others</option>
          </select>
          <input
            className="text-input"
            ref={addressRef}
            type="text"
            placeholder="Address"
          />
          <button className="btn btn-block">Register</button>

          <p className="message">
            Already Registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
