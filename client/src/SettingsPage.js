import "./SettingsPage.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import BACKEND_URL from "./constants";

const FormRow = ({ labelText, type = "text", value, handleChange, name }) => {
  return (
    <div className="form-row">
      <label className="form-label">{labelText}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      ></input>
    </div>
  );
};
const initialState = {
  name: "",
  password: "",
};

function SettingsPage() {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {};

    values.name && (user.name = values.name);
    values.password && (user.password = values.password);
    const id = JSON.parse(localStorage.getItem("user"))._id;

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/user/update-user?id=${id}`,
        user
      );
      navigate("/home");
    } catch (error) {}
  };

  return (
    <div>
      <Navbar />
      <div className="homepage-content">
        <Sidebar />
        <div className="settings-page">
          <form className="settings-page-form">
            <div className="form-center">
              <FormRow
                handleChange={onHandleChange}
                value={values.name}
                name="name"
                type="string"
                labelText="Name"
              />
              <FormRow
                handleChange={onHandleChange}
                value={values.password}
                name="password"
                type="password"
                labelText="Password"
              />
              <button type="submit" onClick={onSubmit} className="btn-settings">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
