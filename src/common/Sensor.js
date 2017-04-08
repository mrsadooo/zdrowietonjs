import Point from './Point';

export default class Sensor extends Point {
  constructor({ location, id, pollutionLevel }) {
    super(location.latitude, location.longitude);

    this.id = id;
    this.pollution = pollutionLevel;
  }
}