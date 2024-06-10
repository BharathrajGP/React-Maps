import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import Pako from 'pako';
import CampaignIds200 from './CampaignIds';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hlZXRhbHJoaWJodXMiLCJhIjoiY2x2dzhzNXZ3MjJsZDJxbXh1d2UxYm83byJ9.H9F83vdo0jzicpALrVJM1Q';

const MapBoxGLDemoOnScroll = () => {
  const mapContainer = useRef(null);
  const [markerData, setMarkerData] = useState([]);
  const [map, setMap] = useState(null);
  const [popup, setPopup] = useState(null);
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState([0, 0]);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/getMapData', {
          filterKey: 'lteRSRP',
          CampaignIds: CampaignIds200
        });
        if (response && response.data) {
          const decodedData = atob(response.data);
          const uint8Array = new Uint8Array(decodedData.length);
          for (let i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
          }
          const decompressedData = Pako.inflate(uint8Array, { to: 'string' });
          const mapValues = JSON.parse(decompressedData);
          setMarkerData(mapValues.flat(1));
        }
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };

    fetchMapData();
  }, []);

  useEffect(() => {
    if (!markerData.length || !mapContainer.current) return;

    const initialCenter = [markerData[0]?.position.lng, markerData[0]?.position.lat];

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initialCenter,
      zoom: zoom,
    });

    mapInstance.on('load', () => {
      mapInstance.addSource('random-points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: generateRandomPoints(markerData),
        },
      });

      mapInstance.addLayer({
        id: 'random-points',
        type: 'circle',
        source: 'random-points',
        paint: {
          'circle-color': ['get', 'color'],
          'circle-radius': 10,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      });

      mapInstance.on('moveend', () => {
        const newCenter = mapInstance.getCenter();
        const newZoom = mapInstance.getZoom();
        setCenter([newCenter.lng, newCenter.lat]);
        setZoom(newZoom);
      });

      mapInstance.on('click', 'random-points', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const rsrpoRRSRQ = e.features[0]?.properties?.rsrpoRRSRQ;

        if (popup) {
          popup.remove();
          setPopup(null);
        } else {
          const newPopup = new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<p>${rsrpoRRSRQ}</p>`)
            .addTo(mapInstance);
          setPopup(newPopup);
        }
      });
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, [markerData]);

  useEffect(() => {
    if (!map) return;

    map.on('moveend', async () => {
      const bounds = map.getBounds();
      const response = await axios.post('http://localhost:3001/query', {
        filterKey: 'lteRSRP',
        CampaignIds: CampaignIds200,
        coordinates: bounds.toArray()
      });
      setMarkerData(response.data.Items);
    });
  }, [map]);

  const generateRandomPoints = (data) => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [item.position?.lng, item.position?.lat],
      },
      properties: {
        id: item.id,
        color: item.position?.color, // Color property
        rsrpoRRSRQ: item.position?.rsrpoRRSRQ // Tooltip value
      },
    }));
  };

  return <div ref={mapContainer} style={{ width: '100%', height: '600px' }} />;
};

export default MapBoxGLDemoOnScroll;