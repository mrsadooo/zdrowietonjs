import fetch from 'node-fetch';

const BASE = 'https://airapi.airly.eu/v1/sensors/current';

export default function getSensors(latMin, lonMin, latMax, lonMax, { apiKey }) {
  let southwestLat =  Math.max(latMin, latMax);
  let southwestLong =  Math.max(lonMin, lonMax);
  let northeastLat = Math.min(latMin, latMax);
  let northeastLong = Math.min(lonMin, lonMax);

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