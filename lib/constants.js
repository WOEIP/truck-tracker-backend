'use strict';

class Enum {

  /**
   * @constructs Enum
   */
  constructor(values) {
    this.values = new Set();
    values.forEach((value) => {
      const sym = Symbol(value);
      this[value] = sym;
      this.values.add(sym);
    });
  }

  /**
   * Check if the Enun contains the value
   *
   * @param {Symbol} value
   * @return {Boolean}
   */
  has(value) {
    return this.values.has(value);
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

module.exports = {Enum, TRUCK_TYPES};
