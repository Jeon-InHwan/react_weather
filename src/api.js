const BASE_URL = `https://api.openweathermap.org/data/2.5`;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchTokyo() {
  await delay(1000);
  return await fetch(
    `${BASE_URL}/weather?q=tokyo&appid=${process.env.REACT_APP_API_KEY}`
  ).then((response) => response.json());
}

export async function fetchSeoul() {
  await delay(1000);
  return await fetch(
    `${BASE_URL}/weather?q=seoul&appid=${process.env.REACT_APP_API_KEY}`
  ).then((response) => response.json());
}
