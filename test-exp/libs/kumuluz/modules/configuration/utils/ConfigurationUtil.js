'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigurationUtil = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FileConfigurationSource = require('../sources/FileConfigurationSource');

var _FileConfigurationSource2 = _interopRequireDefault(_FileConfigurationSource);

var _EnvironmentConfigurationSource = require('../sources/EnvironmentConfigurationSource');

var _EnvironmentConfigurationSource2 = _interopRequireDefault(_EnvironmentConfigurationSource);

var _ConsulConfigurationSource = require('../sources/ConsulConfigurationSource');

var _ConsulConfigurationSource2 = _interopRequireDefault(_ConsulConfigurationSource);

var _Etcd2ConfigurationSource = require('../sources/Etcd2ConfigurationSource');

var _Etcd2ConfigurationSource2 = _interopRequireDefault(_Etcd2ConfigurationSource);

var _ConfigurationDispatcher = require('./ConfigurationDispatcher');

var _ConfigurationDispatcher2 = _interopRequireDefault(_ConfigurationDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfigurationUtilSingleton = function () {
  function ConfigurationUtilSingleton() {
    _classCallCheck(this, ConfigurationUtilSingleton);

    this.configurationDispatcher = null;
    this.configurationSources = [];
    this.configuration = null;

    this.configurationSources.push(_EnvironmentConfigurationSource2.default);
    this.configurationSources.push(_FileConfigurationSource2.default);

    // Initialize basic configuration sources
    this.configurationSources.forEach(function (configurationSource) {
      configurationSource.init();
    });

    this.configurationDispatcher = new _ConfigurationDispatcher2.default();
  }

  _createClass(ConfigurationUtilSingleton, [{
    key: 'initialize',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, configuraion) {
        var extension = _ref2.extension;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(extension === 'etcd')) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return _Etcd2ConfigurationSource2.default.init(this.configurationDispatcher);

              case 3:
                this.configurationSources.push(_Etcd2ConfigurationSource2.default);
                _context.next = 13;
                break;

              case 6:
                if (!(extension === 'consul')) {
                  _context.next = 12;
                  break;
                }

                _context.next = 9;
                return _ConsulConfigurationSource2.default.init(this.configurationDispatcher);

              case 9:
                this.configurationSources.push(_ConsulConfigurationSource2.default);
                _context.next = 13;
                break;

              case 12:
                if (extension) {
                  console.error('Invalid extension!');
                }

              case 13:
                this.configurationSources.sort(function (a, b) {
                  return a.ordinalNumber - b.ordinalNumber;
                }).reverse();

                this.configuration = configuraion;

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initialize(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: 'get',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key) {
        var configurationSourcesPromises, res, i;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                configurationSourcesPromises = this.configurationSources.map(function (configurationSource) {
                  return configurationSource.get(key);
                });
                _context2.next = 3;
                return Promise.all(configurationSourcesPromises);

              case 3:
                res = _context2.sent;
                i = 0;

              case 5:
                if (!(i < res.length)) {
                  _context2.next = 11;
                  break;
                }

                if (!res[i]) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return', res[i]);

              case 8:
                i++;
                _context2.next = 5;
                break;

              case 11:
                return _context2.abrupt('return', null);

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x3) {
        return _ref3.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'getListSize',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(key) {
        var listSize, configurationSourcesPromises, res, i;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                listSize = -1;
                configurationSourcesPromises = this.configurationSources.map(function (configurationSource) {
                  return configurationSource.getListSize(key);
                });
                _context3.next = 4;
                return Promise.all(configurationSourcesPromises);

              case 4:
                res = _context3.sent;


                for (i = 0; i < res.length; i++) {
                  if (res[i] > listSize) listSize = res[i];
                }
                return _context3.abrupt('return', listSize);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getListSize(_x4) {
        return _ref4.apply(this, arguments);
      }

      return getListSize;
    }()
  }, {
    key: 'subscribe',
    value: function subscribe(key, listener) {
      if (this.configurationDispatcher) this.configurationDispatcher.subscribe(listener);

      this.configurationSources.forEach(function (configurationSource) {
        return configurationSource.watch(key);
      });
    }
  }]);

  return ConfigurationUtilSingleton;
}();

var ConfigurationUtil = exports.ConfigurationUtil = new ConfigurationUtilSingleton();