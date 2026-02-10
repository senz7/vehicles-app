import axios from "axios";
import { Car } from "../types/car";

const API_URL = "https://task.tspb.su/test-task/vehicles";

export const getVehicles = async (): Promise<Car[]> => {
  const response = await axios.get<Car[]>(API_URL);
  return response.data;
};
