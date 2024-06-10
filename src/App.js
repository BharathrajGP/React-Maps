import logo from './logo.svg';
import './App.css';
import DeckGLMapDemo from './DeckGLMapDemo';
import LeafLetDemos from './LeafLetDemos';
import MapBoxGLDemos from './MapBoxGLDemos';
import PlotlyHeatmap from './PlotlyHeatMap';
import MapBoxGLDemoOnScroll from './MapBoxGLDemoOnScroll';
import MapBoxGLDemoButton from './MapBoxGLDemoButton';
import MapBoxTiles from './MapBoxTiles';
import LeafLetHeatMapDemos from './LeafLetHeatMapDemos';
import MapBoxGLDemoButtonSkeleton from './MapBoxGLDemoButtonSkeleton';
import GoogleMapButtonDemo from './GoogleMapButtonDemo';
import Demomap from './DemoMap';
import ReactGoogleDemo from './TechTuesdayMaps/ReactGoogleDemo';
import MapBoxDemo from './TechTuesdayMaps/MapBoxDemo';
import ReactLeafletDemo from './TechTuesdayMaps/ReactLeafletDemo';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapDashboard from './TechTuesdayMaps/MapDashboard';
import DrawingPolygons from './GoogleMaps/DrawingPolygons';
import DrawingPolygonsWithDimensions from './GoogleMaps/DrawingPolygonsWithDimensions';
import IndoorMapWithMarker from './GoogleMaps/IndoorMapWithMarker ';
import DrawingPolygonWithFillPattern from './GoogleMaps/DrawingPolygonWithFillPattern';
import IndoorMapWithMarkerBoundWithCoordinates from './GoogleMaps/IndoorMapWithMarkerBoundWithCoordinates';
import DrawingPolygonsMapBox from './MapBoxMaps/DrawingPolygonsMapBox';
import DrawingPolygonsMapBoxWithFillPattern from './MapBoxMaps/DrawingPolygonsMapBoxWithFillPattern';
import IndoorMapBoxMapWithMarkerBoundWithCoordinates from './MapBoxMaps/IndoorMapBoxMapWithMarkerBoundWithCoordinates';
import IndoorLeafLetMapWithMarkerBoundWithCoordinates from './LeafLetMaps/IndoorLeafLetMapWithMarkerBoundWithCoordinates';
import MapsWithSearchBar from './GoogleMaps/MapsWithSearchBar';

function App() {
  return (
    <div className="App">
      {/* <DeckGLMapDemo /> */}
      {/* <LeafLetDemos /> */}
      {/* <MapBoxGLDemos /> */}
      {/* <MapBoxGLDemoOnScroll /> */}
      {/* <PlotlyHeatmap /> */}
      {/* <MapBoxGLDemoButton/> */}
      {/* <MapBoxGLDemoButtonSkeleton /> */}
      {/* <GoogleMapButtonDemo /> */}
      {/* <MapBoxTiles /> */}
      {/* <LeafLetHeatMapDemos /> */}
      {/* <Demomap /> */}




      {/* <Router>
        <Routes>
          <Route path="/" element={<MapDashboard />} />
          <Route path="/ReactLeafletDemo" element={<ReactLeafletDemo />} />
          <Route path="/ReactGoogleDemo" element={<ReactGoogleDemo />} />
          <Route path="/MapBoxDemo" element={<MapBoxDemo />} />
          <Route path="/MapBoxTiles" element={<MapBoxTiles />} />
        </Routes>
      </Router> */}


      {/* <DrawingPolygons /> */}
      {/* <DrawingPolygonsWithDimensions /> */}
      {/* <IndoorMapWithMarker /> */}
      {/* <IndoorMapWithMarkerBoundWithCoordinates /> */}
      <MapsWithSearchBar />
      {/* <DrawingPolygonWithFillPattern /> */}


      {/* <IndoorLeafLetMapWithMarkerBoundWithCoordinates /> */}


      {/* <DrawingPolygonsMapBox /> */}
      {/* <DrawingPolygonsMapBoxWithFillPattern /> */}
      {/* <IndoorMapBoxMapWithMarkerBoundWithCoordinates /> */}
    </div>
  );
}

export default App;
