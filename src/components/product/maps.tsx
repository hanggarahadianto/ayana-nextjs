import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Stack } from "@mantine/core";

// Fix the marker icon issue
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // size of the shadow
});

// Utility function to parse Google Maps URL
const parseGoogleMapsUrl = (url: string) => {
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+),(\d+)z/;
  const match = url.match(regex);

  if (match) {
    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);
    const zoom = parseInt(match[3], 10);
    return { latitude, longitude, zoom };
  }

  throw new Error("Invalid Google Maps URL");
};

// Component
const ReactLeafletMap: React.FC<{ mapsUrl: string }> = ({ mapsUrl }) => {
  try {
    const { latitude, longitude, zoom } = parseGoogleMapsUrl(mapsUrl);

    return (
      <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        style={{ height: "500px", width: "98%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>Location from Google Maps URL</Popup>
        </Marker>
      </MapContainer>
    );
  } catch (error) {
    return <p>Error</p>;
  }
};

// Example usage
const AdditionalInfoMaps: React.FC<{ maps?: string }> = ({ maps }) => {
  if (!maps) {
    return <p>No map data available.</p>;
  }

  const googleMapsUrl = maps;

  return (
    <>
      {/* <Stack align="center" justify="center" mr={34}> */}
      <ReactLeafletMap mapsUrl={googleMapsUrl} />
      {/* </Stack> */}
    </>
  );
};

export default AdditionalInfoMaps;
