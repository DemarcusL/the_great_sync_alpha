// import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Dropdown from './spotify/Dropdown';
import { Credentials } from './Credentials';
import axios from 'axios';
import { useState } from 'react'
import Listbox from './spotify/Listbox';
import Detail from './spotify/Detail';
import User from './spotify/User';
import Login from './spotify/Login';
import { loginUrl } from "./spotify/Spotify"
import { getTokenFromUrl } from "./spotify/Spotify";
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
