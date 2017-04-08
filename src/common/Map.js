import VirtualSensor from './VirtualSensor';
import calculatePollution from './calculatePollution';
import Point from './Point';

const DIRECTIONS = [
  [-1,-1], [-1, 0], [-1, 1],
  [ 0,-1],          [ 0, 1],
  [ 1,-1], [ 1, 0], [ 1, 1]
];

export default class Map {
  constructor(start, end, sensors) {
    const points = [start, end, ...sensors];

    this.sensors = sensors;
    this.latitudes = points.map(toLatitude);
    this.longitudes = points.map(toLongitude);

    this.latitudes.sort(asc);
    this.longitudes.sort(asc);
    this.map = createMap(this.latitudes, this.longitudes, points, sensors);
  }

  getNeighbours(lat, lon) {
    const
      x = this.latitudes.indexOf(lat),
      y = this.longitudes.indexOf(lon);

    return DIRECTIONS
      .map(toPosition(x, y))
      .map(toMapPoint(this.map))
      .filter(isNotNull);
  }
}

function isNotNull(item) {
  return item !== null;
}

function toPosition(x, y) {
  return function(v) {
    return [x + v[0], y + v[1]];
  };
}

function toMapPoint(map) {
  return function(v) {
    const
      x = v[0],
      y = v[1];

    return map[x] && map[x][y] || null;
  };
}

function asc(a, b) {
  return a - b;
}

function toLatitude(point) {
  return point.latitude;
}

function toLongitude(point) {
  return point.longitude;
}

function createMap(latitudes, longitudes, points, sensors) {
  return latitudes.map(createLangitudeMapper(longitudes, points, sensors));
}

function createLangitudeMapper(longitudes, points, sensors) {
  return function(lan) {
    return longitudes.map(createLongitudeMapper(lan, points, sensors));
  };
}

function createLongitudeMapper(lat, points, sensors) {
  return function(lon) {
    return getPointByPosition(lat, lon, points, sensors);
  };
}

function getPointByPosition(lat, lon, points, sensors) {
  for (let i = 0; i < sensors.length; i++) {
    const sensor = sensors[i];

    if (sensor.latitude === lat && sensor.longitude === lon) {
      return sensor;
    }
  }

  return new VirtualSensor(
    lat,
    lon,
    calculatePollution(new Point(lat, lon), sensors),
    null
  );
}