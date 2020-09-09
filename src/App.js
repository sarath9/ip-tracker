import React, {useState, useEffect} from 'react';
import './App.css';
import {Map , TileLayer, Marker} from 'react-leaflet';
import axios from 'axios';

function App() {
  const [map, setMap] = useState( {
    lat: 17.3850,
    lng: 78.4867,
    zoom: 14
  });
  const [inData, setIndata] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [dummyData, setDummydata] = useState({
    city: "Hyderbad",
    timezone: '5:30',
    country: "India"
  })

  function searchData(){
    console.log(inData);
    getLocation(inData);
  }
 
const position = [map.lat, map.lng];
const API_KEY = 'at_PE0mHD74uV5Rcs66b4qpzt4CJJXjH';
const URL = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}`;
const getLocation = async (data) => {
  setLoading(true);
  const loc = await axios.get(`${URL}&ipAddress=${data}`);
  const cords = await loc.data.location;
  setDetails(cords);
  setMap({
    lat: cords.lat,
    lng: cords.lng,
    zoom: 14
  })
  setLoading(false)
}

useEffect(() => {
  getLocation();
  setLoading(false)
}, [map])


  return (
    <div className="App">
      <div className={loading ? 'overlay show' : 'overlay'}></div>
     <header>

       <div className="search">
         <h1>IP Address Tracker</h1>
         <div className="search__input">
         <input type="text" value={inData} onChange={(e) => setIndata(e.target.value)} /> <span className="button" onClick={searchData}>Get Data</span>


         </div>

         <div className="infoBox">
           <ul>
             { inData ?
 <li>
 <span>IP Address</span>
 <h2>{inData}</h2>
</li> : ''
             }
            
             <li>
               <span>Location</span>
  <h2>{details ? details.city : dummyData.city} </h2>
             </li>
             <li>
               <span>Timezone</span>
  <h2>UTC: {details ? details.timezone : dummyData.timezone}</h2>
             </li>
             <li>
               <span>Country</span>
               <h2>{details ? details.country : dummyData.country}</h2>
             </li>
           </ul>
         </div>
       </div>

     </header>
     <div className="map">
     <Map center={position} zoom={map.zoom}>
        <TileLayer
          attribution='&amp;copy'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <Marker position={position}></Marker>
      </Map>
     </div>
    </div>
  );
}

export default App;
