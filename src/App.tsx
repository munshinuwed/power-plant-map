import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import { CONFIG } from "./config/appConfig";
import { fetchPlantData, fetchStates } from "./api/plantService";
import { logger } from "./utils/logger";
import type { Plant } from "./types/Plant";
import StateFilter from "./components/StateFilter";
import MapView from './components/MapView';
import "./styles.css";

// Fix marker icons globally
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

// const AutoZoom: React.FC<{ plants: Plant[] }> = ({ plants }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!plants.length) return;
//     const bounds = L.latLngBounds(plants.map(p => [p.lat, p.lon] as [number, number]));
//     map.fitBounds(bounds, { padding: [50, 50] });
//   }, [plants, map]);

//   return null;
// };

const App: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [plantCount, setPlantCount] = useState<number>(CONFIG.DEFAULT_PLANT_LIMIT);

  const visiblePlants = selectedState
  ? plants.filter(p => p.state === selectedState)
  : plants;

  const loadPlants = async () => {
    try {
      const data = await fetchPlantData(selectedState, plantCount);
      setPlants(data);
    } catch (err) {
      logger.error("Failed to load plant data.");
    }
  };

  const loadStates = async () => {
    try {
      const s = await fetchStates();
      setStates(s.sort());
    } catch (err) {
      logger.error("Failed to load states.");
    }
  };

  useEffect(() => {
    loadStates();
  }, []);

  useEffect(() => {
    loadPlants();
  }, [selectedState, plantCount]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>⚡ US Power Plants</h2>

      <div className="top-controls">
        <StateFilter selected={selectedState} onChange={setSelectedState} stateList={states} />

        <label>
          Show Top:{" "}
          <select value={plantCount} onChange={(e) => setPlantCount(Number(e.target.value))}>
            {CONFIG.ALLOWED_PLANT_LIMITS.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>
      <MapView plants={visiblePlants} selectedState={selectedState} />
    </div>
  );
};

export default App;
