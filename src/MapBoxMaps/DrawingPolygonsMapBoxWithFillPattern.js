import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3VkaGFyc2hhbjk5MDEiLCJhIjoiY2x3aGxodXp6MGk0dDJrcWYyM2d6ajVrZiJ9.G1Dtx9QojPSIYS6_GP1jMw';

const DrawingPolygonsMapBoxWithFillPattern = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polygonPaths, setPolygonPaths] = useState([]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.1318096, 40.9403762],
      zoom: 13
    });

    map.on('load', () => {
      // Add the custom SVG pattern to the map
      const svg = `<svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="8" y2="8" stroke="black" stroke-width="1"/><line x1="0" y1="8" x2="8" y2="0" stroke="black" stroke-width="1"/></svg>`;
      const url = `data:image/svg+xml;base64,${btoa(svg)}`;
      const image = new Image(8, 8);
      image.src = url;
      image.onload = () => {
        map.addImage('pattern', image, { sdf: true });
      };

      setMap(map);
    });

    map.on('click', (event) => {
      const { lng, lat } = event.lngLat;
      const newMarker = new mapboxgl.Marker({ color: 'black' })
        .setLngLat([lng, lat])
        .addTo(map);

      setMarkers((currentMarkers) => [...currentMarkers, newMarker]);
      setPolygonPaths((currentPaths) => [...currentPaths, [lng, lat]]);
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (map && polygonPaths.length > 1) {
      if (map.getSource('polygon')) {
        map.getSource('polygon').setData({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [polygonPaths]
          }
        });
      } else {
        map.addSource('polygon', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [polygonPaths]
            }
          }
        });
        map.addLayer({
          id: 'polygon-layer',
          type: 'fill',
          source: 'polygon',
          paint: {
            'fill-pattern': 'pattern',
            'fill-opacity': 0.4,
            'fill-outline-color': 'black'
          }
        });
      }
    }
  }, [map, polygonPaths]);

  const handleSaveClick = () => {
    console.log('Polygon Vertices:', polygonPaths);
    console.log('Markers:', markers.map(marker => marker.getLngLat()));
  };
  const handleErase = () => {
    setPolygonPaths([]);
    markers.forEach(marker => marker.remove());
    setMarkers([]);
    if (map.getSource('polygon')) {
      map.getSource('polygon').setData({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[]]
        }
      });
    }
  };

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: '400px', width: '100%' }} />
      <button onClick={handleSaveClick}>Save</button>
      <button onClick={handleErase}>Cancel</button>
    </div>
  );
};

export default DrawingPolygonsMapBoxWithFillPattern;
