import { useState } from "react";
import axiosClient from "../../axios-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function UserForm() {
  const navigate = useNavigate();
  const [startDate, _setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
  });
  const [errors, setErrors] = useState(null);
  const { setNotification } = useStateContext();

  const setStartDate = (date) => {
    _setStartDate(date);
    setUser({ ...user, dob: moment(date).format("YYYY-MM-DD") });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/users", user)
      .then(({ data }) => {
        if (data.code == 0) {
          setErrors(data.message);
        } else {
          setNotification("User was successfully created");
          navigate("/users");
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
    <>
      <h1>New User</h1>
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            <p>{errors}</p>
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              className="text-input"
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              type="text"
              placeholder="First Name"
            />
            <input
              className="text-input"
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              type="text"
              placeholder="Last Name"
            />
            <input
              className="text-input"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Email"
            />
            <input
              className="text-input"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password"
            />
            <input
              className="text-input"
              value={user.password_confirmation}
              onChange={(e) =>
                setUser({ ...user, password_confirmation: e.target.value })
              }
              type="password"
              placeholder="Password Confirmation"
            />
            <input
              className="text-input"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
              value={user.gender}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
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
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              type="text"
              placeholder="Address"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
