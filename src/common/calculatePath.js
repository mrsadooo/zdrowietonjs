import distance from './distance';
import AStar from './path/AStar';
import Sensor from './Sensor';
import neighbours from './neighbours';

export default function(start, end, data) {
  const sensors = data.map(toSensor);
  const getNeighbours = neighbours(start, end, sensors);

  const aStar = new AStar({
    metric: distance,
    neighbours: getNeighbours
  });

  return aStar.find(start, end);
}

function toSensor({ location, id, pollutionLevel }) {
  return new Sensor(location.latitude, location.longitude, pollutionLevel, id);
}