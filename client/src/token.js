const KEY = 'auth-token';

// TODO: Have a look at this https://auth0.com/docs/libraries/auth0-spa-js

export function getToken() {
  return localStorage.getItem(KEY);
}

export function setToken(token) {
  return localStorage.setItem(KEY, token);
}

export function deleteToken() {
  return localStorage.removeItem(KEY);
}
