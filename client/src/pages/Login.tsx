import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth'; // Assuming you have a utility to handle authentication
import { login } from "../api/authAPI"; // Assuming the login function is in authAPI

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Handle changes in form input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API and get the response
      const data = await login(loginData);

      console.log("Login response data:", data); // Log the response data for debugging

      // Check if the data contains a token and handle successful login
      if (data && data.token) {
        // Save the token using a utility like Auth.login
        Auth.login(data.token);
      } else {
        console.error('Login failed: No token returned');
      }
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
  );
};

export default Login;