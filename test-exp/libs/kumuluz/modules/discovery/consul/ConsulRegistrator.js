'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ConsulUtils = require('./ConsulUtils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConsulRegistrator = function () {
  function ConsulRegistrator(agentClient, healthClient, serviceConfiguration) {
    _classCallCheck(this, ConsulRegistrator);

    this.agentClient = agentClient;
    this.healthClient = healthClient;
    this.serviceConfiguration = serviceConfiguration;
    this.isRegistered = false;
    this.currentRetryDelay = serviceConfiguration.startRetryDelay;
  }

  _createClass(ConsulRegistrator, [{
    key: 'run',
    value: function run() {
      if (!this.isRegistered) {
        this.registerToConsul();
      } else {
        this.sendHeartbeat();
      }
    }
  }, {
    key: 'registerToConsul',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var isHealthy, register;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.isServiceRegistered();

              case 2:
                isHealthy = _context2.sent;

                if (!(this.serviceConfiguration.singleton && isHealthy)) {
                  _context2.next = 7;
                  break;
                }

                console.info('Instance was not registered. Trying to register a singleton microservice instance, but another instance is already registered.');
                _context2.next = 15;
                break;

              case 7:
                console.info('Registering service with Consul. Service name: ' + this.serviceConfiguration.serviceName + ' Service ID: ' + this.serviceConfiguration.serviceId);

                if (!this.agentClient) {
                  _context2.next = 14;
                  break;
                }

                register = function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var ttlCheck;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.prev = 0;
                            ttlCheck = {
                              ttl: _this.serviceConfiguration.ttl + 's',
                              deregistercriticalserviceafter: _this.serviceConfiguration.deregisterCriticalServiceAfter + 's'
                            };
                            _context.next = 4;
                            return _this.agentClient.service.register({
                              port: _this.serviceConfiguration.servicePort,
                              name: _this.serviceConfiguration.getServiceConsulKey(),
                              id: _this.serviceConfiguration.serviceId,
                              check: ttlCheck,
                              tags: [_this.serviceConfiguration.serviceProtocol, 'version=' + _this.serviceConfiguration.version]
                            });

                          case 4:

                            _this.isRegistered = true;
                            _this.currentRetryDelay = _this.serviceConfiguration.startRetryDelay;

                            _this.sendHeartbeat();
                            _context.next = 15;
                            break;

                          case 9:
                            _context.prev = 9;
                            _context.t0 = _context['catch'](0);

                            console.error('Consul Exception when registering service: ' + _context.t0);
                            setTimeout(function () {
                              return register();
                            }, _this.currentRetryDelay);

                            // exponential increase, limited by maxRetryDelay
                            _this.currentRetryDelay *= 2;
                            if (_this.currentRetryDelay > _this.serviceConfiguration.maxRetryDelay) {
                              _this.currentRetryDelay = _this.serviceConfiguration.maxRetryDelay;
                            }

                          case 15:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this, [[0, 9]]);
                  }));

                  return function register() {
                    return _ref2.apply(this, arguments);
                  };
                }();

                _context2.next = 12;
                return register();

              case 12:
                _context2.next = 15;
                break;

              case 14:
                console.error('Consul not initialized.');

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function registerToConsul() {
        return _ref.apply(this, arguments);
      }

      return registerToConsul;
    }()
  }, {
    key: 'isServiceRegistered',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this2 = this;

        var serviceInstances, registered;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.healthClient) {
                  _context3.next = 15;
                  break;
                }

                serviceInstances = [];
                _context3.prev = 2;
                _context3.next = 5;
                return this.healthClient.service({
                  service: this.serviceConfiguration.getServiceConsulKey(),
                  passing: true
                });

              case 5:
                serviceInstances = _context3.sent;
                _context3.next = 12;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](2);

                console.error('Error retrieving healthy instances from Consul. Cannot determine, if service is already registered. ConsulException: ' + _context3.t0);
                return _context3.abrupt('return', true);

              case 12:
                registered = false;

                serviceInstances.forEach(function (serviceHealth) {
                  var consulService = (0, _ConsulUtils.getInstanceFromServiceHealth)(serviceHealth);
                  if (consulService && consulService.version === _this2.serviceConfiguration.version) {
                    registered = true;
                  }
                });

                return _context3.abrupt('return', registered);

              case 15:

                console.info('Consul not initialized');
                return _context3.abrupt('return', false);

              case 17:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 8]]);
      }));

      function isServiceRegistered() {
        return _ref3.apply(this, arguments);
      }

      return isServiceRegistered;
    }()
  }, {
    key: 'sendHeartbeat',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.info('Sending heartbeat.');
                _context4.prev = 1;
                _context4.next = 4;
                return this.agentClient.check.pass('service:' + this.serviceConfiguration.serviceId);

              case 4:
                _context4.next = 11;
                break;

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4['catch'](1);

                console.error('Received NotRegisteredException from Consul AgentClient when sending heartbeat. Reregistering service.');
                this.isRegistered = false;
                this.registerToConsul();

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 6]]);
      }));

      function sendHeartbeat() {
        return _ref4.apply(this, arguments);
      }

      return sendHeartbeat;
    }()
  }]);

  return ConsulRegistrator;
}();

exports.default = ConsulRegistrator;