import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-satellite",
      zoom: 5,
    });
  
    // Fit map to Philippines' bounding box
    map.fitBounds([
      [114.0, 5.0], // Southwest corner
      [130.0, 21.0] // Northeast corner
    ]);
  
    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default MapComponent;
