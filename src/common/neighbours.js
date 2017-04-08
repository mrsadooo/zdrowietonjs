import Map from './Map';

export default function neighbours(start, end, sensors) {
  const map = new Map(start, end, sensors);

  return function(point) {
    return map.getNeighbours(point.latitude, point.longitude);
  };
}

// function byDistanceFrom(sensor) {
//   return function(a, b) {
//     return Math.abs(distance(a, sensor) - distance(b, sensor));
//   };
// }
//
// function metric(a, b) {
//   return distance(a.lat, a.lon, b.lat, b.lon);
// }