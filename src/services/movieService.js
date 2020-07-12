import { apiEndpointMovie } from "./config.json";
import { getGenres } from "./genreService";
import http from "./httpService";

function movieUrl(id) {
  return `${apiEndpointMovie}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpointMovie);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export async function saveMovie(data) {
  if (data._id) {
    const body = { ...data };
    delete body._id;
    return http.put(movieUrl(data._id), body);
  } else {
    return http.post(apiEndpointMovie, data);
  }
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
