'use strict';

class Enum {

  constructor(values) {
    this._values = Object.assign({}, values);
    values.forEach((value) => this[value] = Symbol(value));
  }

  values() {
    return this._values;
  }

}

const TRUCK_TYPES = new Enum([
  '2_AXLE',
  'BOBTAIL',
  '3_AXLE',
  '4_AXLE',
  '5_AXLE',
  '6_PLUS_AXLE',
  'PORT_CHASSIS',
  'PORT_CONTAINER',
]);

module.exports = {TRUCK_TYPES};
