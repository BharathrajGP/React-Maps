import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import Pako from 'pako';
import CampaignIds200 from './CampaignIds';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css'

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hlZXRhbHJoaWJodXMiLCJhIjoiY2x2dzhzNXZ3MjJsZDJxbXh1d2UxYm83byJ9.H9F83vdo0jzicpALrVJM1Q';

const MapBoxGLDemoButtonSkeleton = () => {
  const mapContainer = useRef(null);
  const [markerData, setMarkerData] = useState([]);
  const [map, setMap] = useState(null);
  const [popup, setPopup] = useState(null);
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState([0, 0]);
  const [disableZoomOut, setDisableZoomOut] = useState(false);
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching map data:', error);
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  const handleZoomIn = () => {
    if (!map) return;
    const currentZoom = map.getZoom();
    map.setZoom(currentZoom + 1);
    setDisableZoomOut(false);
  };

  const handleZoomOut = () => {
    if (!map) return;
    const currentZoom = map.getZoom();
    map.setZoom(currentZoom - 1);
    setDisableZoomOut(currentZoom - 1 <= 2);
  };

  useEffect(() => {
    if (!markerData.length || !mapContainer.current) return;

    const initialCenter = [markerData[Math.round((markerData.length-1)/2)]?.position.lng, markerData[Math.round((markerData.length-1)/2)]?.position.lat];

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initialCenter,
      zoom: zoom,
      scrollZoom: false,
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
        setDisableZoomOut(newZoom <= 2);
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
      setLoading(true)
      const response = await axios.post('http://localhost:3001/query', {
        filterKey: 'lteRSRP',
        CampaignIds: CampaignIds200,
        coordinates: bounds.toArray()
      });
      setLoading(false)
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
        color: item.position?.color,
        rsrpoRRSRQ: item.position?.rsrpoRRSRQ
      },
    }));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }}>
        {loading ? (
          <Skeleton height={600} />
        ) : null}
      </div>
      <div style={{ position: 'absolute',display:"flex",flexDirection:"column", top: '10px', left: '10px', zIndex: 1 }}>
        <button onClick={handleZoomIn} disabled={loading}style={{width:"30px",height:"30px",cursor:"pointer"}}>+</button>
        <button onClick={handleZoomOut} disabled={disableZoomOut || loading} style={{width:"30px",height:"30px",cursor:"pointer"}}>-</button>
      </div>
    </div>
  );
};

export default MapBoxGLDemoButtonSkeleton;
