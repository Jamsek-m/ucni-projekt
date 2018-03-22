"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfigurationDispatcher = function () {
  function ConfigurationDispatcher() {
    _classCallCheck(this, ConfigurationDispatcher);

    this.subscribtions = [];
  }

  _createClass(ConfigurationDispatcher, [{
    key: "notifyChange",
    value: function notifyChange(key, value) {
      this.subscribtions.forEach(function (subscription) {
        return subscription(key, value);
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(listener) {
      this.subscribtions.push(listener);
    }
  }]);

  return ConfigurationDispatcher;
}();

exports.default = ConfigurationDispatcher;