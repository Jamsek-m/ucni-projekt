'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _consul = require('consul');

var _consul2 = _interopRequireDefault(_consul);

var _url = require('url');

var _configuration = require('../../configuration');

var _InitializationUtils = require('../common/InitializationUtils');

var _InitializationUtils2 = _interopRequireDefault(_InitializationUtils);

var _ConsulServiceConfiguration = require('./ConsulServiceConfiguration');

var _ConsulServiceConfiguration2 = _interopRequireDefault(_ConsulServiceConfiguration);

var _ConsulRegistrator = require('./ConsulRegistrator');

var _ConsulRegistrator2 = _interopRequireDefault(_ConsulRegistrator);

var _CommonUtil = require('../common/CommonUtil');

var _CommonUtil2 = _interopRequireDefault(_CommonUtil);

var _ConsulUtils = require('./ConsulUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConsulDiscoveryUtil = function () {
  function ConsulDiscoveryUtil() {
    _classCallCheck(this, ConsulDiscoveryUtil);

    this.consul = null;
    this.kvClient = null;
    this.healthClient = null;
    this.startRetryDelay = null;
    this.maxRetryDelay = null;
    this.CONSUL_WATCH_WAIT_SECONDS = 120;
    this.registeredServices = [];
    this.serviceInstances = new Map();
    this.serviceVersions = new Map();
    this.gatewayUrls = new Map();
  }

  _createClass(ConsulDiscoveryUtil, [{
    key: 'init',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var consulAgentUrl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _configuration.ConfigurationUtil.get('kumuluzee.config.consul.agent');

              case 2:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 5;
                  break;
                }

                _context.t0 = 'http://localhost:8500';

              case 5:
                consulAgentUrl = _context.t0;

                try {
                  consulAgentUrl = new _url.URL(consulAgentUrl);
                } catch (err) {
                  console.error('Malformed URL exception: ' + err);
                }
                console.info('Connectig to Consul Agent at: ' + consulAgentUrl);

                try {
                  this.consul = (0, _consul2.default)({
                    host: consulAgentUrl.hostname,
                    port: consulAgentUrl.port,
                    secure: consulAgentUrl.protocol === ':https',
                    timeout: this.CONSUL_WATCH_WAIT_SECONDS * 1000 + this.CONSUL_WATCH_WAIT_SECONDS * 1000 / 16 + 1000,
                    promisify: true
                  });
                } catch (err) {
                  console.error('Error when connecting to consul: ' + err);
                }

                _context.prev = 9;
                _context.next = 12;
                return this.consul.agent.self();

              case 12:
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t1 = _context['catch'](9);

                console.error('Cannot ping Consul agent: ' + _context.t1);

              case 17:

                this.kvClient = this.consul.kv;
                this.healthClient = this.consul.health;
                this.agentClient = this.consul.agent;

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 14]]);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'register',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(serviceName, version, environment, ttl, pingInterval, singleton) {
        var serviceProtocol, servicePort, deregisterCriticalServiceAfter, serviceConfiguration, registrator;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _configuration.ConfigurationUtil.get('kumuluzee.discovery.consul.protocol');

              case 2:
                _context2.t0 = _context2.sent;

                if (_context2.t0) {
                  _context2.next = 5;
                  break;
                }

                _context2.t0 = 'http';

              case 5:
                serviceProtocol = _context2.t0;
                _context2.next = 8;
                return _configuration.ConfigurationUtil.get('kumuluzee.port');

              case 8:
                _context2.t1 = _context2.sent;

                if (_context2.t1) {
                  _context2.next = 11;
                  break;
                }

                _context2.t1 = 8080;

              case 11:
                servicePort = _context2.t1;
                _context2.next = 14;
                return _InitializationUtils2.default.getStartRetryDelayMs(_configuration.ConfigurationUtil, 'consul');

              case 14:
                this.startRetryDelay = _context2.sent;
                _context2.next = 17;
                return _InitializationUtils2.default.getMaxRetryDelayMs(_configuration.ConfigurationUtil, 'consul');

              case 17:
                this.maxRetryDelay = _context2.sent;
                _context2.next = 20;
                return _configuration.ConfigurationUtil.get('kumuluzee.config.consul.deregister-critical-service-after-s');

              case 20:
                _context2.t2 = _context2.sent;

                if (_context2.t2) {
                  _context2.next = 23;
                  break;
                }

                _context2.t2 = 60;

              case 23:
                deregisterCriticalServiceAfter = _context2.t2;
                serviceConfiguration = new _ConsulServiceConfiguration2.default(serviceName, environment, version, serviceProtocol, servicePort, ttl, singleton, this.startRetryDelay, this.maxRetryDelay, deregisterCriticalServiceAfter);

                // Register and schedule heartbeats

                registrator = new _ConsulRegistrator2.default(this.agentClient, this.healthClient, serviceConfiguration);


                registrator.run();
                setInterval(function () {
                  return registrator.run();
                }, pingInterval * 1000);

                this.registeredServices.push(serviceConfiguration);

              case 29:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function register(_x, _x2, _x3, _x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: 'deregister',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this = this;

        var promises;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.agentClient) {
                  _context3.next = 10;
                  break;
                }

                promises = this.registeredServices.map(function (service) {
                  console.info('Deregistering service with Consul. Service name: ' + service.serviceName + ' Service ID: ' + service.serviceId);
                  return _this.agentClient.service.deregister(service.serviceId);
                });
                _context3.prev = 2;
                _context3.next = 5;
                return Promise.all(promises);

              case 5:
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](2);

                console.error('Exception when deregistering service: ' + _context3.t0);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 7]]);
      }));

      function deregister() {
        return _ref3.apply(this, arguments);
      }

      return deregister;
    }()
  }, {
    key: 'getServiceInstances',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(serviceName, version, environment, accessType) {
        var consulServiceKey, serviceHealths, serviceVersions, serviceUrls, serviceList, urlList, resolvedVersion, gatewayUrl;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                consulServiceKey = (0, _ConsulUtils.getConsulServiceKey)(serviceName, environment);

                if (!(!this.serviceInstances.get(consulServiceKey) || !this.serviceVersions.get(consulServiceKey))) {
                  _context4.next = 19;
                  break;
                }

                console.info('Performing service lookup on Consul Agent.');

                serviceHealths = [];
                _context4.prev = 4;
                _context4.next = 7;
                return this.healthClient.service({
                  service: consulServiceKey,
                  passing: true
                });

              case 7:
                serviceHealths = _context4.sent;
                _context4.next = 13;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4['catch'](4);

                console.error('Error retrieving healthy service instances from Consul: ' + _context4.t0);

              case 13:
                serviceVersions = [];
                serviceUrls = [];


                serviceHealths.forEach(function (serviceHealth) {
                  var consulService = (0, _ConsulUtils.getInstanceFromServiceHealth)(serviceHealth);
                  if (consulService) {
                    serviceUrls.push(consulService);
                    serviceVersions.push(consulService.version);
                  }
                });

                this.serviceInstances.set(consulServiceKey, serviceUrls);
                this.serviceVersions.set(consulServiceKey, serviceVersions);
                this.addServiceListener(consulServiceKey);

              case 19:
                serviceList = this.serviceInstances.get(consulServiceKey);
                urlList = [];

                if (!version) {
                  _context4.next = 30;
                  break;
                }

                resolvedVersion = _CommonUtil2.default.determineVersion(this, serviceName, version, environment);


                urlList = serviceList.filter(function (service) {
                  return service.version == resolvedVersion;
                }).map(function (service) {
                  return service.serviceUrl;
                });

                if (!(accessType === 'GATEWAY' && urlList.length > 0)) {
                  _context4.next = 30;
                  break;
                }

                _context4.next = 27;
                return this.getGatewayUrl(serviceName, resolvedVersion, environment);

              case 27:
                gatewayUrl = _context4.sent;

                try {
                  gatewayUrl = new _url.URL(gatewayUrl);
                } catch (err) {
                  console.error('Malformed URL exception: ' + err);
                }
                if (gatewayUrl) {
                  urlList = [gatewayUrl];
                }

              case 30:
                return _context4.abrupt('return', urlList);

              case 31:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[4, 10]]);
      }));

      function getServiceInstances(_x7, _x8, _x9, _x10) {
        return _ref4.apply(this, arguments);
      }

      return getServiceInstances;
    }()
  }, {
    key: 'getServiceInstance',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(serviceName, version, environment, accessType) {
        var optionalServiceInstances;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getServiceInstances(serviceName, version, environment, accessType);

              case 2:
                optionalServiceInstances = _context5.sent;
                return _context5.abrupt('return', _CommonUtil2.default.pickServiceInstanceRoundRobin(optionalServiceInstances) || null);

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getServiceInstance(_x11, _x12, _x13, _x14) {
        return _ref5.apply(this, arguments);
      }

      return getServiceInstance;
    }()
  }, {
    key: 'getGatewayUrl',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(serviceName, version, environment) {
        var _this2 = this;

        var currentRetryDelay, fullKey, gatewayUrl, res, index, waitTime, callback;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                currentRetryDelay = this.startRetryDelay;

                if (this.gatewayUrls.has(serviceName + '_' + version + '_' + environment)) {
                  _context6.next = 21;
                  break;
                }

                fullKey = 'environments/' + environment + '/services/' + serviceName + '/' + version + '/gatewayUrl';
                gatewayUrl = null;
                _context6.prev = 4;
                _context6.next = 7;
                return this.kvClient.get(fullKey);

              case 7:
                res = _context6.sent;

                if (res) {
                  gatewayUrl = res.Value;
                }
                _context6.next = 14;
                break;

              case 11:
                _context6.prev = 11;
                _context6.t0 = _context6['catch'](4);

                console.error('Consul exception: ' + _context6.t0);

              case 14:

                this.gatewayUrls.set(serviceName + '_' + version + '_' + environment);

                index = 0;
                waitTime = this.CONSUL_WATCH_WAIT_SECONDS / 60;

                waitTime = waitTime + 'm';

                callback = function callback(err, res, data) {
                  var watch = function watch() {
                    try {
                      _this2.kvClient.get({
                        key: fullKey,
                        wait: waitTime,
                        index: index
                      }, callback);
                    } catch (tryErr) {
                      console.error(tryErr);
                    }
                  };
                  // Error TODO TEST ERROR
                  if (err) {
                    if (err.code === 'ECONNREFUSED') {
                      setTimeout(function () {
                        return watch();
                      }, currentRetryDelay);

                      currentRetryDelay *= 2;
                      if (currentRetryDelay > _this2.maxRetryDelay) {
                        currentRetryDelay = _this2.maxRetryDelay;
                      }
                    } else {
                      console.error('Watch error: ' + err);
                    }
                  } else {
                    // Response is succesful
                    currentRetryDelay = _this2.startRetryDelay;

                    var responseIndex = data.headers['x-consul-index'];
                    if (res) {
                      if (responseIndex !== index) {
                        gatewayUrl = res.Value;
                        if (gatewayUrl) {
                          console.info('Gateway URL at ' + fullKey + ' changed. New value: ' + gatewayUrl);
                          try {
                            gatewayUrl = new _url.URL(gatewayUrl);
                          } catch (parseErr) {
                            console.error('Malformed URL exception: ' + parseErr);
                          }

                          _this2.gatewayUrls.set(serviceName + '_' + version + '_' + environment, gatewayUrl);
                        }
                      }
                    } else if (_this2.gatewayUrls.get(serviceName + '_' + version + '_' + environment)) {
                      console.info('Gateway URL at ' + fullKey + ' deleted.');
                      _this2.gatewayUrls.set(serviceName + '_' + version + '_' + environment, null);
                    }
                    index = responseIndex;

                    watch();
                  }
                };

                try {
                  this.kvClient.get({
                    key: fullKey,
                    wait: waitTime,
                    index: index
                  }, callback);
                } catch (err) {
                  console.error(err);
                }
                return _context6.abrupt('return', gatewayUrl);

              case 21:
                return _context6.abrupt('return', this.gatewayUrls.get(serviceName + '_' + version + '_' + environment));

              case 22:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[4, 11]]);
      }));

      function getGatewayUrl(_x15, _x16, _x17) {
        return _ref6.apply(this, arguments);
      }

      return getGatewayUrl;
    }()
  }, {
    key: 'addServiceListener',
    value: function addServiceListener(serviceKey) {
      var _this3 = this;

      var lengthOfServices = -1;
      var currentRetryDelay = this.startRetryDelay;

      var listen = function listen() {
        var listener = _this3.consul.watch({
          method: _this3.healthClient.service,
          options: {
            service: serviceKey
          }
        });

        listener.on('change', function (res) {
          currentRetryDelay = _this3.startRetryDelay;

          if (lengthOfServices !== res.length) {
            console.info('Service instances for service ' + serviceKey + ' refreshed!');
            _this3.serviceInstances.set(serviceKey, []);
            _this3.serviceVersions.set(serviceKey, []);

            res.forEach(function (service) {
              var consulService = (0, _ConsulUtils.getInstanceFromServiceHealth)(service);
              if (consulService) {
                _this3.serviceInstances.get(serviceKey).push(consulService);
                _this3.serviceVersions.get(serviceKey).push(consulService.version);
              }
            });
            lengthOfServices = res.length;
          }
        });

        listener.on('error', function (err) {
          if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
            listener.end();
            setTimeout(function () {
              return listen();
            }, currentRetryDelay);

            currentRetryDelay *= 2;
            if (currentRetryDelay > _this3.maxRetryDelay) {
              currentRetryDelay = _this3.maxRetryDelay;
            }
          } else {
            console.error('Consul error when listening for changes: ' + err);
          }
        });
      };

      listen();
    }
  }, {
    key: 'getServiceVersions',
    value: function getServiceVersions(serviceName, environment) {
      var consulServiceKey = (0, _ConsulUtils.getConsulServiceKey)(serviceName, environment);
      if (!this.serviceVersions.has(consulServiceKey)) {
        this.getServiceInstances(serviceName, null, environment, 'DIRECT');
      }

      return this.serviceVersions.get(consulServiceKey);
    }
  }, {
    key: 'disableServiceInstance',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(serviceName, version, environment, url) {
        var _this4 = this;

        var serviceList;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.getServiceInstances(serviceName, version, environment, 'DIRECT');

              case 2:
                serviceList = this.serviceInstances.get((0, _ConsulUtils.getConsulServiceKey)(serviceName, environment));

                serviceList.forEach(function () {
                  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(consulService) {
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            if (!(consulService.version === version && consulService.serviceUrl == url)) {
                              _context7.next = 9;
                              break;
                            }

                            _context7.prev = 1;
                            _context7.next = 4;
                            return _this4.agentClient.service.maintenance({ id: consulService.id, enable: true });

                          case 4:
                            _context7.next = 9;
                            break;

                          case 6:
                            _context7.prev = 6;
                            _context7.t0 = _context7['catch'](1);

                            console.error('Error deregistering service with Consul: ' + _context7.t0);

                          case 9:
                          case 'end':
                            return _context7.stop();
                        }
                      }
                    }, _callee7, _this4, [[1, 6]]);
                  }));

                  return function (_x22) {
                    return _ref8.apply(this, arguments);
                  };
                }());

              case 4:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function disableServiceInstance(_x18, _x19, _x20, _x21) {
        return _ref7.apply(this, arguments);
      }

      return disableServiceInstance;
    }()
  }]);

  return ConsulDiscoveryUtil;
}();

exports.default = new ConsulDiscoveryUtil();