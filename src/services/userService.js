import http from "./httpService";

const apiEndpointUser = "/users";

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
