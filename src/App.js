import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  Circle,
  FeatureGroup,
  Rectangle,
} from "react-leaflet";
import "./App.css";

import medical_facilities from "./data/medical_facilities.json";
import fire_stations from "./data/fire_stations.json"
import foot_evacuation from "./data/foot_evacuation.json"

const center = [-33.952292, 18.465736];
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
];

function App() {

  const onEachMedicalFeature = (feature, layer) => {
    layer.bindPopup(`<div><b>Name: ${feature.properties.NAME}</b>\n<h4>Address: ${feature.properties.ADR}</h4></div>`)
  }

  const onEachFireStationFeature = (feature, layer) => {
    layer.bindPopup(`<div><b>Name: ${feature.properties.FIRE_STN_NAME}</b>\n<h4>Class: ${feature.properties.FIRE_STN_CLASS}</h6></div>`)
  }

  const onEachPedestrainEvacuationFeature = (feature, layer) => {
    layer.bindPopup(`<div><b>Evacuation route: ${feature.properties.name}</b></div>`)
  }

  const pedestrianEvacuation = {
    color: "red",
    weight: 4,
    dashArray: 8,
  }

  return (
    <div className="App">
      <header className="App-header">
        <MapContainer center={center} zoom={15} scrollWheelZoom={true}>
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="ESRI Satellite Imagery">
              <TileLayer
                attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
              />
              </LayersControl.BaseLayer>
              <LayersControl.Overlay name="Clouds">
              <TileLayer
                attribution= 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=8fd7c60e26d5f6707969d946091ba22a"
                apiKey='8fd7c60e26d5f6707969d946091ba22a'
              />
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Precipitation">
              <TileLayer
                attribution= 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=8fd7c60e26d5f6707969d946091ba22a"
                apiKey='8fd7c60e26d5f6707969d946091ba22a'
              />
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Sea level pressure">
              <TileLayer
                attribution= 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                url="https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=8fd7c60e26d5f6707969d946091ba22a"
                apiKey='8fd7c60e26d5f6707969d946091ba22a'
              />
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Wind speed">
              <TileLayer
                attribution= 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                url="https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=8fd7c60e26d5f6707969d946091ba22a"
                apiKey='8fd7c60e26d5f6707969d946091ba22a'
              />
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Temperature">
              <TileLayer
                attribution= 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=8fd7c60e26d5f6707969d946091ba22a"
                apiKey='8fd7c60e26d5f6707969d946091ba22a'
              />
              </LayersControl.Overlay>
            <LayersControl.Overlay name="Medical facilities">
              <GeoJSON
                key={1}
                data={medical_facilities.features}
                onEachFeature={onEachMedicalFeature}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Fire stations">
              <GeoJSON
                key={2}
                data={fire_stations.features}
                onEachFeature={onEachFireStationFeature}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Pedestrian evacuation route">
              <GeoJSON
                key={3}
                style={pedestrianEvacuation}
                data={foot_evacuation.features}
                onEachFeature={onEachPedestrainEvacuationFeature}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Layer group with circles">
              <LayerGroup>
                <Circle
                  center={center}
                  pathOptions={{ fillColor: "blue", opacity:0.5 }}
                  radius={1300}
                />
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Feature group">
              <FeatureGroup pathOptions={{ color: "purple" }}>
                <Popup>Popup in FeatureGroup</Popup>
                <Circle center={[51.51, -0.06]} radius={200} />
                <Rectangle bounds={rectangle} />
              </FeatureGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </header>
    </div>
  );
}

export default App;
