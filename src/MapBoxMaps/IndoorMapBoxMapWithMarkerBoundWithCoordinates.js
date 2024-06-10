import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import planedImage from "./Plan.jpeg";

mapboxgl.accessToken = 'pk.eyJ1Ijoic3VkaGFyc2hhbjk5MDEiLCJhIjoiY2x3aGxodXp6MGk0dDJrcWYyM2d6ajVrZiJ9.G1Dtx9QojPSIYS6_GP1jMw';

const IndoorMapBoxMapWithMarkerBoundWithCoordinates = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  const initialMarkers = [
    { lat: 12.287306, lng: 76.594867 },
    { lat: 12.287327, lng: 76.594842 },
    { lat: 12.287309, lng: 76.594855 },
    { lat: 12.287289, lng: 76.594881 },
    { lat: 12.287263, lng: 76.594847 },
    { lat: 12.287361, lng: 76.594963 },
    { lat: 12.287233, lng: 76.594972 },
    { lat: 12.287287, lng: 76.594992 },
    { lat: 12.287393, lng: 76.594853 }
  ];

  const boundMarkers = [
    { lat: 12.287408800998834, lng: 76.59482867926235 },
    { lat: 12.287422563389494, lng: 76.59499793313923 },
    { lat: 12.287146072450694, lng: 76.5950200613636 },
    { lat: 12.287135416018835, lng: 76.59484968354475 }
  ];

  const initialCenter = { lat: 12.287410523328886, lng: 76.59483180711094 };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initialCenter.lng, initialCenter.lat],
      zoom: 20
    });

    map.on('load', () => {
      // Add the image overlay
      map.addSource('overlay', {
        type: 'image',
        url: planedImage,
        coordinates: boundMarkers.map(marker => [marker.lng, marker.lat])
      });

      map.addLayer({
        id: 'overlay-layer',
        type: 'raster',
        source: 'overlay',
        paint: {
          'raster-opacity': 0.75
        }
      });

      // Add markers
      initialMarkers.forEach(marker => {
        new mapboxgl.Marker({ color: 'red' })
          .setLngLat([marker.lng, marker.lat])
          .addTo(map);
      });


      // Add custom image markers
    //   initialMarkers.forEach(marker => {
    //     const el = document.createElement('div');
    //     el.className = 'custom-marker';
    //     // el.style.backgroundImage = `url(${customMarkerImage})`;
    //     el.style.width = '12px';
    //     el.style.height = '12px';
    //     el.style.backgroundSize = '100%';
    //     el.style.backgroundColor = 'red';
    //     el.style.borderRadius = '50%';

    //     new mapboxgl.Marker(el)
    //       .setLngLat([marker.lng, marker.lat])
    //       .addTo(map);
    //   });

      setMap(map);
    });

    return () => map.remove();
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: '400px', width: '100%' }} />
      <button onClick={() => console.log('Polygon Vertices:', initialMarkers)}>Save</button>
    </div>
  );
};

export default IndoorMapBoxMapWithMarkerBoundWithCoordinates;
