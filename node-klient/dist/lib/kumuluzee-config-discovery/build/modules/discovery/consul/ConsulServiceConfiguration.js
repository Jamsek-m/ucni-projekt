'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ConsulUtils = require('modules/discovery/consul/ConsulUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConsulServiceConfiguration = function () {
    function ConsulServiceConfiguration(serviceName, environment, version, serviceProtocol, servicePort, ttl, singleton, startRetryDelay, maxRetryDelay, deregisterCriticalServiceAfter) {
        _classCallCheck(this, ConsulServiceConfiguration);

        this.serviceName = null;
        this.environment = null;
        this.version = null;
        this.serviceId = null;
        this.serviceProtocol = null;
        this.servicePort = null;
        this.ttl = null;
        this.singleton = false;
        this.startRetryDelay = null;
        this.maxRetryDelay = null;
        this.deregisterCriticalServiceAfter = null;

        this.serviceName = serviceName;
        this.environment = environment;
        this.version = version;
        this.serviceId = serviceName + '-' + (0, _v2.default)();
        this.serviceProtocol = serviceProtocol;
        this.servicePort = servicePort;
        this.ttl = ttl;
        this.singleton = singleton;
        this.startRetryDelay = startRetryDelay;
        this.maxRetryDelay = maxRetryDelay;
        this.deregisterCriticalServiceAfter = deregisterCriticalServiceAfter;
    }

    _createClass(ConsulServiceConfiguration, [{
        key: 'getServiceConsulKey',
        value: function getServiceConsulKey() {
            return (0, _ConsulUtils.getConsulServiceKey)(this.serviceName, this.environment);
        }
    }]);

    return ConsulServiceConfiguration;
}();

exports.default = ConsulServiceConfiguration;