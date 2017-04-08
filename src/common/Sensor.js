import Point from './Point';

export default class Sensor extends Point {
  constructor(latitude, longitude, pollution, id) {
    super(latitude, longitude);

    this.id = id;
    this.pollution = pollution;
  }
}