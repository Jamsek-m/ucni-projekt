'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _consul = require('consul');

var _consul2 = _interopRequireDefault(_consul);

var _url = require('url');

var _ConfigurationUtil = require('../utils/ConfigurationUtil');

var _InitializationUtils = require('../utils/InitializationUtils');

var _InitializationUtils2 = _interopRequireDefault(_InitializationUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConsulConfigurationSource = function () {
  function ConsulConfigurationSource() {
    _classCallCheck(this, ConsulConfigurationSource);

    this.ordinalNumber = 110;
    this.namespace = '';
    this.kvClient = null;
    this.consul = null;
    this.startRetryDelay = 0;
    this.maxRetryDelay = 0;
    this.CONSUL_WATCH_WAIT_SECONDS = 120;
    this.configurationDispatcher = null;
    this.configurationUtil = null;
  }

  _createClass(ConsulConfigurationSource, [{
    key: 'init',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(configurationDispatcher) {
        var consulAgentUrl, pingSuccessful;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.configurationUtil = _ConfigurationUtil.ConfigurationUtil;
                _context.next = 3;
                return _InitializationUtils2.default.getNamespace(this.configurationUtil, 'consul');

              case 3:
                this.namespace = _context.sent;

                console.info('Using namespace ' + this.namespace);

                _context.next = 7;
                return _InitializationUtils2.default.getStartRetryDelayMs(this.configurationUtil, 'consul');

              case 7:
                this.startRetryDelay = _context.sent;
                _context.next = 10;
                return _InitializationUtils2.default.getMaxRetryDelayMs(this.configurationUtil, 'consul');

              case 10:
                this.maxRetryDelay = _context.sent;


                this.configurationDispatcher = configurationDispatcher;

                _context.next = 14;
                return this.configurationUtil.get('kumuluzee.config.consul.agent');

              case 14:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 17;
                  break;
                }

                _context.t0 = 'http://localhost:8500';

              case 17:
                consulAgentUrl = _context.t0;

                try {
                  consulAgentUrl = new _url.URL(consulAgentUrl);
                } catch (err) {
                  console.error('Provided Consul Agent URL is not valid. Defaulting to http://localhost:8500');
                  try {
                    consulAgentUrl = new _url.URL('http://localhost:8500');
                  } catch (defaultErr) {
                    console.error('Error when parsing URL http://localhost:8500 Error: ' + defaultErr);
                  }
                }

                console.info('Connectig to Consul Agent at: ' + consulAgentUrl.toString());

                this.consul = (0, _consul2.default)({
                  host: consulAgentUrl.hostname,
                  port: consulAgentUrl.port,
                  secure: consulAgentUrl.protocol === 'https:',
                  timeout: this.CONSUL_WATCH_WAIT_SECONDS * 1000 + this.CONSUL_WATCH_WAIT_SECONDS * 1000 / 16 + 1000,
                  promisify: true
                });

                pingSuccessful = false;
                _context.prev = 22;
                _context.next = 25;
                return this.consul.agent.self();

              case 25:
                pingSuccessful = true;
                _context.next = 31;
                break;

              case 28:
                _context.prev = 28;
                _context.t1 = _context['catch'](22);

                console.error('Cannot ping Consul agent: ' + _context.t1);

              case 31:

                this.kvClient = this.consul.kv;

                if (pingSuccessful) {
                  console.info('Consul configuration source successfully initialised');
                } else {
                  console.error('Consul configuration source initialized, but Consul agent inaccessible. Configuration source may not work as expected.');
                }

              case 33:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[22, 28]]);
      }));

      function init(_x) {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'get',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key) {
        var value;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                key = this.namespace + '/' + this.parseKeyNameForConsul(key);

                if (this.kvClient) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return', null);

              case 3:
                value = null;
                _context2.prev = 4;
                _context2.next = 7;
                return this.kvClient.get(key);

              case 7:
                value = _context2.sent;


                if (value) {
                  value = value.Value;
                  value = this.changeType(value);
                }
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](4);

                console.error('Consul exception: ' + _context2.t0);

              case 14:
                return _context2.abrupt('return', value || null);

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 11]]);
      }));

      function get(_x2) {
        return _ref2.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'watch',
    value: function watch(key) {
      var _this = this;

      var waitTime = this.CONSUL_WATCH_WAIT_SECONDS / 60;
      waitTime = waitTime + 'm';

      var fullKey = this.namespace + '/' + this.parseKeyNameForConsul(key);
      console.info('Initializing watch for key: ' + fullKey);

      var currentRetryDelay = this.startRetryDelay;

      var previouslyDeleted = false;

      var index = 0;

      var callback = function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(err, res, data) {
          var watch, responseIndex, fallbackConfig;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  watch = function watch() {
                    try {
                      _this.kvClient.get({
                        key: fullKey,
                        wait: waitTime,
                        index: index,
                        recurse: true
                      }, callback);
                    } catch (tryErr) {
                      console.error('Exception when watching key ' + tryErr);
                    }
                  };
                  // Error


                  if (!err) {
                    _context3.next = 5;
                    break;
                  }

                  if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
                    setTimeout(function () {
                      return watch();
                    }, currentRetryDelay);

                    currentRetryDelay *= 2;
                    if (currentRetryDelay > _this.maxRetryDelay) {
                      currentRetryDelay = _this.maxRetryDelay;
                    }
                  } else {
                    console.error('Watch error: ' + err);
                  }
                  _context3.next = 23;
                  break;

                case 5:
                  // Response is succesful
                  responseIndex = data.headers['x-consul-index'];


                  currentRetryDelay = _this.startRetryDelay;

                  if (!res) {
                    _context3.next = 11;
                    break;
                  }

                  if (responseIndex !== index) {
                    res.forEach(function (_ref4) {
                      var Value = _ref4.Value,
                          Key = _ref4.Key;

                      var value = _this.changeType(Value);

                      _this.configurationDispatcher.notifyChange(_this.parseKeyNameFromConsul(Key), value);
                      previouslyDeleted = false;

                      console.info('Consul watch callback for key ' + _this.parseKeyNameFromConsul(Key) + ' invoked. New value: ' + value);
                    });
                  }
                  _context3.next = 21;
                  break;

                case 11:
                  if (previouslyDeleted) {
                    _context3.next = 21;
                    break;
                  }

                  console.info('Consul watch callback for key ' + _this.parseKeyNameFromConsul(fullKey) + ' invoked. No value present, fallback to other configuration sources.');

                  _context3.next = 15;
                  return _this.configurationUtil.get(key);

                case 15:
                  _context3.t0 = _context3.sent;

                  if (_context3.t0) {
                    _context3.next = 18;
                    break;
                  }

                  _context3.t0 = null;

                case 18:
                  fallbackConfig = _context3.t0;

                  if (fallbackConfig) {
                    _this.configurationDispatcher.notifyChange(_this.parseKeyNameFromConsul(fullKey), fallbackConfig);
                  }

                  previouslyDeleted = true;

                case 21:
                  index = responseIndex;

                  watch();

                case 23:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this);
        }));

        return function callback(_x3, _x4, _x5) {
          return _ref3.apply(this, arguments);
        };
      }();
      try {
        this.kvClient.get({
          key: fullKey,
          wait: waitTime,
          index: index,
          recurse: true
        }, callback);
      } catch (tryErr) {
        console.error('Exception when watching key ' + tryErr);
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
    key: 'set',
    value: function set(key, value) {
      if (!this.kvClient) return null;

      try {
        this.kvClient.set({
          key: parseKeyNameForConsul(key),
          value: value
        });
      } catch (err) {
        console.error('Console error when trying to set value, Error: ' + err);
      }
    }
  }, {
    key: 'parseKeyNameForConsul',
    value: function parseKeyNameForConsul(key) {
      return key.replace(/\[/g, '.[').replace(/\./g, '/');
    }
  }, {
    key: 'parseKeyNameFromConsul',
    value: function parseKeyNameFromConsul(key) {
      return key.substring(this.namespace.length + 1).replace(/\//g, '.').replace(/\.\[/g, '[');
    }
  }, {
    key: 'getListSize',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(key) {
        var values, arrayIndexes, listSize, i;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                key = this.namespace + '/' + this.parseKeyNameForConsul(key);
                values = [];
                _context4.prev = 2;
                _context4.next = 5;
                return this.kvClient.get({ key: key, recurse: true });

              case 5:
                values = _context4.sent;
                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](2);

                console.error('Consul exception: ' + _context4.t0);

              case 11:
                if (!(values && values.length > 0)) {
                  _context4.next = 28;
                  break;
                }

                arrayIndexes = [];


                values.forEach(function (_ref6) {
                  var valueKey = _ref6.Key;

                  try {
                    arrayIndexes.push(parseInt(valueKey.substring(key.length + 2, valueKey.length - 1), 10));
                  } catch (err) {
                    console.error('Error when parsing integer from array ' + err);
                  }
                });

                arrayIndexes = arrayIndexes.sort();

                listSize = 0;
                i = 0;

              case 17:
                if (!(i < arrayIndexes.length)) {
                  _context4.next = 26;
                  break;
                }

                if (!(arrayIndexes[i] === listSize)) {
                  _context4.next = 22;
                  break;
                }

                listSize += 1;
                _context4.next = 23;
                break;

              case 22:
                return _context4.abrupt('break', 26);

              case 23:
                i++;
                _context4.next = 17;
                break;

              case 26:
                if (!(listSize > 0)) {
                  _context4.next = 28;
                  break;
                }

                return _context4.abrupt('return', listSize);

              case 28:
                return _context4.abrupt('return', 0);

              case 29:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 8]]);
      }));

      function getListSize(_x6) {
        return _ref5.apply(this, arguments);
      }

      return getListSize;
    }()
  }]);

  return ConsulConfigurationSource;
}();

exports.default = new ConsulConfigurationSource();