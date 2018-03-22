'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EnvironmentConfigurationSource = function () {
  function EnvironmentConfigurationSource() {
    _classCallCheck(this, EnvironmentConfigurationSource);

    this.ordinalNumber = 300;
  }

  _createClass(EnvironmentConfigurationSource, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'get',
    value: function get(key) {
      var value = process.env[this.parseKeyNameForEnvironmentVariables(key)];

      if (!value) {
        value = process.env[this.parseKeyNameForEnvironmentVariablesLegacy(key)];
      }
      return value || null;
    }
  }, {
    key: 'parseKeyNameForEnvironmentVariables',
    value: function parseKeyNameForEnvironmentVariables(key) {
      return key.toUpperCase().replace(/\[/g, '').replace(/\]/g, '').replace(/-/g, '').replace(/\./g, '_');
    }
  }, {
    key: 'parseKeyNameForEnvironmentVariablesLegacy',
    value: function parseKeyNameForEnvironmentVariablesLegacy(key) {
      return key.toUpperCase().replace(/\./g, '_');
    }
  }, {
    key: 'getListSize',
    value: function getListSize(key) {
      var listSize = -1;
      var index = -1;
      var value = null;
      do {
        listSize += 1;
        index += 1;
        value = process.env[this.parseKeyNameForEnvironmentVariables(key + '[' + index + ']')];
      } while (value);

      return listSize > 0 ? listSize : 0;
    }
  }, {
    key: 'watch',
    value: function watch() {}
  }]);

  return EnvironmentConfigurationSource;
}();

exports.default = new EnvironmentConfigurationSource();