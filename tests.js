'use strict';

const SETRACE = require('setrace');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

describe('SETRACE', () => {

  it('should be a function', () => {
    expect(SETRACE).to.be.a('function');
  });

  it('should throw an error when not enough parameters are given.', () => {
    // Missing conditionArray and callback.
    expect(SETRACE.bind(null)).to.throw(Error);
    // Missing callback.
    expect(SETRACE.bind(null, [])).to.throw(Error);
  });

  it('should throw an error when the wrong types of parameters are given.', () => {
    [
      -1, 0, 1,
      true, false,
      '', ' ',
      {},
      () => {}
    ].forEach((val) => {
      expect(SETRACE.bind(null, val, () => {})).to.throw(Error);
    });

    [
      -1, 0, 1,
      true, false,
      '', ' ',
      {},
      []
    ].forEach((val) => {
      expect(SETRACE.bind(null, [], val)).to.throw(Error);
    });

    [
      -1, 0, 1,
      true, false,
      '', ' ',
      {},
      []
    ].forEach((val) => {
      expect(SETRACE.bind(null, [], () => {}, val)).to.throw(Error);
    });
  });

  it('should return an object.', () => {
    expect(SETRACE([], () => {})).to.be.a('object');
  });

  describe('#SETRACE', () => {

    it('should have property `.set`.', () => {
      expect(SETRACE([], () => {})).to.have.ownProperty('set');
    });

    it('should call the callback when all conditions are met.', () => {
      const conditions = [
        'a',
        'b',
        'c'
      ];
      let callbackCalled = false;
      const callback = () => {
        callbackCalled = true;
      };

      const race = SETRACE(conditions, callback);

      conditions.forEach((name) => {
        race.set[name]();
      });

      expect(callbackCalled).to.be.true;
    });

    it('should call the callback when no conditions are given.', () => {
      const conditions = [];
      let callbackCalled = false;
      const callback = () => {
        callbackCalled = true;
      };

      SETRACE(conditions, callback);

      expect(callbackCalled).to.be.true;
    });

    it('should call the progress report callback whenever a condition is met.', () => {
      const conditions = [
        'a',
        'b',
        'c'
      ];
      let progressReportCount = 0;
      const progressReportCallback = () => {
        progressReportCount++;
      };

      const race = SETRACE(conditions, () => {}, progressReportCallback);

      conditions.forEach((name) => {
        race.set[name]();
      });

      expect(progressReportCount).to.equal(conditions.length);
    });

    it('should call the callback after the final progress report.', () => {
      const conditions = [
        'a',
        'b',
        'c'
      ];
      let progressReportCount = 0;
      const progressReportCallback = () => {
        progressReportCount++;
      };
      let capturedCount = -1;
      const callback = () => {
        capturedCount = progressReportCount;
      };

      const race = SETRACE(conditions, callback, progressReportCallback);

      conditions.forEach((name) => {
        race.set[name]();
      });

      expect(capturedCount).to.equal(conditions.length);
    });

  });

});
