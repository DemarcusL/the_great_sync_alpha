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


import Detail from './App-1/Detail';
import User from './App-2/User';
import Login from './App-2/Login';

// class Playlist {
//   description: string
//   owner: string
//   name: string
//   tracks: Object
//   constructor(name, owner, description, tracks) {

//     this.name = name;
//     this.owner = owner;
//     this.description = description;
//     this.tracks = tracks;
//   }

// }


function App() {

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
  const [user, setUser] = useState([]);


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

    var userPlaylistRes = await axios(`https://api.spotify.com/v1/users/${user_id}/playlists?limit=2`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + tokenResponse.data.access_token,
        'Content-Type': 'application/json'
      }
    })

    setUserPlaylists(userPlaylistRes.data.items);
    console.log(userPlaylistRes);

    setToken(tokenResponse.data.access_token);
    setGenres(genreDataRes.data.categories.items);

    // console.log(genreDataRes);

    // console.log(tokenResponse.data.access_token);

  }, []);

  // console.log(token);
  // console.log(genres);



  useEffect(async () => {

  }, []);


  console.log(userPlaylists)
  /////////////////////////////////////////////////////////////////////

  const genreChanged = val => {
    // setGenres({
    //   selectedGenre: val,
    //   listOfGenresFromAPI: genres.listOfGenresFromAPI
    // })

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


  // https://developer.spotify.com/documentation/

  return (
    <div>
      <div className="app"><Login /></div>

      <div className="genre-box">

        <h3 className='genre-header' > Popular Genres </h3>

        <h6 className="genre-header"> Choose from Spotify's most popular genres</h6>

        <form onSubmit={buttonClicked}>

          <div>
            <Dropdown options={genres} changed={genreChanged} />

            <Dropdown options={playlist.listOfPlaylistFromAPI} selected={playlist.selectedPlaylist} changed={playlistChanged} />
          </div>

          <div className="">
            <Button type='submit'> Search </Button>
          </div>

          {/* <div className="">
            <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
          </div> */}
        </form>

          <div className="">
            <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
          </div>

          <div>
            {trackDetail && <Detail {...trackDetail} />}

          </div>


        <div className='user-playlists-div'>
          <ListboxPlaylist className='user-playlists-box' items={userPlaylists} clicked={listboxClicked} />
        </div>

      </div>
    </div>
  );


}

export default App;
