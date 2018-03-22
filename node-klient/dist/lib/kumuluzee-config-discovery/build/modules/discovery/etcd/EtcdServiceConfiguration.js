'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _EtcdUtils = require('modules/discovery/etcd/EtcdUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EtcdServiceConfiguration = function EtcdServiceConfiguration(serviceName, environment, version, ttl, singleton, baseUrl, containerUrl, clusterId, startRetryDelay, maxRetryDelay) {
    _classCallCheck(this, EtcdServiceConfiguration);

    this.serviceName = null;
    this.environment = null;
    this.version = null;
    this.serviceId = null;
    this.ttl = null;
    this.singleton = false;
    this.baseUrl = null;
    this.containerUrl = null;
    this.clusterId = null;
    this.startRetryDelay = null;
    this.maxRetryDelay = null;
    this.serviceInstanceKey = null;
    this.serviceKeyUrl = null;

    this.serviceName = serviceName;
    this.environment = environment;
    this.version = version;
    this.serviceId = serviceName + '-' + (0, _v2.default)();
    this.ttl = ttl;
    this.singleton = singleton;
    this.baseUrl = baseUrl;
    this.containerUrl = containerUrl;
    this.clusterId = clusterId;
    this.startRetryDelay = startRetryDelay;
    this.maxRetryDelay = maxRetryDelay;
    this.serviceInstanceKey = (0, _EtcdUtils.getServiceKeyInstance)(this.environment, this.serviceName, this.version, this.serviceId);
    this.serviceKeyUrl = this.serviceInstanceKey + '/url/';
};

exports.default = EtcdServiceConfiguration;