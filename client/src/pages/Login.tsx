import React, {
  useState,
  FC,
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

interface LoginFormData {
  email?: string;
  password?: string;
}

const Login: FC<LoginFormData> = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const authContext = useContext(AuthContext);
  // const user = authContext?.user
  // const loginCall = authContext?.loginCall
  // const setUser = authContext?.setUser
  // const message = authContext?.message
  // const setMessage = authContext?.setMessage

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // LOGIN CALL WILL BE MOVED TO CONTEXT API

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Missing fields!"); // change later for better alerts
    }
    authContext?.loginCall(formData);
  };

  // Resetting Messages

  useEffect(() => {
    if (authContext?.message) {
      console.log(authContext.message);
      authContext.setMessage("");
    }
  }, [authContext?.message, authContext?.setMessage, authContext]);

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="form-header">Login</h2>
        <div className="alerts">
          <h3>ADD TOAST ALERTS HERE</h3>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="lower">
          <span>
            Don't have an account? <Link to={"/register"}>Register Here!</Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
