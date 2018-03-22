'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoveryUtil = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _configuration = require('../configuration');

var _DiscoveryUtil = require('./common/DiscoveryUtil');

var _DiscoveryUtil2 = _interopRequireDefault(_DiscoveryUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KumuluzeeDiscovery = function () {
  function KumuluzeeDiscovery() {
    _classCallCheck(this, KumuluzeeDiscovery);

    this.discoveryUtil = null;
  }

  _createClass(KumuluzeeDiscovery, [{
    key: 'initialize',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var extension = _ref2.extension;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _DiscoveryUtil2.default.initialize(extension);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initialize(_x) {
        return _ref.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: 'registerService',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(properties) {
        var serviceName, ttl, pingInterval, environment, version, singleton;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _configuration.ConfigurationUtil.get('kumuluzee.name');

              case 2:
                _context2.t1 = _context2.sent;

                if (_context2.t1) {
                  _context2.next = 5;
                  break;
                }

                _context2.t1 = properties && properties.value;

              case 5:
                _context2.t0 = _context2.t1;

                if (_context2.t0) {
                  _context2.next = 8;
                  break;
                }

                _context2.t0 = null;

              case 8:
                serviceName = _context2.t0;


                if (!serviceName) console.error('Service name not provided!');

                _context2.next = 12;
                return _configuration.ConfigurationUtil.get('kumuluzee.discovery.ttl');

              case 12:
                _context2.t3 = _context2.sent;

                if (_context2.t3) {
                  _context2.next = 15;
                  break;
                }

                _context2.t3 = properties && properties.ttl;

              case 15:
                _context2.t2 = _context2.t3;

                if (_context2.t2) {
                  _context2.next = 18;
                  break;
                }

                _context2.t2 = 30;

              case 18:
                ttl = _context2.t2;
                _context2.next = 21;
                return _configuration.ConfigurationUtil.get('kumuluzee.discovery.ping-interval');

              case 21:
                _context2.t5 = _context2.sent;

                if (_context2.t5) {
                  _context2.next = 24;
                  break;
                }

                _context2.t5 = properties && properties.pingInterval;

              case 24:
                _context2.t4 = _context2.t5;

                if (_context2.t4) {
                  _context2.next = 27;
                  break;
                }

                _context2.t4 = 20;

              case 27:
                pingInterval = _context2.t4;
                _context2.next = 30;
                return _configuration.ConfigurationUtil.get('kumuluzee.env.name');

              case 30:
                _context2.t7 = _context2.sent;

                if (_context2.t7) {
                  _context2.next = 33;
                  break;
                }

                _context2.t7 = properties && properties.environment;

              case 33:
                _context2.t6 = _context2.t7;

                if (_context2.t6) {
                  _context2.next = 36;
                  break;
                }

                _context2.t6 = 'dev';

              case 36:
                environment = _context2.t6;
                _context2.next = 39;
                return _configuration.ConfigurationUtil.get('kumuluzee.version');

              case 39:
                _context2.t9 = _context2.sent;

                if (_context2.t9) {
                  _context2.next = 42;
                  break;
                }

                _context2.t9 = properties && properties.version;

              case 42:
                _context2.t8 = _context2.t9;

                if (_context2.t8) {
                  _context2.next = 45;
                  break;
                }

                _context2.t8 = '1.0.0';

              case 45:
                version = _context2.t8;
                singleton = properties && properties.singleton || false;


                console.info('Registering service: ' + serviceName);
                _DiscoveryUtil2.default.register(serviceName, version, environment, ttl, pingInterval, singleton);

              case 49:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function registerService(_x2) {
        return _ref3.apply(this, arguments);
      }

      return registerService;
    }()
  }, {
    key: 'deregisterService',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _DiscoveryUtil2.default.deregister();

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deregisterService() {
        return _ref4.apply(this, arguments);
      }

      return deregisterService;
    }()
  }, {
    key: 'discoverService',
    value: function discoverService(_ref5) {
      var value = _ref5.value,
          _ref5$version = _ref5.version,
          version = _ref5$version === undefined ? '*' : _ref5$version,
          _ref5$environment = _ref5.environment,
          environment = _ref5$environment === undefined ? 'dev' : _ref5$environment,
          _ref5$accessType = _ref5.accessType,
          accessType = _ref5$accessType === undefined ? 'GATEWAY' : _ref5$accessType;

      return _DiscoveryUtil2.default.getUrl(value, version, environment, accessType);
    }
  }, {
    key: 'disableServiceInstance',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref7) {
        var value = _ref7.value,
            version = _ref7.version,
            environment = _ref7.environment,
            url = _ref7.url;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _DiscoveryUtil2.default.disableServiceInstance(value, version, environment, url);

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function disableServiceInstance(_x3) {
        return _ref6.apply(this, arguments);
      }

      return disableServiceInstance;
    }()
  }]);

  return KumuluzeeDiscovery;
}();

exports.DiscoveryUtil = _DiscoveryUtil2.default;
exports.default = new KumuluzeeDiscovery();