import { GoogleMap, Marker } from  '@react-google-maps/api';

function Demomap() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
    >
      <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
    </GoogleMap>
  );
}

export default Demomap
