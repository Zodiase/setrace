
(function (global, factory) {
  'use strict';
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(global, true);
  } else {
    factory(global);
  }

}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
  'use strict';

  const NOOP = function NOOP () {
    // NO-OP does nothing.
  };

  const Class_SETRACE = function SETRACE (conditionArray, callback, percentReport) {
    this._name = Date.now();
    // @type {Number} - The max count.
    this._mx = 0;
    // @type {Number} - The count down.
    this._cd = 0;
    // @type {Function} - The callback.
    this._cb = callback;
    // @type {Function} - The percent report.
    this._pr = percentReport;

    this._conditions = {};
    this.set = {};

    for (let cond of conditionArray) {
      if (typeof this._conditions[cond] !== 'undefined') {
        continue;
      }

      this._conditions[cond] = false;
      this.set[cond] = this._onConditionMet.bind(this, cond);
      this._cd++;
    }
    this._mx = this._cd;

    this._checkCountDown();
  };
  Class_SETRACE.prototype._checkCountDown = function () {
    if (this._cd <= 0) {
      this._cb.call();
    }
  };
  Class_SETRACE.prototype._onConditionMet = function (cond) {
    if (this._conditions[cond] === false) {
      this._conditions[cond] = true;
      this._cd--;
      this._pr(1 - this._cd / this._mx);
    }
    this._checkCountDown();
  };

  /**
   * Creates a race object.
   * @param {Array.<String>} conditionArray - The array of conditions.
   * @param {Function} callback - Called when all conditions are met.
   * @param {Function} [percentReport] - Called every time a condition is met.
   * @returns {SETRACE}
   */
  const SETRACE = function (conditionArray, callback, percentReport) {
    if (!Array.isArray(conditionArray)) {
      throw new TypeError('Expect `conditionArray` to be an array.');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('Expect `callback` to be a function.');
    }
    if (typeof percentReport === 'undefined') {
      return SETRACE(conditionArray, callback, NOOP);
    } else if (typeof percentReport !== 'function') {
      throw new TypeError('Expect `percentReport` to be a function.');
    }

    return new Class_SETRACE(conditionArray, callback, percentReport);
  };

  if (!noGlobal) {
    window.SETRACE = SETRACE;
  }

  return SETRACE;
}));
