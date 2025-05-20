import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Stack } from "@mantine/core";

// Load Leaflet hanya di client
const L = typeof window !== "undefined" ? require("leaflet") : null;
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

// Utility function untuk parsing Google Maps URL
const parseGoogleMapsUrl = (url: any) => {
  if (!url || typeof url !== "string") {
    console.warn("Google Maps URL is undefined or not a valid string");
    return null;
  }

  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+),(\d+)z/;
  const match = url.match(regex);

  if (match) {
    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2]),
      zoom: parseInt(match[3], 10),
    };
  }

  console.warn("Invalid Google Maps URL format");
  return null;
};

const AdditionalInfoMaps: React.FC<{ productName: string; productThumbnail: string; mapsUrl?: string }> = ({
  productName,
  productThumbnail,
  mapsUrl,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Parsing URL untuk mendapatkan koordinat dan zoom
  let latitude = 0;
  let longitude = 0;
  let zoom = 13; // Default zoom

  try {
    const parsed = parseGoogleMapsUrl(mapsUrl);
    if (!parsed) {
      throw new Error("Invalid map URL");
    }

    latitude = parsed.latitude;
    longitude = parsed.longitude;
    zoom = parsed.zoom;
  } catch (error) {
    console.error("Error parsing Google Maps URL:", error);
    return <p>Invalid map URL</p>;
  }

  if (!isClient || !L)
    return (
      <Stack>
        <LoadingGlobal visible={true} />
      </Stack>
    );

  const createCustomIcon = (productThumbnail: string) => {
    const fallbackIcon = "/default-icon.png";
    return L.icon({
      iconUrl: productThumbnail || fallbackIcon,
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      iconSize: [35, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  return (
    // <div style={{ marginTop: "40px" }}>
    <MapContainer center={[latitude, longitude]} zoom={zoom} style={{ height: "500px", width: "98%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <Marker position={[latitude, longitude]} icon={customIcon}> */}
      <Marker position={[latitude, longitude]} icon={createCustomIcon(productThumbnail)}>
        <Popup>{productName}</Popup>
      </Marker>
    </MapContainer>
    // </div>
  );
};

export default AdditionalInfoMaps;
