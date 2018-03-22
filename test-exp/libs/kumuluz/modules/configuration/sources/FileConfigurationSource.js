'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileConfigurationSource = function () {
  function FileConfigurationSource() {
    _classCallCheck(this, FileConfigurationSource);

    this.ordinalNumber = 100;
    this.yamlFileName = 'config.yaml';
    this.ymlFileName = 'config.yml';
    this.propertiesFileName = 'config.properties';
    this.doc = null;
  }

  _createClass(FileConfigurationSource, [{
    key: 'init',
    value: function init() {
      var mainPath = _path2.default.dirname(require.main.filename);
      var file = null;
      try {
        file = _fs2.default.readFileSync(mainPath + '/config/' + this.ymlFileName, 'utf-8');
      } catch (err) {}
      if (!file) {
        try {
          file = _fs2.default.readFileSync(mainPath + '/config/' + this.yamlFileName, 'utf-8');
        } catch (err) {}
      }

      if (file) {
        console.info('Loading configuration from YAML file.');
        try {
          this.doc = _jsYaml2.default.safeLoad(file);
        } catch (err) {
          console.error('Couldn\'t successfully process the YAML configuration file. All your properties may not be correctly loaded: ' + err);
        }
      }

      if (this.doc) {
        console.info('Configuration successfully read.');
      } else {
        console.error('Unable to load configuration from file. No configuration files were found.');
      }
    }
  }, {
    key: 'get',
    value: function get(key) {
      return this.getValue(key);
    }
  }, {
    key: 'getValue',
    value: function getValue(key) {
      var splitedKeys = key.split('.');
      var value = this.doc;

      splitedKeys.forEach(function (splitedKey) {
        if (!value) return null;

        if (splitedKey.indexOf('[') !== -1 && splitedKey.indexOf(']') !== -1) {
          var startIndex = splitedKey.indexOf('[');
          var arrayIndex = splitedKey.match(/\[(.*)\]/);

          if (arrayIndex) {
            arrayIndex = arrayIndex.pop();
            var val = splitedKey.substring(0, startIndex);

            if (val && arrayIndex) {
              value = value[val][parseInt(arrayIndex, 10)];
            }
          }
        } else {
          value = value[splitedKey];
        }
      });
      return value || null;
    }
  }, {
    key: 'getListSize',
    value: function getListSize(key) {
      var value = this.getValue(key);
      if (value instanceof Array) {
        return value.length;
      }
      return 0;
    }
  }, {
    key: 'watch',
    value: function watch() {}
  }]);

  return FileConfigurationSource;
}();

exports.default = new FileConfigurationSource();