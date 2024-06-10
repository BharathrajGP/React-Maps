// import React, { useState } from 'react';
// import { StaticMap } from 'react-map-gl';
// import { ScatterplotLayer } from '@deck.gl/layers';
// import { DeckGL } from '@deck.gl/react';

// const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN';

// function DeckGLMapDemo() {
//   const [viewport, setViewport] = useState({
//     longitude: 0,
//     latitude: 0,
//     zoom: 1,
//     bearing: 0,
//     pitch: 0
//   });

//   // Generate random data for 20,000 points
//   const generateRandomData = () => {
//     const data = [];
//     for (let i = 0; i < 20000; i++) {
//       data.push({
//         longitude: (Math.random() * 360) - 180, // Random longitude between -180 and 180
//         latitude: (Math.random() * 180) - 90,   // Random latitude between -90 and 90
//       });
//     }
//     return data;
//   };

//   const layers = [
//     new ScatterplotLayer({
//       id: 'scatterplot-layer',
//       data: generateRandomData(),
//       getPosition: d => [d.longitude, d.latitude],
//       getColor: [255, 0, 0],
//       getRadius: 10000, // Adjust the radius of the markers as needed
//     })
//   ];

//   return (
//     <DeckGL
//       initialViewState={viewport}
//       controller={true}
//       layers={layers}
//     >
//       <StaticMap
//         reuseMaps
//         mapStyle="mapbox://styles/mapbox/light-v9"
//         mapboxApiAccessToken={MAPBOX_TOKEN}
//       />
//     </DeckGL>
//   );
// }

// export default DeckGLMapDemo;



