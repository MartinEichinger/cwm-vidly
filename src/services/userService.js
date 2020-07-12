import { apiEndpointUser } from "./config.json";
import http from "./httpService";

function userUrl(id) {
  return `${apiEndpointUser}/${id}`;
}

export function register(user) {
  return http.post(apiEndpointUser, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
