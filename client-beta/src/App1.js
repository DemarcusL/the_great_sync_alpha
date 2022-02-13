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




function App() {

  const spotify = Credentials();
  const user_id = 'smedjan';

  console.log('rendering app ...')


  ///////////States for passing props down to then be lifted and set /////////////
  const [token, setToken] = useState('');
  const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });
  const [tracks, setTracks] = useState({ selectedTrack: '', listOfTracksFromAPI: [] });
  const [trackDetail, setTrackDetail] = useState(null);

  const [userData, setUserData] = useState({});

  ///////////////////////////////////////////////////////////////////
  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
      .then(tokenResponse => {
        setToken(tokenResponse.data.access_token);
        // console.log(tokenResponse.data.access_token);
        axios('https://api.spotify.com/v1/browse/categories?locale=US', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
        })
          .then(genreResponse => {
            // console.log(genreResponse)
            setGenres({
              selectedGenre: genres.selectedGenre,
              listOfGenresFromAPI: genreResponse.data.categories.items
            })
          })

      });
  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);

  // console.log({userData})
  /////////////////////////////////////////////////////////////////////

  const genreChanged = val => {
    setGenres({
      selectedGenre: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    })

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

    console.log(val);
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


    <div className="spotify_box">
      {/* <p> test </p> */}
{/* <Login /> */}
      <form onSubmit={buttonClicked}>
        <Dropdown options={genres.listOfGenresFromAPI} selectedValue={genres.selectedValue} changed={genreChanged} />

        <Dropdown options={playlist.listOfPlaylistFromAPI} selected={playlist.selectedPlaylist} changed={playlistChanged} />

        <div className="col-sm-6 row form-group px-0">
          <button type='submit'> Search </button>
        </div>

        <div className="row">
          <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />

          {trackDetail && <Detail {...trackDetail} />}
        </div>


      </form>
    </div>

  );


}

export default App;
