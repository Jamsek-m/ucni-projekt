'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommonUtils = function () {
  function CommonUtils() {
    _classCallCheck(this, CommonUtils);

    this.lastInstanceServedIndex = 0;
  }

  _createClass(CommonUtils, [{
    key: 'determineVersion',
    value: function determineVersion(discoveryUtil, serviceName, version, environment) {
      if (!_semver2.default.validRange(version) && !_semver2.default.valid(version)) return version;

      //if (!version.includes('*') && !version.includes('x')) return version;

      var versionsOpt = discoveryUtil.getServiceVersions(serviceName, environment);

      if (versionsOpt) {
        var sortedVersions = versionsOpt.sort(function (v1, v2) {
          return _semver2.default.rcompare(v1, v2);
        });

        for (var i = 0; i < sortedVersions.length; i++) {
          if (_semver2.default.satisfies(sortedVersions[i], version)) {
            return sortedVersions[i];
          }
        }
      }
      return version;
    }
    // !

  }, {
    key: 'pickServiceInstanceRoundRobin',
    value: function pickServiceInstanceRoundRobin(serviceInstances) {
      if (serviceInstances.length > 0) {
        var index = 0;
        if (serviceInstances.length >= this.lastInstanceServedIndex + 2) {
          index = this.lastInstanceServedIndex + 1;
        }
        this.lastInstanceServedIndex = index;

        return serviceInstances[index] || null;
      }

      return null;
    }
  }]);

  return CommonUtils;
}();

exports.default = new CommonUtils();