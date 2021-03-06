// import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Dropdown from './App-1/Dropdown';
import { Credentials } from './Credentials';
import axios from 'axios';
import { useState } from 'react'
import Listbox from './App-1/Listbox';
import ListboxPlaylist from './App-1/ListboxPlaylist';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap'
import ListBoxProfile from './App-1/ListBoxProfile';
import { getTokenFromUrl } from "./App-2/Spotify";
import SpotifyWebApi from "spotify-web-api-js";
// import { itunesApiRequest, mediaTypes } from './utils';




import Detail from './App-1/Detail';
import User from './App-2/User';
import Login from './App-2/Login';
import Logout from './App-2/Logout';



function App() {

  const spotifyAPI = new SpotifyWebApi();

  const spotify = Credentials();
  const user_id = 'chubbzfkga';



  ///////////States for passing props down to then be lifted and set /////////////
  const [token, setToken] = useState('');


  const [genres, setGenres] = useState([]);

  const [playlist, setPlaylist] = useState({
    selectedPlaylist: '',
    listOfPlaylistFromAPI: []
  });

  const [tracks, setTracks] = useState({
    selectedTrack: '',
    listOfTracksFromAPI: []
  });

  const [trackDetail, setTrackDetail] = useState(null);

  const [userPlaylists, setUserPlaylists] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [iTunesSerch, setItunesSearch] = useState({searchResults:''})


  ///////////////////////////////////////////////////////////////////

  useEffect(async () => {

    var tokenResponse =
      await axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })

    var genreDataRes =
      await axios('https://api.spotify.com/v1/browse/categories?locale=US', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + tokenResponse.data.access_token,
          'Content-Type': 'application/json'
        },
      })

    var userPlaylistRes = await axios(`https://api.spotify.com/v1/users/${user_id}/playlists?limit=5`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + tokenResponse.data.access_token,
        'Content-Type': 'application/json'
      }
    })

    var userProfileRes = await axios(`https://api.spotify.com/v1/users/${user_id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + tokenResponse.data.access_token,
        'Content-Type': 'application/json'
      }
    })

    // 	var updateiTunesSearch = (text, media) => {
    // 		const response = await axios(itunesApiRequest(text, media));
    // return 
    // 	}

    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      spotifyAPI.setAccessToken(_token);
    }

    console.log("token recieved");

    setUserPlaylists(userPlaylistRes.data.items);
    // console.log(userPlaylistRes);
    // setToken(tokenResponse.data.access_token);
    setGenres(genreDataRes.data.categories.items);
    // console.log(userProfileRes.data);
    setUserProfile(userProfileRes.data)
    // setItunesSearch({ searchResults: response.results });


    // console.log(genreDataRes);

    // console.log(tokenResponse.data.access_token);

  }, []);



  // console.log(token);
  // console.log(genres);
  // console.log(userPlaylists)
  // console.log(userProfile);
  // console.log(iTunesSerch);



  useEffect(async () => {

  }, []);


  /////////////////////////////////////////////////////////////////////

  const genreChanged = val => {


    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(playlistResponse => {
        setPlaylist({
          selectedPlaylist: playlist.selectedPlaylist,
          listOfPlaylistFromAPI: playlistResponse.data.playlists.items
        })
      });

    // console.log(val);
  };

  const playlistChanged = val => {

    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
    });

  }

  const buttonClicked = e => {
    e.preventDefault();

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(tracksResponse => {
        setTracks({
          selectedTrack: tracks.selectedTrack,
          listOfTracksFromAPI: tracksResponse.data.items
        })
      });
  }

  const listboxClicked = val => {

    const currentTracks = [...tracks.listOfTracksFromAPI];

    const trackInfo = currentTracks.filter(t => t.track.id === val);

    setTrackDetail(trackInfo[0].track);
  }



  return (
    <div>

      <div className="app"><Login /></div>

      <div className="genre-box">


        <h6 className="genre-header"> Choose 1 of your playlists below </h6>

        <div>
          <ListBoxProfile className="user-profile-box" items={userProfile} />
        </div>


        <div className='user-playlists-div'>
          <ListboxPlaylist className='user-playlists-box' items={userPlaylists} clicked={listboxClicked} />
        </div>

        <h6 className="genre-header"> or choose from Spotify's popular playlists </h6>

        <h3 className='genre-header' > Popular Genres </h3>

        <form onSubmit={buttonClicked}>

          <div>
            <Dropdown className='dropdown' options={genres} changed={genreChanged} />

            <Dropdown className='dropdown' options={playlist.listOfPlaylistFromAPI} selected={playlist.selectedPlaylist} changed={playlistChanged} />
          </div>

          <div className='dropdown'>
            <Button type='submit'> Search </Button>
          </div>

          <div className="">
            <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
          </div>

        </form>

        <div className="tracklist-box">
          <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
        </div>

        <div>
          {trackDetail && <Detail {...trackDetail} />}
        </div>

        <div>

        </div>

      </div>

        <div id="appleid-signin" data-color="black" data-border="false" data-type="sign in" className="itunes-box"></div>
        <script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>


    </div>
  );


}

export default App;
