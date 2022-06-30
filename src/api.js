const BASE_URL = `https://api.openweathermap.org/data/2.5`;

export function fetchTokyo() {
  return fetch(
    `${BASE_URL}/weather?q=tokyo&appid=${process.env.REACT_APP_API_KEY}`
  ).then((response) => response.json());
}
