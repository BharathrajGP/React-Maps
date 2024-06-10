// import React, { useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
// import { Link } from "react-router-dom";

// mapboxgl.accessToken = 'pk.eyJ1Ijoic2hlZXRhbHJoaWJodXMiLCJhIjoiY2x2dzhzNXZ3MjJsZDJxbXh1d2UxYm83byJ9.H9F83vdo0jzicpALrVJM1Q';

// const center = [78.9629, 20.5937];
// const zoom = 5;

// const locations = [
//   { coordinates: [77.209, 28.6139], name: 'Delhi' },
//   { coordinates: [77.5946, 12.9716], name: 'Bangalore' },
//   { coordinates: [73.8567, 18.5204], name: 'Mumbai' },
//   { coordinates: [88.3639, 22.5726], name: 'Kolkata' },
//   { coordinates: [80.2707, 13.0827], name: 'Chennai' },
// ];

// const MapBoxDemo = () => {
//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: center,
//       zoom: zoom
//     });

//     locations.forEach(location => {
//       const el = document.createElement('div');
//       el.className = 'marker';
//       el.style.background = 'red';
//       el.style.width = '10px';
//       el.style.height = '10px';
//       el.style.borderRadius = '50%';

//       new mapboxgl.Marker(el)
//         .setLngLat(location.coordinates)
//         .setPopup(new mapboxgl.Popup({ offset: 25 })
//           .setHTML('<h3>' + location.name + '</h3>'))
//         .addTo(map);
//     });

//     // Clean up
//     return () => map.remove();
//   }, []);

//   return (
//     <div>
//       <div id="map" style={{ width: '100%', height: '400px' }} />
//       <div style={{display:"flex",justifyContent:"space-around"}}>
//         <Link to={"/ReactLeafletDemo"}>Navigate To ReactLeafletDemo</Link>
//         <Link to={"/ReactGoogleDemo"}>Navigate to ReactGoogleDemo</Link>
//       </div>
//     </div>
//   );
// };

// export default MapBoxDemo;


import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Link } from "react-router-dom";

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hlZXRhbHJoaWJodXMiLCJhIjoiY2x2dzhzNXZ3MjJsZDJxbXh1d2UxYm83byJ9.H9F83vdo0jzicpALrVJM1Q';

const MapBoxDemo = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [77.209, 28.6139],
      zoom: 4
    });

    const locations = [
      { coordinates: [77.209, 28.6139], name: 'Delhi' },
      { coordinates: [77.5946, 12.9716], name: 'Bangalore' },
      { coordinates: [73.8567, 18.5204], name: 'Mumbai' },
      { coordinates: [88.3639, 22.5726], name: 'Kolkata' },
      { coordinates: [80.2707, 13.0827], name: 'Chennai' },
    ];

    locations.forEach(location => {
      new mapboxgl.Marker()
        .setLngLat(location.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>`))
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  return (<div>
    <div id="map" style={{ width: '100%', height: '400px' }} />
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Link to={"/ReactLeafletDemo"}>Navigate To ReactLeafletDemo</Link>
      <Link to={"/ReactGoogleDemo"}>Navigate to ReactGoogleDemo</Link>
    </div>
  </div>);
};

export default MapBoxDemo;
