'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getServiceKeyInstance = exports.getServiceKeyInstance = function getServiceKeyInstance(environment, serviceName, version, serviceId) {
  return '/environments/' + environment + '/services/' + serviceName + '/' + version + '/instances/' + serviceId;
};
var getServiceKeyInstances = exports.getServiceKeyInstances = function getServiceKeyInstances(environment, serviceName, version) {
  return '/environments/' + environment + '/services/' + serviceName + '/' + version + '/instances/';
};

var getLastKeyLayer = exports.getLastKeyLayer = function getLastKeyLayer(key) {
  var splitted = key.split('/');
  return splitted[splitted.length - 1];
};

var getEtcdDir = exports.getEtcdDir = function getEtcdDir(etcd, key, retryPolicy, resillience) {
  try {
    return etcd.getSync(key, { recursive: true, maxRetries: retryPolicy });
  } catch (err) {
    console.error('Error when trying to access key: ' + err);
  }

  return null;
};