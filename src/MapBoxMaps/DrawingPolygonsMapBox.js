import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3VkaGFyc2hhbjk5MDEiLCJhIjoiY2x3aGxodXp6MGk0dDJrcWYyM2d6ajVrZiJ9.G1Dtx9QojPSIYS6_GP1jMw';

const DrawingPolygonsMapBox = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polygonPaths, setPolygonPaths] = useState([]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [76.59483197145643, 12.2873590098108],
      zoom: 13
    });

    map.on('load', () => {
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

  const handleSaveClick = () => {
    console.log('Polygon Vertices:', polygonPaths);
    console.log('Markers:', markers.map(marker => marker.getLngLat()));
  };

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
            'fill-color': '#FAFAFA',
            'fill-opacity': 0.4,
            'fill-outline-color': 'black'
          }
        });
      }
    }
  }, [map, polygonPaths]);

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: '400px', width: '100%' }} />
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default DrawingPolygonsMapBox;
