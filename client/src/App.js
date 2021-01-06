import React, {Component} from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      albums: {
        artist: '',
        name: '',
        image: '',
        release: ''
      }
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  } 

  myAlbums() {
    spotifyWebApi.getArtistAlbums('1mYsTxnqsietFxj1OgoGbG')
      .then((response) => {
          this.setState({
            albums: {
              artist: response.items[0].artists[0].name,
              name: response.items[0].name,
              image: response.items[0].images[0].url,
              release: response.items[0].release_date
            }
          });
      })
  }
  

  render(){
    return (
      <div className="App">
        <a href="http://localhost:8888">
          <button>Login with Spotify</button>
        </a>
        <div>Artist Name: {this.state.albums.artist}</div>
        <div>
          <img src={this.state.albums.image} style={{width: 100}}></img>
        </div>
        <div>Artist Albums: {this.state.albums.name}</div>
        <div>Release Date: {this.state.albums.release}</div>
        { this.state.loggedIn &&
            <button onClick={() => this.myAlbums()}>
            Check Albums
          </button>
        }
      </div>
    );
  }
}

export default App;
