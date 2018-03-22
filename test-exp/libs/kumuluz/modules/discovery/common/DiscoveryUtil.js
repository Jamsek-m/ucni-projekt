'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ConsulDiscoveryUtil = require('../consul/ConsulDiscoveryUtil');

var _ConsulDiscoveryUtil2 = _interopRequireDefault(_ConsulDiscoveryUtil);

var _EtcdDiscoveryUtil = require('../etcd/EtcdDiscoveryUtil');

var _EtcdDiscoveryUtil2 = _interopRequireDefault(_EtcdDiscoveryUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DiscoveryUtil = function () {
  function DiscoveryUtil() {
    _classCallCheck(this, DiscoveryUtil);

    this.discoverySource = null;
  }

  _createClass(DiscoveryUtil, [{
    key: 'initialize',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(extension) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (extension === 'consul') {
                  this.discoverySource = _ConsulDiscoveryUtil2.default;
                } else if (extension === 'etcd') {
                  this.discoverySource = _EtcdDiscoveryUtil2.default;
                } else {
                  console.error('Invalid extension');
                }

                _context.next = 3;
                return this.discoverySource.init();

              case 3:
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
    key: 'register',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(serviceName, version, environment, ttl, pingInterval, singleton) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.discoverySource.register(serviceName, version, environment, ttl, pingInterval, singleton);

                // Application was interupted (Console)
                process.on('SIGINT', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return _this.deregister();

                        case 2:
                          process.exit();

                        case 3:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this);
                })));

                // Application got signal to terminate (ex: Kubernetes)
                process.on('SIGTERM', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _this.deregister();

                        case 2:
                          process.exit();

                        case 3:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, _this);
                })));

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function register(_x2, _x3, _x4, _x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: 'deregister',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.discoverySource.deregister();

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deregister() {
        return _ref5.apply(this, arguments);
      }

      return deregister;
    }()
  }, {
    key: 'getUrl',
    value: function getUrl(serviceName, version) {
      var environment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'dev';
      var accessType = arguments[3];

      console.info('Initializing field for service: ' + serviceName + ' version: ' + version + ' environment: ' + environment);

      return this.discoverySource.getServiceInstance(serviceName, version, environment, accessType);
    }
  }, {
    key: 'disableServiceInstance',
    value: function disableServiceInstance(serviceName, version, environment, url) {
      this.discoverySource.disableServiceInstance(serviceName, version, environment, url);
    }
  }]);

  return DiscoveryUtil;
}();

exports.default = new DiscoveryUtil();