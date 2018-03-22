'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EtcdUtils = require('./EtcdUtils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EtcdRegistrator = function () {
  function EtcdRegistrator(etcd, serviceConfig, resillience) {
    _classCallCheck(this, EtcdRegistrator);

    this.etcd = etcd;
    this.serviceConfig = serviceConfig;
    this.resillience = resillience;
    this.isRegistered = false;
  }

  _createClass(EtcdRegistrator, [{
    key: 'run',
    value: function run() {
      if (!this.isRegistered) {
        this.registerToEtcd();
      } else {
        this.sendHeartbeat();
      }
    }
  }, {
    key: 'registerToEtcd',
    value: function registerToEtcd() {
      var _this = this;

      var isRegistered = this.isServiceRegistered();
      var currentRetryDelay = this.serviceConfig.startRetryDelay;
      if (this.serviceConfig.singleton && !isRegistered) {
        console.error('Instance was not registered. Trying to register a singleton microservice instance, but ' + 'another instance is already registered.');
      } else if (this.etcd) {
        console.info('Registering service with etcd. Service ID: ' + this.serviceConfig.serviceKeyUrl);
        var callback = function callback(err, res) {
          var register = function register() {
            if (!_this.isRegistered) _this.etcd.mkdir(_this.serviceConfig.serviceInstanceKey, { ttl: _this.serviceConfig.ttl, maxRetries: 0 }, callback);
          };
          if (err || !res) {
            if (err) {
              _this.handleTimeoutException(err);
            }

            setTimeout(function () {
              return register();
            }, currentRetryDelay);
            currentRetryDelay *= 2;
            if (currentRetryDelay > _this.serviceConfig.maxRetryDelay) {
              currentRetryDelay = _this.serviceConfig.maxRetryDelay;
            }
          } else {
            _this.etcd.setSync(_this.serviceConfig.serviceKeyUrl, _this.serviceConfig.baseUrl);

            if (_this.serviceConfig.containerUrl) {
              _this.etcd.setSync(_this.serviceConfig.serviceInstanceKey + '/containerUrl', _this.serviceConfig.containerUrl);
            }
            if (_this.serviceConfig.clusterId) {
              _this.etcd.setSync(_this.serviceConfig.serviceInstanceKey + '/clusterId', _this.serviceConfig.clusterId);
            }
            _this.isRegistered = true;
          }
        };

        this.etcd.mkdir(this.serviceConfig.serviceInstanceKey, { ttl: this.serviceConfig.ttl, maxRetries: 0 }, callback);
      }
    }
  }, {
    key: 'isServiceRegistered',
    value: function isServiceRegistered() {
      var serviceInstanceKey = (0, _EtcdUtils.getServiceKeyInstances)(this.serviceConfig.environment, this.serviceConfig.serviceName, this.serviceConfig.version);

      var etcdKeysResponse = (0, _EtcdUtils.getEtcdDir)(this.etcd, serviceInstanceKey, 0, this.resillience);

      var responseNodes = etcdKeysResponse && etcdKeysResponse.body && etcdKeysResponse.body.node && etcdKeysResponse.body.node.nodes || [];

      var url = null;
      var isActive = true;

      responseNodes.forEach(function (node) {
        if ((0, _EtcdUtils.getLastKeyLayer)(node.key) === 'url' && node.value) url = node.value;
        if ((0, _EtcdUtils.getLastKeyLayer)(node.key) === 'status' && node.value === 'disabled') isActive = false;
      });

      if (isActive && url) return true;

      return false;
    }
  }, {
    key: 'sendHeartbeat',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var currentRetryDelay, callback;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.info('Sending heartbeat.');
                currentRetryDelay = this.serviceConfig.startRetryDelay;

                callback = function callback(err, res) {
                  var watch = function watch() {
                    _this2.etcd.raw('PUT', 'v2/keys' + _this2.serviceConfig.serviceInstanceKey, null, { refresh: true, ttl: _this2.serviceConfig.ttl, dir: true, prevExist: true, maxRetries: 0 }, callback);
                  };
                  if (err || !res) {
                    if (err.errorCode === 100) {
                      console.error('Etcd key not present: ' + _this2.serviceConfig.serviceInstanceKey + '. Registering service.');
                      _this2.isRegistered = false;
                      _this2.registerToEtcd();
                    } else {
                      _this2.handleTimeoutException(err);
                    }

                    setTimeout(function () {
                      return watch();
                    }, currentRetryDelay);
                    currentRetryDelay *= 2;
                    if (currentRetryDelay > _this2.serviceConfig.maxRetryDelay) {
                      currentRetryDelay = _this2.serviceConfig.maxRetryDelay;
                    }
                  }
                };

                this.etcd.raw('PUT', 'v2/keys' + this.serviceConfig.serviceInstanceKey, null, { refresh: true, ttl: this.serviceConfig.ttl, dir: true, prevExist: true, maxRetries: 0 }, callback);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sendHeartbeat() {
        return _ref.apply(this, arguments);
      }

      return sendHeartbeat;
    }()
  }, {
    key: 'handleTimeoutException',
    value: function handleTimeoutException(err) {
      var message = 'Timeout exception. Cannot read given key in specified time or retry-count constraints.';
      if (this.resillience) {
        console.error(message + ' ' + err);
      } else {
        throw new Error(message + ' ' + err);
      }
    }
  }]);

  return EtcdRegistrator;
}();

exports.default = EtcdRegistrator;