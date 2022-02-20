
import React from "react";
import "../App.css";
import { loginUrl } from "./Spotify";
// import spotify_logo from 'images/spotify-logo.svg'

function Login() {
  return (
    <div className="spotify-login-box">
      <img
        src="spotify-logo.svg"
        alt="Spotify logo"
      />
      <a className='link' href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;