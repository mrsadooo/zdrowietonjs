import fetch from 'node-fetch';

const BASE = 'https://airapi.airly.eu/v1/sensors/current';
import KrakowSensors from './mocks/krakow.json'

export default function getSensors(latMin, lonMin, latMax, lonMax, {apiKey}, debug = false) {

    const precision = 1;
    const marginPath = 0.25;

    let southwestLat = Math.min(latMin, latMax);
    let southwestLong = Math.min(lonMin, lonMax);
    let northeastLat = Math.max(latMin, latMax);
    let northeastLong = Math.max(lonMin, lonMax);

    if (+southwestLat.toFixed(precision) === +northeastLat.toFixed(precision)) {
        southwestLong -= marginPath;
        northeastLong += marginPath;
    }
    else if (+southwestLong.toFixed(precision) === +northeastLong.toFixed(precision)) {
        southwestLat -= marginPath;
        northeastLat += marginPath;
    }

    const url = `${BASE}?southwestLat=${southwestLat}&southwestLong=${southwestLong}&northeastLat=${northeastLat}&northeastLong=${northeastLong}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey
        }
    }).then(response => response.text())
        .then(text => {
            return debug ? KrakowSensors : JSON.parse(text)
        });
}