/* Uses the open-notify API to track the SSI location */
/* The API seems unstable at times and may take a few 
rounds before it starts populating data. */

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);

  useEffect(() => {
    const apiGet = () => {
      fetch("http://api.open-notify.org/iss-now.json")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          console.log(data);
          setLat(data.iss_position.latitude);
          setLong(data.iss_position.longitude);
          setTimeStamp(data.timestamp);
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });
    };
 
    const timer = setInterval(() => {
      apiGet();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [])
 
  return (
    <div style={{'textAlign': 'center'}}>
      <p>The Space Station is current at:</p>
        <p>Latitude: {lat}</p>
        <p>Longitude: {long}</p>
        <p>Current Timestamp: {timeStamp}</p>
    </div>
  );
}

export default App;
