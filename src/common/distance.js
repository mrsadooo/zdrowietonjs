// const RAD = 0.017453292519943295;
const
  RAD = Math.PI / 180,
  DIAMETER = 12742,
  { cos, asin, sqrt } = Math;

export default function distance(lat1, lon1, lat2, lon2) {
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const c = ((1 - cos(dLat * RAD)) + (1 - cos(dLon * RAD)) * cos(lat1 * RAD) * cos(lat2 * RAD)) / 2;

  return DIAMETER * asin(sqrt(c));
}