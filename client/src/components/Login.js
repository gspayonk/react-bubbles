import React from 'react';
import {useState, useEffect} from 'react';
import axiosWithAuth from './../utils/axiosWithAuth';


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", {
        username: username,
        password: password
      })
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => console.error(err.response));
  };

  // const [item, setItem] = useState({ username: '',password: ''})

  // const handleChange = event => {
  //   event.preventDefault();
  //   setItem({ ...item, [event.target.name]: event.target.value })
  //   console.log(event.target.value)
  // }

  // const login = event => {
  //   event.preventDefault()

  //   axiosWithAuth()
  //     .post('/login', item)

  //     .then(response => {
  //       localStorage.setItem('token', response.data.payload)
  //       props.history.push('/bubbles')
  //       console.log(response);

  //     })

  //     .catch(error => {
  //       console.log(error.response)
  //       setItem({
  //         username: '',
  //         password: ''
  //       })
  //     })
  // }


  return (
    <>
    <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
    // <form onSubmit = {login}>
    //   <ul>
    // <>
    //   <h1>Welcome to the Bubble App!</h1>
    //   <li><input name = 'Username' value = {item.username} placeholder = 'username' onChange={handleChange}/></li>
    //   <li><input name = 'Password' value = {item.password} placeholder = 'password' onChange={handleChange}/></li>

    //   <button>Submit</button>
    // </>
    // </ul>
    // </form>
  );
};

export default Login;
