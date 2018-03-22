'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./modules/discovery/index.js');

var _index2 = _interopRequireDefault(_index);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var server = (0, _express2.default)();

var register = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _index2.default.initialize({ extension: 'consul' });

                    case 2:

                        _index2.default.registerService();

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function register() {
        return _ref.apply(this, arguments);
    };
}();

register();

server.get('/lookup', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var resp;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _index2.default.discoverService({
                            value: 'customer-service', version: '^1.x.4', environment: 'dev', accessType: 'DIRECT'
                        });

                    case 2:
                        resp = _context2.sent;

                        res.status(200).json(resp);

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x, _x2) {
        return _ref2.apply(this, arguments);
    };
}());

server.get('/config', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        res.status(200).json(_config.restConfig);

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
    };
}());

server.all('*', function (req, res) {
    res.status(404).json({
        message: 'This route does not exist!'
    });
});

server.listen(3000, function () {
    console.info('Service is listening on port 3000');
});