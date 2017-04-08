export default class Point {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  toString() {
    return `${this.latitude};${this.longitude}`;
  }
}