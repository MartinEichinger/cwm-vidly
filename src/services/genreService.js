import { apiEndpointGenre } from "./config.json";
import http from "./httpService";

export function getGenres() {
  return http.get(apiEndpointGenre);
}
