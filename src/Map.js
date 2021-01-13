import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import map from './maps-icon.png';
import photo from './photo-icon.png';
import info from './info-icon.png';
import './Map.css';

/*
import $ from 'jquery';
import axios from 'axios';

  toPhp (){
    const url = 'https://localhost:80/dataR.php';
    const data = { username: 'example' };
    axios.post(url, {lat: this.state.longitude,
      lon:  this.state.longitude,
      radius:500,
      sensor:false,
      key:'AIzaSyCA5D-W9I3bx-qPLqoFhJycXdWgHS6T17E'}, function(){
      // the output of the response is now handled via a variable call 'results'
    }).then(res => console.log("ok"))
    .catch (err => console.log("error"));

    /*fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      success: function (data) {
        alert(data);
      }
    }).then(res => res.json())
  }*/

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      data: {},
      len: null,
      randomNum: null,
      randomLat: null,
      randomLon: null,
      arr: [],
      nameOfResturant: null,
      resturantRating: null,
    };
    this.showPosition = this.showPosition.bind(this);
    this.newRes = this.newRes.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log('can not access to location')
    }
  };

  showPosition(position) {
    this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude });
    this.fetchResData();
  }

  fetchResData() {
    let url;
    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.latitude + ',' + this.state.longitude + '&radius=1000&type=restaurant&key=yourkey';

    fetch(url)
    .then(results => results.json())
    .then(results => {
      this.setState({data: results});
      this.newRes();
    })
  }
  
  newRes(){
    for (let i in this.state.data.results){
      this.state.arr = this.state.data.results;
    }

    console.log(this.state.arr.length);
    this.state.randomNum = Math.floor(Math.random() * this.state.arr.length);
    this.setState({randomLat: this.state.arr[this.state.randomNum].geometry.location.lat,
      randomLon: this.state.arr[this.state.randomNum].geometry.location.lng,
      nameOfResturant: this.state.arr[this.state.randomNum].name,
      resturantRating: this.state.arr[this.state.randomNum].rating,
      //resturantPhoto: this.state.a[this.state.randomNum].photos
    })
    //console.log(this.state.a[this.state.randomNum].resturantPhoto);
  }
  
  render() {
    if(this.state.randomLon != null && this.state.randomLat != null)
    return (
    <div>
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{ lat: this.state.latitude, lng: this.state.longitude}}
      >
        <Marker position={{ lat: this.state.randomLat, lng: this.state.randomLon}}/>
      </Map>

      <div className="infoRes position-absolute">
        <div className="infoDiv1">
          {this.state.nameOfResturant}
        </div>
        <div className="infoDiv2">
          {this.state.resturantRating} / 5
        </div>
        <div className="row pt-1">
          <div className="col vLine">
            <a rel={'external'} target="_blank" href={'https://www.google.com/maps/search/?api=1&query=' + this.state.randomLat + ',' + this.state.randomLon} > 
              <img className="icon" src={map}/>
            </a>
          </div>
          <div className="col vLine">
            <a rel={'external'} target="_blank">
              <img className="icon" src={photo} />
            </a>
          </div>
          <div className="col">
            <a rel={'external'} target="_blank">
              <img className="icon" src={info}/>
            </a>
          </div>
        </div>
      </div>

      <div className="btn-2Div position-absolute d-flex justify-content-center">
        <button className="button btn-2" onClick={this.newRes}> اقتراح أخر</button>
      </div>
    </div>
    );

    return "";
  }
}

const mapStyles = {
  width: '100%',
  height: '88%',
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCA5D-W9I3bx-qPLqoFhJycXdWgHS6T17E'
})(MapContainer);
