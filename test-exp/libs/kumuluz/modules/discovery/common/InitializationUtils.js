'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InitializationUtils = function () {
  function InitializationUtils() {
    _classCallCheck(this, InitializationUtils);
  }

  _createClass(InitializationUtils, [{
    key: 'getStartRetryDelayMs',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(configurationUtil, implementation) {
        var universalConfig;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return configurationUtil.get('kumuluzee.discovery.start-retry-delay-ms');

              case 2:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 5;
                  break;
                }

                _context.t0 = null;

              case 5:
                universalConfig = _context.t0;

                if (!universalConfig) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', universalConfig);

              case 8:
                _context.next = 10;
                return configurationUtil.get('kumuluzee.discovery.' + implementation + '.start-retry-delay-ms');

              case 10:
                _context.t1 = _context.sent;

                if (_context.t1) {
                  _context.next = 13;
                  break;
                }

                _context.t1 = 500;

              case 13:
                return _context.abrupt('return', _context.t1);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getStartRetryDelayMs(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getStartRetryDelayMs;
    }()
  }, {
    key: 'getMaxRetryDelayMs',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(configurationUtil, implementation) {
        var universalConfig;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return configurationUtil.get('kumuluzee.discovery.max-retry-delay-ms');

              case 2:
                _context2.t0 = _context2.sent;

                if (_context2.t0) {
                  _context2.next = 5;
                  break;
                }

                _context2.t0 = null;

              case 5:
                universalConfig = _context2.t0;

                if (!universalConfig) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return', universalConfig);

              case 8:
                _context2.next = 10;
                return configurationUtil.get('kumuluzee.discovery.' + implementation + '.max-retry-delay-ms');

              case 10:
                _context2.t1 = _context2.sent;

                if (_context2.t1) {
                  _context2.next = 13;
                  break;
                }

                _context2.t1 = 900000;

              case 13:
                return _context2.abrupt('return', _context2.t1);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getMaxRetryDelayMs(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getMaxRetryDelayMs;
    }()
  }]);

  return InitializationUtils;
}();

exports.default = new InitializationUtils();