import http from "./httpService";

const apiEndpointGenre = "/genres";

export function getGenres() {
  return http.get(apiEndpointGenre);
}
