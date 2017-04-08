import distance from './distance';

export default function calculatePollution(point, sensors) {
  const distances = sensors.map(toDistance(point));

  const top = distances.reduce(topReducer(sensors), 0);
  const bottom = distances.reduce(bottomReducer, 0);

  return top / bottom;
}

function toDistance(point) {
  return function(sensor) {
    return distance(point.latitude, point.longitude, sensor.latitude, sensor.longitude);
  };
}

function topReducer(sensors) {
  return function(sum, distance, index) {
    return sum + sensors[index].pollution / distance;
  };
}

function bottomReducer(sum, distance) {
  return sum + 1 / distance;
}
