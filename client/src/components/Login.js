import React from 'react';
import {useState} from 'react';
import axiosWithAuth from './../utils/axiosWithAuth';


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    axiosWithAuth()
      .post('/api/login', {username: username, password: password})

      .then(response => {
        localStorage.setItem('token', response.data.payload);
        props.history.push('/bubbles');
      })

      .catch(error => console.error(error.response));
  };


  return (
    <>
    <h1>Welcome to the Bubble App!</h1>

      <form onSubmit = {handleSubmit}>
        <ul>
        <li><input
          type = 'text'
          name = 'username'
          placeholder = 'username'
          value = {username}
          onChange = {event => setUsername(event.target.value)}
        /></li>

        <li><input
          type = 'password'
          name = 'password'
          placeholder = 'password'
          value={password}
          onChange={event => setPassword(event.target.value)}
        /></li>
        <button type = 'submit'>Login</button>
        </ul>
      </form>
      </>
  );
};

export default Login;
