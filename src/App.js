import React, { useState } from "react";
import {
  TileLayer,
  GeoJSON,
  LayersControl,
  LayerGroup,
  Circle,
  MapContainer,
  FeatureGroup,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "./App.css";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Link from "@material-ui/core/Link";

import hydrant from "./images/hydrant.png";
import healthcare from "./images/healthcare.png";
import firestation from "./images/firestation.png";
import police from "./images/police.png";

import medical_facilities from "./data/medical_facilities.json";
import fire_stations from "./data/fire_stations.json";
import foot_evacuation from "./data/foot_evacuation.json";
import car_evacuation from "./data/car_evacuation.json";
import fire_hydrants from "./data/fire_hydrants.json";
import security from "./data/security.json";

const center = [-33.952292, 18.465736];

const App = () => {
  const [open, setOpen] = useState(false);

  const pedestrianEvacuation = {
    color: "#66ff00",
    weight: 3,
    dashArray: 8,
  };

  const carEvacuation = {
    color: "yellow",
    weight: 3,
    dashArray: 8,
  };

  let medicalIcon = L.icon({
    iconUrl: healthcare,
    iconSize: [25, 25],
    iconAnnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  let policeIcon = L.icon({
    iconUrl: police,
    iconSize: [25, 25],
    iconAnnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  let fireStationIcon = L.icon({
    iconUrl: firestation,
    iconSize: [25, 25],
    iconAnnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  let fireHydrantIcon = L.icon({
    iconUrl: hydrant,
    iconSize: [25, 25],
    iconAnnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <div
        style={{
          backgroundColor: "#282c34",
          display: "flex",
          flex: 1,
          justifyContent: "center",
          maxHeight: "10vh",
        }}
      >
        <h1 style={{ textAlign: "center", color: "white" }}>
          UCT Disaster management map
        </h1>
        <IconButton
          onClick={() => {
            handleClickOpen();
          }}
        >
          <InfoIcon style={{ color: "white" }} />
        </IconButton>
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <DialogTitle id="simple-dialog-title">
            This web map was created for APG4009 to assist with disaster
            management at the University of Cape Town by listing points of aid
            and evacuation routes. <br />
            <br />
            Real time weather data is provided but is best viewed zoomed out to
            a national level and using the black and white base map.
            <br />
            <br />
            <Link href="https://danjamesh.github.io/me/">
              Created by: Daniel O'Sullivan-Hewlett
            </Link>
          </DialogTitle>
        </Dialog>
      </div>
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
          <LayersControl.BaseLayer checked name="Open Street Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="ESRI Topographical map">
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Black and white">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Medical facilities">
            <FeatureGroup>
              {medical_facilities.features.map((facility) => (
                <Marker
                  key={facility.properties.OBJECTID}
                  position={[
                    facility.geometry.coordinates[1],
                    facility.geometry.coordinates[0],
                  ]}
                  icon={medicalIcon}
                >
                  <Popup>
                    <b>Facility: {facility.properties.NAME}</b>
                    <br />
                    <br />
                    <b>Address: {facility.properties.ADR}</b>
                  </Popup>
                </Marker>
              ))}
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Fire stations">
            <FeatureGroup>
              {fire_stations.features.map((facility) => (
                <Marker
                  key={facility.properties.OBJECTID}
                  position={[
                    facility.geometry.coordinates[1],
                    facility.geometry.coordinates[0],
                  ]}
                  icon={fireStationIcon}
                >
                  <Popup>
                    <b>Facility: {facility.properties.FIRE_STN_NAME}</b>
                    <br />
                    <br />
                    <b>Class: {facility.properties.FIRE_STN_CLASS}</b>
                  </Popup>
                </Marker>
              ))}
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Fire hydrants">
            <FeatureGroup>
              {fire_hydrants.features.map((hydrant) => (
                <Marker
                  key={hydrant.properties.NAME}
                  position={[
                    hydrant.geometry.coordinates[1],
                    hydrant.geometry.coordinates[0],
                  ]}
                  icon={fireHydrantIcon}
                >
                  <Popup>
                    <b>
                      Hydrant: {hydrant.properties.NAME} {"\n\n"}
                    </b>
                  </Popup>
                </Marker>
              ))}
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Security">
            <FeatureGroup>
              {security.features.map((security) => (
                <Marker
                  key={security.properties.NAME}
                  position={[
                    security.geometry.coordinates[1],
                    security.geometry.coordinates[0],
                  ]}
                  icon={policeIcon}
                >
                  <Popup>
                    <b>Name: {security.properties.NAME}</b>
                  </Popup>
                </Marker>
              ))}
            </FeatureGroup>
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
                pathOptions={{ color: "blue", fillOpacity: 0.1, opacity: 1 }}
                radius={1375}
              />
            </LayerGroup>
          </LayersControl.Overlay>
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
        </LayersControl>
      </MapContainer>
      {/* </header> */}
    </div>
  );
};

export default App;
