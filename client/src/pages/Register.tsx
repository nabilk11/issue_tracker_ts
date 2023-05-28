import React, { useState, FC, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: FC<RegisterFormData> = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Missing fields!"); // change later for better alerts
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!"); // change later for some messaging popup
    } else {
      try {
        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        await axios.post("https://localhost:8000/api/register", newUser);

        // add login call and login user
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="form-header">Register</h2>
        <div className="alerts">
          <h3>ADD TOAST ALERTS HERE</h3>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
