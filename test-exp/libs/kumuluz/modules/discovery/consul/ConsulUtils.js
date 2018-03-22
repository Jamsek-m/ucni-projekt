'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getConsulServiceKey = exports.getConsulServiceKey = function getConsulServiceKey(serviceName, environment) {
  return environment + '/' + serviceName;
};

var serviceHealthToUrl = function serviceHealthToUrl(serviceHealth) {
  try {
    return (serviceHealth.Service.Tags.includes('https') ? 'https' : 'http') + '://' + serviceHealth.Node.Address + ':' + serviceHealth.Service.Port;
  } catch (err) {
    console.error('Malformed URL when translating serviceHealth to URL: ' + err);
  }
  return null;
};

var getInstanceFromServiceHealth = exports.getInstanceFromServiceHealth = function getInstanceFromServiceHealth(serviceHealth) {
  var serviceUrl = serviceHealthToUrl(serviceHealth);
  if (serviceUrl) {
    var version = null;
    var TAG_VERSION_PREFIX = 'version=';

    serviceHealth.Service.Tags.forEach(function (tag) {
      if (tag.startsWith('version=')) {
        version = tag.substring(TAG_VERSION_PREFIX.length);
      }
    });

    if (!version) {
      version = '1.0.0';
    }

    return {
      id: serviceHealth.Service.ID,
      version: version,
      serviceUrl: serviceUrl
    };
  }
  return null;
};