import fetch from 'node-fetch';

const BASE = 'https://airapi.airly.eu/v1/sensors/current';

export default function getSensors(latMin, lonMin, latMax, lonMax, { apiKey }) {
  let southwestLat =  Math.max(latMin, latMax) + 0.015;
  let southwestLong =  Math.max(lonMin, lonMax) + 0.015;
  let northeastLat = Math.min(latMin, latMax) + 0.015;
  let northeastLong = Math.min(lonMin, lonMax) + 0.015;

  const url = `${BASE}?southwestLat=${southwestLat}&southwestLong=${southwestLong}&northeastLat=${northeastLat}&northeastLong=${northeastLong}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey
    }
  }).then(response => response.text())
    .then(text => JSON.parse(text));
}