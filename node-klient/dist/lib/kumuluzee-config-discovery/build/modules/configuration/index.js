'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfigurationUtil = require("../../modules/configuration/utils/ConfigurationUtil");

var ConfigBundle = function () {
  function ConfigBundle(configuration) {
    _classCallCheck(this, ConfigBundle);

    this._configuration = null;

    this._configuration = configuration;
  }

  _createClass(ConfigBundle, [{
    key: 'initialize',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(extension) {
        var _prefixKey;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this._configuration != null)) {
                  _context.next = 11;
                  break;
                }

                _prefixKey = this._configuration.prefixKey;

                if (_prefixKey) {
                  _context.next = 6;
                  break;
                }

                console.error('No prefix key provided!');
                _context.next = 11;
                break;

              case 6:
                _context.next = 8;
                return ConfigurationUtil.initialize(extension, this._configuration);

              case 8:
                _context.next = 10;
                return this.populateValues(this, this._configuration, _prefixKey, false);

              case 10:

                delete this._configuration;

              case 11:
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
    key: 'populateValues',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(processed, configuration, prefixKey, watchAll) {
        var _this = this;

        var _fields, fieldKeys, promises;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!configuration) {
                  _context3.next = 8;
                  break;
                }

                watchAll = watchAll || configuration.watch || false;
                _fields = configuration.fields;
                fieldKeys = Object.keys(_fields);
                promises = fieldKeys.map(function (key) {
                  return new Promise(function () {
                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
                      var currentObject, _watch, keyPath, isArray, size, promisesArray, i, promise, valueArray, _i, promisesNested, _i2, _promise, value;

                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              currentObject = _fields[key];

                              if (!currentObject) {
                                _context2.next = 40;
                                break;
                              }

                              _watch = currentObject.watch || false;
                              keyPath = null;

                              if (currentObject.name && currentObject.name !== '') {
                                keyPath = _this.getKeyName(currentObject.name, prefixKey);
                              } else {
                                keyPath = _this.getKeyName(key, prefixKey);
                              }

                              isArray = currentObject.type === 'array' || false;

                              if (!isArray) {
                                _context2.next = 27;
                                break;
                              }

                              _context2.next = 9;
                              return ConfigurationUtil.getListSize(keyPath);

                            case 9:
                              size = _context2.sent;

                              if (currentObject.fields) {
                                _context2.next = 19;
                                break;
                              }

                              promisesArray = [];


                              for (i = 0; i < size; i++) {
                                promise = ConfigurationUtil.get(keyPath + '[' + i + ']');

                                promisesArray.push(promise);
                              }

                              _context2.next = 15;
                              return Promise.all(promisesArray);

                            case 15:
                              valueArray = _context2.sent;


                              processed[key] = valueArray;
                              _context2.next = 25;
                              break;

                            case 19:
                              processed[key] = [];
                              for (_i = 0; _i < size; _i++) {
                                processed[key].push({});
                              }
                              promisesNested = [];

                              for (_i2 = 0; _i2 < size; _i2++) {
                                _promise = _this.populateValues(processed[key][_i2], currentObject, keyPath + '[' + _i2 + ']', watchAll);

                                promisesNested.push(_promise);
                              }

                              _context2.next = 25;
                              return Promise.all(promisesNested);

                            case 25:
                              _context2.next = 38;
                              break;

                            case 27:
                              if (!currentObject.fields) {
                                _context2.next = 33;
                                break;
                              }

                              // Process nested object
                              processed[key] = {};
                              _context2.next = 31;
                              return _this.populateValues(processed[key], currentObject, keyPath, watchAll);

                            case 31:
                              _context2.next = 38;
                              break;

                            case 33:
                              _context2.next = 35;
                              return ConfigurationUtil.get(keyPath);

                            case 35:
                              value = _context2.sent;


                              if (value) {
                                processed[key] = value;
                              } else {
                                processed[key] = null;
                              }
                              if (watchAll || _watch) {
                                _this.deployWatcher(keyPath);
                              }

                            case 38:
                              _context2.next = 41;
                              break;

                            case 40:
                              console.error('ConfigurationObject is not valid!');

                            case 41:
                              return _context2.abrupt('return', resolve());

                            case 42:
                            case 'end':
                              return _context2.stop();
                          }
                        }
                      }, _callee2, _this);
                    }));

                    return function (_x6) {
                      return _ref3.apply(this, arguments);
                    };
                  }());
                });
                _context3.next = 7;
                return Promise.all(promises);

              case 7:
                watchAll = false;

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function populateValues(_x2, _x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return populateValues;
    }()
  }, {
    key: 'deployWatcher',
    value: function deployWatcher(key) {
      var _this2 = this;

      ConfigurationUtil.subscribe(key, function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(thisKey, value) {
          var splittedKey, _type;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (key === thisKey) {
                    splittedKey = _this2.getPath(key, ConfigurationUtil.configuration);

                    splittedKey = splittedKey.split('.');

                    _type = _this2.determineType(splittedKey.slice(1), ConfigurationUtil.configuration);


                    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== _type) {
                      console.error('Error when setting value, type mismatch for ' + key);
                    } else {
                      _this2.setNestedValue(splittedKey.slice(1), value, _this2);
                    }
                  }

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this2);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'getPath',
    value: function getPath(wholeKey, processed) {
      var _this3 = this;

      var splittedKey = wholeKey.split('.');

      // Check for path without first element ( prefix key )
      var path = splittedKey.slice(1).map(function (currentKey) {
        var key = '';
        var iterateKey = currentKey.split('[');
        // Is array
        if (iterateKey.length > 1) {
          var _iterateKey = iterateKey;

          var _iterateKey2 = _slicedToArray(_iterateKey, 1);

          iterateKey = _iterateKey2[0];
        } else {
          iterateKey = currentKey;
        }

        if (processed.fields && !Object.keys(processed.fields).includes(_this3.hyphenCaseToCamelCase(iterateKey))) {
          Object.keys(processed.fields).forEach(function (k) {
            if (processed.fields[k].name === currentKey) {
              key = k;
              iterateKey = k;
            }
          });
        } else {
          key = currentKey;
        }
        processed = processed.fields[_this3.hyphenCaseToCamelCase(iterateKey)];
        return _this3.hyphenCaseToCamelCase(key);
      });

      return splittedKey[0] + '.' + path.join('.');
    }
  }, {
    key: 'determineType',
    value: function determineType(splittedKey, processed) {
      if (splittedKey.length === 0) {
        return processed.type;
      }

      var _splittedKey = splittedKey,
          _splittedKey2 = _slicedToArray(_splittedKey, 1),
          currentKey = _splittedKey2[0];

      var arraySplit = currentKey.split('[');

      if (arraySplit.length > 1) {
        var _arraySplit = _slicedToArray(arraySplit, 1);

        currentKey = _arraySplit[0];
      }

      if (processed.fields[currentKey]) {
        if (splittedKey.length > 1) {
          splittedKey.splice(0, 1);
        } else {
          splittedKey = [];
        }
        return this.determineType(splittedKey, processed.fields[currentKey]);
      }
      return null;
    }
  }, {
    key: 'setNestedValue',
    value: function setNestedValue(splittedKey, value, processed) {
      var _splittedKey3 = _slicedToArray(splittedKey, 1),
          currentKey = _splittedKey3[0];

      var arraySplit = currentKey.split('[');

      if (arraySplit.length > 1) {
        var _arraySplit2 = _slicedToArray(arraySplit, 1);

        currentKey = _arraySplit2[0];

        var indexArray = parseInt(arraySplit[1], 10);

        if (splittedKey.length === 1) {
          processed[currentKey][indexArray] = value;
        } else {
          splittedKey.splice(0, 1);
          this.setNestedValue(splittedKey, value, processed[currentKey][indexArray]);
        }
      } else if (splittedKey.length === 1) {
        processed[currentKey] = value;
      } else {
        splittedKey.splice(0, 1);
        this.setNestedValue(splittedKey, value, processed[currentKey]);
      }
    }
  }, {
    key: 'getKeyName',
    value: function getKeyName(key, prefixKey) {
      var keyName = prefixKey;
      if (keyName !== '') {
        keyName = keyName + '.';
      }

      keyName = '' + keyName + this.camelCaseToHyphenCase(key);

      return keyName;
    }
  }, {
    key: 'hyphenCaseToCamelCase',
    value: function hyphenCaseToCamelCase(key) {
      return key.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    }
  }, {
    key: 'camelCaseToHyphenCase',
    value: function camelCaseToHyphenCase(key) {
      return key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
    }
  }]);

  return ConfigBundle;
}();

exports.ConfigurationUtil = ConfigurationUtil;
exports.default = ConfigBundle;