import React from "react";
import {
  TileLayer,
  GeoJSON,
  LayersControl,
  LayerGroup,
  Circle,
  MapContainer,
} from "react-leaflet";
import "./App.css";

import medical_facilities from "./data/medical_facilities.json";
import fire_stations from "./data/fire_stations.json";
import foot_evacuation from "./data/foot_evacuation.json";
import car_evacuation from "./data/car_evacuation.json";
import fire_hydrants from "./data/fire_hydrants.json";

const center = [-33.952292, 18.465736];

const App = () => {
  const pedestrianEvacuation = {
    color: "red",
    weight: 4,
    dashArray: 8,
  };

  const carEvacuation = {
    color: "yellow",
    weight: 4,
    dashArray: 8,
  };

  const onEachMedicalFeature = (feature, layer) => {
    layer.bindPopup(
      `<div><b>Facility name: ${feature.properties.NAME}</b>\n<h4>Address: ${feature.properties.ADR}</h4></div>`
    );
  };

  const onEachFireStationFeature = (feature, layer) => {
    layer.bindPopup(
      `<div><b>Station name: ${feature.properties.FIRE_STN_NAME}</b>\n<h4>Class: ${feature.properties.FIRE_STN_CLASS}</h6></div>`
    );
  };

  const onEachFireHydrantFeature = (feature, layer) => {
    layer.bindPopup(
      `<div><b>Hydrant name: ${feature.properties.NAME}</b></div>`
    );
  };

  const onEachPedestrainEvacuationFeature = (feature, layer) => {
    layer.bindPopup(
      `<div><b>Evacuation route: ${feature.properties.name}</b></div>`
    );
  };

  const onEachCarEvacuationFeature = (feature, layer) => {
    layer.bindPopup(
      `<div><b>Vehicle evacuation route: ${feature.properties.NAME}</b></div>`
    );
  };

  const baseLayerChange = (event) => {
    console.log("baseLayerChange event", event);
  };

  const whenReadyHandler = (event) => {
    const { target } = event;
    target.on("overlaylayerchange", baseLayerChange);
  };

  return (
    <div className="App">
      <header className="App-header">
          <h1>My map</h1>
        <MapContainer
          center={center}
          zoom={15}
          scrollWheelZoon={true}
          whenReady={whenReadyHandler}
        >
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
                attribution='Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=8fd7c60e26d5f6707969d946091ba22a"
                apiKey="8fd7c60e26d5f6707969d946091ba22a"
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Precipitation">
              <TileLayer
                attribution='Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=8fd7c60e26d5f6707969d946091ba22a"
                apiKey="8fd7c60e26d5f6707969d946091ba22a"
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Sea level pressure">
              <TileLayer
                attribution='Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                url="https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=8fd7c60e26d5f6707969d946091ba22a"
                apiKey="8fd7c60e26d5f6707969d946091ba22a"
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Wind speed">
              <TileLayer
                attribution='Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                url="https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=8fd7c60e26d5f6707969d946091ba22a"
                apiKey="8fd7c60e26d5f6707969d946091ba22a"
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Temperature">
              <TileLayer
                attribution='Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=8fd7c60e26d5f6707969d946091ba22a"
                apiKey="8fd7c60e26d5f6707969d946091ba22a"
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
            <LayersControl.Overlay name="Fire hydrants">
              <GeoJSON
                key={2}
                data={fire_hydrants.features}
                onEachFeature={onEachFireHydrantFeature}
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
            <LayersControl.Overlay name="Car evacuation routes">
              <GeoJSON
                key={4}
                style={carEvacuation}
                data={car_evacuation.features}
                onEachFeature={onEachCarEvacuationFeature}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Disaster Area">
              <LayerGroup>
                <Circle
                  center={center}
                  pathOptions={{ fillColor: "blue", opacity: 0.5 }}
                  radius={1300}
                />
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </header>
    </div>
  );
};

export default App;
