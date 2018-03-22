'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeEtcd = require('node-etcd');

var _nodeEtcd2 = _interopRequireDefault(_nodeEtcd);

var _url = require('url');

var _ConfigurationUtil = require('modules/configuration/utils/ConfigurationUtil');

var _InitializationUtils = require('modules/configuration/utils/InitializationUtils');

var _InitializationUtils2 = _interopRequireDefault(_InitializationUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Etcd2ConfigurationSource = function () {
  function Etcd2ConfigurationSource() {
    _classCallCheck(this, Etcd2ConfigurationSource);

    this.ordinalNumber = 110;
    this.etcd = null;
    this.namespace = '';
    this.startRetryDelay = 0;
    this.maxRetryDelay = 0;
    this.configurationDispatcher = null;
    this.configurationUtil = null;
  }

  _createClass(Etcd2ConfigurationSource, [{
    key: 'init',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(configurationDispatcher) {
        var etcdUsername, etcdPassword, cert, sslContext, decode, etcdSecurityContext, etcdUrls, splitedEtcdUrls, etcdHosts;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.configurationUtil = _ConfigurationUtil.ConfigurationUtil;

                this.configurationDispatcher = configurationDispatcher;

                // Get namespace
                _context.next = 4;
                return _InitializationUtils2.default.getNamespace(this.configurationUtil, 'etcd');

              case 4:
                this.namespace = _context.sent;

                console.info('Using namespace ' + this.namespace);

                // Get user credentials
                _context.next = 8;
                return this.configurationUtil.get('kumuluzee.discovery.etcd.username');

              case 8:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 11;
                  break;
                }

                _context.t0 = null;

              case 11:
                etcdUsername = _context.t0;
                _context.next = 14;
                return this.configurationUtil.get('kumuluzee.discovery.etcd.password');

              case 14:
                _context.t1 = _context.sent;

                if (_context.t1) {
                  _context.next = 17;
                  break;
                }

                _context.t1 = null;

              case 17:
                etcdPassword = _context.t1;
                _context.next = 20;
                return this.configurationUtil.get('kumuluzee.discovery.etcd.ca');

              case 20:
                _context.t2 = _context.sent;

                if (_context.t2) {
                  _context.next = 23;
                  break;
                }

                _context.t2 = null;

              case 23:
                cert = _context.t2;
                sslContext = null;

                // TODO!

                if (cert) {
                  cert = cert.replace(/\s+/g, '').replace('-----BEGINCERTIFICATE-----', '').replace('-----ENDCERTIFICATE-----', '');
                  decode = Buffer.from(cert, 'base64');


                  sslContext = decode;
                }

                // Initialize security context
                etcdSecurityContext = null;

                if (etcdUsername && etcdUsername !== '' && etcdPassword && etcdPassword !== '') {
                  etcdSecurityContext = {
                    auth: {
                      username: etcdUsername,
                      password: etcdPassword
                    }
                  };
                  if (sslContext) {
                    // TODO
                    etcdSecurityContext.ca = sslContext;
                  }
                }

                // Get etcd host names
                _context.next = 30;
                return this.configurationUtil.get('kumuluzee.discovery.etcd.hosts');

              case 30:
                _context.t3 = _context.sent;

                if (_context.t3) {
                  _context.next = 33;
                  break;
                }

                _context.t3 = null;

              case 33:
                etcdUrls = _context.t3;

                if (!(etcdUrls && etcdUrls !== '')) {
                  _context.next = 50;
                  break;
                }

                splitedEtcdUrls = etcdUrls.split(',');
                // URI maker is implemented in Java. Not sure if i need it too

                etcdHosts = null;

                try {
                  etcdHosts = splitedEtcdUrls.map(function (url) {
                    return new _url.URL(url);
                  }).map(function (url) {
                    return url.href;
                  });
                } catch (err) {
                  console.error('Malformed URL exception: ' + err);
                }

                if (etcdHosts && etcdHosts.length % 2 === 0) {
                  console.error('Using an odd number of etcd hosts is recommended. See etcd documentation.');
                }

                etcdSecurityContext = null;
                if (etcdSecurityContext) {
                  etcdSecurityContext.maxRetries = 1;
                  this.etcd = new _nodeEtcd2.default(etcdHosts, etcdSecurityContext);
                } else {
                  this.etcd = new _nodeEtcd2.default(etcdHosts, { maxRetries: 1 });
                }
                // Get retry delays
                _context.next = 43;
                return _InitializationUtils2.default.getStartRetryDelayMs(this.configurationUtil, 'etcd');

              case 43:
                this.startRetryDelay = _context.sent;
                _context.next = 46;
                return _InitializationUtils2.default.getMaxRetryDelayMs(this.configurationUtil, 'etcd');

              case 46:
                this.maxRetryDelay = _context.sent;


                console.info('etcd2 configuration source successfully initialised.');
                _context.next = 51;
                break;

              case 50:
                console.error('No etcd server hosts provided. Specify hosts with configuration key ' + 'kumuluzee.discovery.etcd.hosts in format ' + 'http://192.168.99.100:2379,http://192.168.99.101:2379,http://192.168.99.102:2379');

              case 51:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x) {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'get',
    value: function get(key) {
      var _this = this;

      key = this.namespace + '/' + this.parseKeyNameForEtcd(key);
      var value = null;
      return new Promise(function (resolve) {
        _this.etcd.get(key, { maxRetries: 0 }, function (err, res) {
          if (!err) {
            value = res.node.value;

            value = _this.changeType(value);

            resolve(value);
          } else {
            resolve(null);
          }
        });
      });
    }
  }, {
    key: 'watch',
    value: function watch(key) {
      var _this2 = this;

      var fullKey = this.namespace + '/' + this.parseKeyNameForEtcd(key);
      var currentRetryDelay = this.startRetryDelay;

      if (this.etcd) {
        console.info('Initializing watch for key: ' + fullKey);

        var callback = function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, res) {
            var watch, newValue, fallbackConfig;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    watch = function watch() {
                      try {
                        _this2.etcd.get(fullKey, { wait: true, maxRetries: 0 }, callback);
                      } catch (tryErr) {
                        console.error('Etcd Exception when watching key, error: ' + tryErr);
                      }
                    };

                    if (!(err || !res)) {
                      _context2.next = 8;
                      break;
                    }

                    if (err) {
                      console.error('Etcd Exception when watching key, error: ' + err);
                    }
                    setTimeout(function () {
                      return watch();
                    }, currentRetryDelay);

                    currentRetryDelay *= 2;
                    if (currentRetryDelay > _this2.maxRetryDelay) {
                      currentRetryDelay = _this2.maxRetryDelay;
                    }
                    _context2.next = 26;
                    break;

                  case 8:
                    currentRetryDelay = _this2.startRetryDelay;

                    newValue = res.node.value;

                    if (!_this2.configurationDispatcher) {
                      _context2.next = 25;
                      break;
                    }

                    if (!newValue) {
                      _context2.next = 17;
                      break;
                    }

                    console.info('Value changed. Key: ' + _this2.parseKeyNameFromEtcd(fullKey) + ' New value: ' + newValue);

                    newValue = _this2.changeType(newValue);
                    _this2.configurationDispatcher.notifyChange(_this2.parseKeyNameFromEtcd(fullKey), newValue);
                    _context2.next = 25;
                    break;

                  case 17:
                    console.info('Etcd2 watch callback for key ' + _this2.parseKeyNameFromEtcd(fullKey) + ' invoked. No value present, fallback to other configuration sources.');
                    _context2.next = 20;
                    return _this2.configurationUtil.get(_this2.parseKeyNameFromEtcd(fullKey));

                  case 20:
                    _context2.t0 = _context2.sent;

                    if (_context2.t0) {
                      _context2.next = 23;
                      break;
                    }

                    _context2.t0 = null;

                  case 23:
                    fallbackConfig = _context2.t0;


                    if (fallbackConfig) {
                      _this2.configurationDispatcher.notifyChange(_this2.parseKeyNameFromEtcd(fullKey), fallbackConfig);
                    }

                  case 25:
                    watch();

                  case 26:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this2);
          }));

          return function callback(_x2, _x3) {
            return _ref2.apply(this, arguments);
          };
        }();
        this.etcd.get(fullKey, { wait: true, maxRetries: 0 }, callback);
      }
    }
  }, {
    key: 'changeType',
    value: function changeType(value) {
      var newValue = value;
      if (parseFloat(value)) {
        newValue = parseFloat(value);
      } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
        newValue = value.toLowerCase() === 'true';
      }
      return newValue;
    }
  }, {
    key: 'parseKeyNameForEtcd',
    value: function parseKeyNameForEtcd(key) {
      return key.replace(/\[/g, '.[').replace(/\./g, '/');
    }
  }, {
    key: 'parseKeyNameFromEtcd',
    value: function parseKeyNameFromEtcd(key) {
      return key.substring(this.namespace.length + 1).replace(/\//g, '.').replace(/\.\[/g, '[');
    }
  }, {
    key: 'getListSize',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(key) {
        var _etcd$getSync, err, body, node, arrayIndexes, listSize, i;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                key = this.namespace + '/' + this.parseKeyNameForEtcd(key);

                if (!this.etcd) {
                  _context3.next = 20;
                  break;
                }

                _etcd$getSync = this.etcd.getSync(key, { maxRetries: 1 }), err = _etcd$getSync.err, body = _etcd$getSync.body;

                if (err) {
                  _context3.next = 20;
                  break;
                }

                node = body.node;
                arrayIndexes = node.nodes.map(function (_ref4) {
                  var keyNode = _ref4.key;

                  try {
                    return parseInt(keyNode.substring(key.length + 3, keyNode.length - 1), 10);
                  } catch (parseErr) {
                    console.error('Error when parsing integers from array key: ' + parseErr);
                    return -1;
                  }
                });

                arrayIndexes = arrayIndexes.sort();

                listSize = 0;
                i = 0;

              case 9:
                if (!(i < arrayIndexes.length)) {
                  _context3.next = 18;
                  break;
                }

                if (!(arrayIndexes[i] === listSize)) {
                  _context3.next = 14;
                  break;
                }

                listSize += 1;
                _context3.next = 15;
                break;

              case 14:
                return _context3.abrupt('break', 18);

              case 15:
                i++;
                _context3.next = 9;
                break;

              case 18:
                if (!(listSize > 0)) {
                  _context3.next = 20;
                  break;
                }

                return _context3.abrupt('return', listSize);

              case 20:
                return _context3.abrupt('return', 0);

              case 21:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getListSize(_x4) {
        return _ref3.apply(this, arguments);
      }

      return getListSize;
    }()
  }]);

  return Etcd2ConfigurationSource;
}();

exports.default = new Etcd2ConfigurationSource();