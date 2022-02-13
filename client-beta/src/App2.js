// import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Dropdown from './App-1/Dropdown';
import { Credentials } from './Credentials';
import axios from 'axios';
import { useState } from 'react'
import Listbox from './App-1/Listbox';
import Detail from './App-1/Detail';
import User from './App-2/User';
import Login from './App-2/Login';
import { loginUrl } from "./App-2/Spotify"
import { getTokenFromUrl } from "./App-2/Spotify";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {

  const [token, setToken] = useState();

  useEffect(() => {

    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
    }

    console.log("token", token);
  }, []);

  return <div className="app">{token ? <h1>{}Logged in</h1> : <Login />}</div>;
}

export default App;
