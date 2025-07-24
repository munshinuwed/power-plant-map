import axios from "axios";
import { CONFIG } from "../config/appConfig";
import type { Plant } from "../types/Plant";
import { logger } from "../utils/logger";

export async function fetchPlantData(state: string, n: number): Promise<Plant[]> {
  try {
    const res = await axios.get<Plant[]>(`${CONFIG.API_BASE_URL}/${CONFIG.PLANTS_API_ENDPOINT}`, {
      params: { n },
        headers: {
            'x-api-key': CONFIG.X_API_KEY,
        }
    });
    logger.info(`Fetched ${res.data.length} plants for state=${state || "ALL"}, n=${n}`);
    return res.data;
  } catch (error: any) {
    logger.error("Plant data fetch failed:", error.message || error);
    throw new Error("Failed to fetch plant data.");
  }
}

export async function fetchStates(): Promise<string[]> {
  try {
    const res = await axios.get<string[]>(`${CONFIG.API_BASE_URL}/${CONFIG.STATES_API_ENDPOINT}`, {
        headers: {
          'x-api-key': CONFIG.X_API_KEY,
        }});
    logger.info("Fetched state list:", res.data);
    return res.data;
  } catch (error: any) {
    logger.error("Fetching state list failed:", error.message || error);
    throw new Error("Failed to fetch states.");
  }
}
