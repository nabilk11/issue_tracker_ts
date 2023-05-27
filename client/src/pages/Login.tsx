import React, { useState } from "react";
import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC<LoginFormData> = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // LOGIN CALL WILL BE MOVED TO CONTEXT API

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Missing fields!"); // change later for better alerts
    }

    // ADD MORE VALIDATIONS
    else {
      try {
        const credentials = {
          email: formData.email,
          password: formData.password,
        };

        // MUST RECOVER TOKEN AND ACCESS PROTECTED ROUTES
        const result = await axios.post("https://localhost:8000/api/login", credentials);

        
      } catch (err) {
        console.log(err);
      }
    }
  };

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
      </div>
    </div>
  );
};

export default Login;
