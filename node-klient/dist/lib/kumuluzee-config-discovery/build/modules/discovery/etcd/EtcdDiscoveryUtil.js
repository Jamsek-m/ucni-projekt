'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeEtcd = require('node-etcd');

var _nodeEtcd2 = _interopRequireDefault(_nodeEtcd);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _url = require('url');

var _configuration = require('modules/configuration');

var _InitializationUtils = require('modules/discovery/common/InitializationUtils');

var _InitializationUtils2 = _interopRequireDefault(_InitializationUtils);

var _EtcdServiceConfiguration = require('modules/discovery/etcd/EtcdServiceConfiguration');

var _EtcdServiceConfiguration2 = _interopRequireDefault(_EtcdServiceConfiguration);

var _EtcdRegistrator = require('modules/discovery/etcd/EtcdRegistrator');

var _EtcdRegistrator2 = _interopRequireDefault(_EtcdRegistrator);

var _CommonUtil = require('modules/discovery/common/CommonUtil');

var _CommonUtil2 = _interopRequireDefault(_CommonUtil);

var _EtcdUtils = require('modules/discovery/etcd/EtcdUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EtcdDiscoveryUtil = function () {
  function EtcdDiscoveryUtil() {
    _classCallCheck(this, EtcdDiscoveryUtil);

    this.registeredServices = [];
    this.registratorHandles = [];
    this.serviceInstances = new Map();
    this.serviceVersions = new Map();
    this.gatewayUrls = new Map();
    this.lastKnownServices = new Map();
    this.lastKnownVersions = new Map();
    this.etcd = null;
    this.initalRequestRetryPolicy = null;
    this.startRetryDelay = null;
    this.maxRetryDelay = null;
    this.clusterId = '';
    this.resilience = false;
  }

  _createClass(EtcdDiscoveryUtil, [{
    key: 'init',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var etcdUsername, etcdPassword, cert, sslContext, decode, etcdSecurityContext, etcdUrls, splitedEtcdUrls, etcdHosts, initialRetryCount;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _configuration.ConfigurationUtil.get('kumuluzee.discovery.etcd.username');

              case 2:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 5;
                  break;
                }

                _context.t0 = null;

              case 5:
                etcdUsername = _context.t0;
                _context.next = 8;
                return _configuration.ConfigurationUtil.get('kumuluzee.discovery.etcd.password');

              case 8:
                _context.t1 = _context.sent;

                if (_context.t1) {
                  _context.next = 11;
                  break;
                }

                _context.t1 = null;

              case 11:
                etcdPassword = _context.t1;
                _context.next = 14;
                return _configuration.ConfigurationUtil.get('kumuluzee.discovery.etcd.ca');

              case 14:
                _context.t2 = _context.sent;

                if (_context.t2) {
                  _context.next = 17;
                  break;
                }

                _context.t2 = null;

              case 17:
                cert = _context.t2;
                sslContext = null;

                if (cert) {
                  cert = cert.replace(/\s+/g, '').replace('-----BEGINCERTIFICATE-----', '').replace('-----ENDCERTIFICATE-----', '');
                  decode = Buffer.from(cert, 'base64');
                  // TODO 509.x
                }

                etcdSecurityContext = null;


                if (etcdUsername && etcdUsername !== '' && etcdPassword && etcdPassword !== '') {
                  etcdSecurityContext = {
                    auth: {
                      user: etcdUsername,
                      pass: etcdPassword
                    }
                  };
                  if (sslContext) {
                    // TODO
                  }
                }
                _context.next = 24;
                return _configuration.ConfigurationUtil.get('kumuluzee.discovery.etcd.hosts');

              case 24:
                _context.t3 = _context.sent;

                if (_context.t3) {
                  _context.next = 27;
                  break;
                }

                _context.t3 = null;

              case 27:
                etcdUrls = _context.t3;

                if (!(etcdUrls && etcdUrls !== '')) {
                  _context.next = 55;
                  break;
                }

                splitedEtcdUrls = etcdUrls.split(',');
                etcdHosts = splitedEtcdUrls;


                if (etcdHosts.length % 2 === 0) {
                  console.error('Using an odd number of etcd hosts is recommended. See etcd documentation.');
                }

                if (etcdSecurityContext) {
                  this.etcd = new _nodeEtcd2.default(etcdHosts, etcdSecurityContext);
                } else {
                  this.etcd = new _nodeEtcd2.default(etcdHosts);
                }

                _context.next = 35;
                return _configuration.ConfigurationUtil.get('kumuluzee.discovery.resilience');

              case 35:
                _context.t4 = _context.sent;

                if (_context.t4) {
                  _context.next = 38;
                  break;
                }

                _context.t4 = true;

              case 38:
                this.resilience = _context.t4;
                _context.next = 41;
                return _InitializationUtils2.default.getStartRetryDelayMs(_configuration.ConfigurationUtil, 'etcd');

              case 41:
                this.startRetryDelay = _context.sent;
                _context.next = 44;
                return _InitializationUtils2.default.getMaxRetryDelayMs(_configuration.ConfigurationUtil, 'etcd');

              case 44:
                this.maxRetryDelay = _context.sent;
                _context.next = 47;
                return _configuration.ConfigurationUtil.get('kumuluzee.discovery.etcd.initial-retry-count');

              case 47:
                _context.t5 = _context.sent;

                if (_context.t5) {
                  _context.next = 50;
                  break;
                }

                _context.t5 = 1;

              case 50:
                initialRetryCount = _context.t5;


                this.initalRequestRetryPolicy = initialRetryCount;

                if (this.resilience) {
                  this.initalRequestRetryPolicy = 0;
                }
                _context.next = 56;
                break;

              case 55:
                console.error('No etcd server hosts provided. Specify hosts with configuration key ' + 'kumuluzee.discovery.etcd.hosts in format ' + 'http://192.168.99.100:2379,http://192.168.99.101:2379,http://192.168.99.102:2379');

              case 56:
                _context.next = 58;
                return _configuration.ConfigurationUtil.get('kumuluzee.discovery.cluster');

              case 58:
                _context.t6 = _context.sent;

                if (_context.t6) {
                  _context.next = 61;
                  break;
                }

                _context.t6 = null;

              case 61:
                this.clusterId = _context.t6;

              case 62:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'register',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(serviceName, version, environment, ttl, pingInterval, singleton) {
        var baseUrl, containerUrl, networkInterfaces, interfaceAddresses, servicePort, ipUrl, i, inetAddress, serviceConfiguration, registrator, handle;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _configuration.ConfigurationUtil.get('kumuluzee.server.base-url');

              case 2:
                _context2.t0 = _context2.sent;

                if (_context2.t0) {
                  _context2.next = 5;
                  break;
                }

                _context2.t0 = null;

              case 5:
                baseUrl = _context2.t0;

                if (baseUrl && baseUrl !== '') {
                  try {
                    baseUrl = new _url.URL(baseUrl);
                    baseUrl = baseUrl.href;
                  } catch (err) {
                    console.error('Cannot parse kumuluzee.base-url. Exception: ' + err);
                    baseUrl = null;
                  }
                }

                _context2.next = 9;
                return _configuration.ConfigurationUtil.get('kumuluzee.server.container-url');

              case 9:
                _context2.t1 = _context2.sent;

                if (_context2.t1) {
                  _context2.next = 12;
                  break;
                }

                _context2.t1 = null;

              case 12:
                containerUrl = _context2.t1;


                if (containerUrl) {
                  try {
                    containerUrl = new _url.URL(containerUrl);
                    containerUrl = containerUrl.href;
                  } catch (err) {
                    console.error('Cannot parse kumuluzee.container-url. Exception:  ' + err);
                    baseUrl = null;
                  }
                }

                if (!(this.clusterId || !baseUrl || baseUrl === '')) {
                  _context2.next = 41;
                  break;
                }

                // Try to find my ip adress
                networkInterfaces = _os2.default.networkInterfaces();
                interfaceAddresses = [];


                Object.keys(networkInterfaces).forEach(function (key) {
                  var addresses = networkInterfaces[key].filter(function (ia) {
                    return !ia.internal;
                  });
                  interfaceAddresses = interfaceAddresses.concat(addresses);
                });

                _context2.next = 20;
                return _configuration.ConfigurationUtil.get('kumuluzee.port');

              case 20:
                _context2.t2 = _context2.sent;

                if (_context2.t2) {
                  _context2.next = 23;
                  break;
                }

                _context2.t2 = 8080;

              case 23:
                servicePort = _context2.t2;
                ipUrl = null;


                for (i = 0; i < interfaceAddresses.length && !ipUrl; i++) {
                  inetAddress = interfaceAddresses[i];

                  try {
                    if (inetAddress.family === 'IPv4') {
                      ipUrl = new _url.URL('http://' + inetAddress.address + ':' + servicePort);
                    } else {
                      ipUrl = new _url.URL('http://[' + inetAddress.address + ']:' + servicePort);
                    }
                    ipUrl = ipUrl.href;
                  } catch (err) {
                    console.error('Cannot parse URL. Exception: ' + err);
                  }
                }

                if (this.clusterId) {
                  if (!containerUrl && ipUrl) {
                    containerUrl = ipUrl;
                  } else if (containerUrl == null) {
                    console.error('No container URL found, but running in container. All services will use service ' + 'URL. You can set container URL with configuration key kumuluzee.container-url');
                  }
                }

                if (!(!baseUrl || baseUrl !== '')) {
                  _context2.next = 35;
                  break;
                }

                if (!ipUrl) {
                  _context2.next = 33;
                  break;
                }

                console.error('No service URL provided, using URL ' + ipUrl + '. You should probably set service URL with configuration key kumuluzee.server.base-url');
                baseUrl = ipUrl;
                _context2.next = 35;
                break;

              case 33:
                console.error('No service URL provided or found. Set service URL with configuration key kumuluzee.server.base-url');
                return _context2.abrupt('return');

              case 35:
                serviceConfiguration = new _EtcdServiceConfiguration2.default(serviceName, environment, version, ttl, singleton, baseUrl, containerUrl, this.clusterId, this.startRetryDelay, this.maxRetryDelay);


                this.registeredServices.push(serviceConfiguration);

                registrator = new _EtcdRegistrator2.default(this.etcd, serviceConfiguration, this.resilience);


                registrator.run();
                handle = setInterval(function () {
                  return registrator.run();
                }, pingInterval * 1000);


                this.registratorHandles.push(handle);

              case 41:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function register(_x, _x2, _x3, _x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: 'deregister',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.etcd) {
                  this.registeredServices.forEach(function (serviceConfiguration) {
                    console.info('Deregistering service with etcd. Service name: ' + serviceConfiguration.serviceName + ' Service ID: ' + serviceConfiguration.serviceKeyUrl);
                    try {
                      var response = _this.etcd.delSync(serviceConfiguration.serviceKeyUrl, { maxRetries: 1 });

                      if (response.err) {
                        // console.error(`Cannot deregister service. Error: ${response.err}`);
                      }
                    } catch (err) {
                      console.error('Exception when trying to deregister service. Error: ' + err);
                    }
                  });
                  this.registratorHandles.forEach(function (handle) {
                    clearInterval(handle);
                  });
                }

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deregister() {
        return _ref3.apply(this, arguments);
      }

      return deregister;
    }()
  }, {
    key: 'getServiceInstances',
    value: function getServiceInstances(serviceName, version, environment, accessType) {
      var _this2 = this;

      version = _CommonUtil2.default.determineVersion(this, serviceName, version, environment);
      if (!this.serviceInstances.has(serviceName + '_' + version + '_' + environment)) {
        var etcdKeysResponseWhole = (0, _EtcdUtils.getEtcdDir)(this.etcd, (0, _EtcdUtils.getServiceKeyInstances)(environment, serviceName, version), this.initalRequestRetryPolicy, this.resilience);
        var etcdKeysResponse = etcdKeysResponseWhole.body;

        var serviceUrls = new Map();
        if (etcdKeysResponse) {
          etcdKeysResponse.node.nodes.forEach(function (node) {
            var url = null;
            var containerUrlString = null;
            var clusterId = null;
            var isActive = true;

            node.nodes.forEach(function (instanceNode) {
              var lastKeyLayer = (0, _EtcdUtils.getLastKeyLayer)(instanceNode.key);
              var value = node.value;


              if (lastKeyLayer === 'url' && value) url = value;
              if (lastKeyLayer === 'containerUrl' && value) containerUrlString = value;
              if (lastKeyLayer === 'clusterId' && value && value !== '') clusterId = value;
              if (lastKeyLayer === 'status' && value === 'disabled') isActive = false;
            });

            if (isActive && url) {
              try {
                var containerUrl = !containerUrlString || containerUrlString === '' ? null : new _url.URL(containerUrlString);
                serviceUrls.set(node.key + '/url', {
                  baseUrl: new _url.URL(url),
                  containerUrl: containerUrl,
                  clusterId: clusterId
                });
              } catch (err) {
                console.error('Malformed URL exception: ' + err);
              }
            }
          });

          this.serviceInstances.set(serviceName + '_' + version + '_' + environment, serviceUrls);

          if (!this.serviceVersions.has(serviceName + '_' + environment)) {
            // we are already watching all versions, no need to watch specific version
            this.watchServiceInstances((0, _EtcdUtils.getServiceKeyInstances)(environment, serviceName, version), parseInt(etcdKeysResponseWhole.headers['x-etcd-index'], 10) + 1);
          }
        }
      }
      var presentServices = this.serviceInstances.get(serviceName + '_' + version + '_' + environment);
      if ((!presentServices || presentServices.size === 0) && this.lastKnownServices.has(serviceName + '_' + version + '_' + environment)) {
        // if no services are present, use the last known service
        console.error('No instances of ' + serviceName + ' found, using last known service.');
        presentServices = new Map([[0, this.lastKnownServices.get(serviceName + '_' + version + '_' + environment)]]);
      }

      var instances = [];
      if (presentServices && presentServices.size > 0) {
        var gatewayUrl = this.getGatewayUrl(serviceName, version, environment);
        if (accessType === 'GATEWAY' && gatewayUrl) {
          instances.push(gatewayUrl);
        } else {
          presentServices.forEach(function (service) {
            if (_this2.clusterId && _this2.clusterId === service.clusterId) {
              instances.push(service.containerUrl);
            } else {
              instances.push(service.baseUrl);
            }
          });
        }
      }

      return instances;
    }
  }, {
    key: 'getServiceInstance',
    value: function getServiceInstance(serviceName, version, environment, accessType) {
      var optionalServiceInstances = this.getServiceInstances(serviceName, version, environment, accessType);

      return _CommonUtil2.default.pickServiceInstanceRoundRobin(optionalServiceInstances) || null;
    }
  }, {
    key: 'getGatewayUrl',
    value: function getGatewayUrl(serviceName, version, environment) {
      if (!this.gatewayUrls.has(serviceName + '_' + version + '_' + environment)) {
        var gatewayUrl = null;
        // let index = 0;

        try {
          var etcdKeysResponse = this.etcd.getSync(this.getGatewayKey(environment, serviceName, version), { maxRetries: this.initialRetryCount });

          if (etcdKeysResponse.err) {
            if (etcdKeysResponse.err.errorCode !== 100) {
              console.error('Etcd exception : ' + etcdKeysResponse.err);
            }
          } else {
            index = etcdKeysResponse.body.node.modifiedIndex;
            gatewayUrl = new _url.URL(etcdKeysResponse.body.node.value);
            this.gatewayUrls.set(serviceName + '_' + version + '_' + environment, gatewayUrl);
            // this.watchServiceInstances(this.getGatewayKey(environment,serviceName, version), index);

            return gatewayUrl;
          }
        } catch (err) {
          console.error('Malformed URL exception: ' + err);
        }
      } else {
        return this.gatewayUrls.get(serviceName + '_' + version + '_' + environment);
      }
    }
  }, {
    key: 'getServiceVersions',
    value: function getServiceVersions(serviceName, environment) {
      var _this3 = this;

      if (!this.serviceVersions.has(serviceName + '_' + environment)) {
        var etcdKeysResponseWhole = (0, _EtcdUtils.getEtcdDir)(this.etcd, this.getServiceKeyVersions(serviceName, environment), this.initalRequestRetryPolicy, this.resilience);

        var versions = [];
        var etcdKeysResponse = etcdKeysResponseWhole && etcdKeysResponseWhole.body;
        if (etcdKeysResponse) {
          var _loop = function _loop(i) {
            var versionNode = etcdKeysResponse.node.nodes[i];
            var version = (0, _EtcdUtils.getLastKeyLayer)(versionNode.key);

            var instanceParentNode = versionNode.nodes.filter(function (candidate) {
              return (0, _EtcdUtils.getLastKeyLayer)(candidate.key) === 'instances';
            });

            if (instanceParentNode.length === 0 || !instanceParentNode[0].nodes) return 'continue';

            var _instanceParentNode = instanceParentNode;

            var _instanceParentNode2 = _slicedToArray(_instanceParentNode, 1);

            instanceParentNode = _instanceParentNode2[0];

            var versionActive = false;

            instanceParentNode.nodes.forEach(function (instanceNode) {
              var url = null;
              var status = null;
              var containerUrlString = null;
              var clusterId = null;
              if (instanceNode.nodes) {
                instanceNode.nodes.forEach(function (node) {
                  var lastKeyLayer = (0, _EtcdUtils.getLastKeyLayer)(node.key);
                  var value = node.value;


                  if (lastKeyLayer === 'url' && value) url = value;
                  if (lastKeyLayer === 'containerUrl' && value) containerUrlString = value;
                  if (lastKeyLayer === 'clusterId' && value && value !== '') clusterId = value;
                  if (lastKeyLayer === 'status' && value && value !== '') status = value;
                });
              }
              if (url && status !== 'disabled') {
                try {
                  versionActive = true;
                  if (!_this3.serviceInstances.has(serviceName + '_' + version + '_' + environment)) {
                    _this3.serviceInstances.set(serviceName + '_' + version + '_' + environment, new Map());
                  }

                  var containerUrl = containerUrlString && containerUrlString !== '' ? new _url.URL(containerUrlString) : null;

                  var newUrl = new _url.URL(url);

                  _this3.serviceInstances.get(serviceName + '_' + version + '_' + environment).set(instanceNode.key + '/url', { baseUrl: newUrl, containerUrl: containerUrl, clusterId: clusterId });
                } catch (err) {
                  console.warn('Malformed URL exception: ' + err);
                }
              }
            });

            if (versionActive) {
              versions.push(version);
            }
          };

          for (var i = 0; i < etcdKeysResponse.node.nodes.length; i++) {
            var _ret = _loop(i);

            if (_ret === 'continue') continue;
          }

          this.serviceVersions.set(serviceName + '_' + environment, versions);
          this.watchServiceInstances(this.getServiceKeyVersions(serviceName, environment), parseInt(etcdKeysResponseWhole.headers['x-etcd-index'], 10) + 1);
        }
      }

      var presentVersions = this.serviceVersions.get(serviceName + '_' + environment);

      var lastKnownVersion = this.lastKnownVersions.get(serviceName + '_' + environment);

      if (lastKnownVersion && (!presentVersions || !presentVersions.includes(lastKnownVersion))) {
        // if present versions does not contain version of last known service, add it to the return object (copy)
        presentVersions = presentVersions.concat(lastKnownVersion);
      }

      return presentVersions;
    }
  }, {
    key: 'watchServiceInstances',
    value: function watchServiceInstances(key, index) {
      var _this4 = this;

      console.info('Initialising watch for key: ' + key);
      var currentRetryDelay = this.startRetryDelay;
      var errorIndex = 0;
      var callback = function callback(err, res, data) {
        var watch = function watch(modifiedIndex) {
          _this4.etcd.watch(key, { recursive: true, waitIndex: modifiedIndex + 1, maxRetries: 0 }, callback);
        };
        if (err || !res) {
          // Data with index is only given on first watch error.
          if (data) {
            errorIndex = parseInt(data['x-etcd-index']);
          }
          if (err) {
            console.error('Exception when waiting for changes: ' + err);
          }

          setTimeout(function () {
            return watch(errorIndex);
          }, currentRetryDelay);
          currentRetryDelay *= 2;
          if (currentRetryDelay > _this4.maxRetryDelay) {
            currentRetryDelay = _this4.maxRetryDelay;
          }
        } else {
          currentRetryDelay = _this4.startRetryDelay;

          var node = res.node;


          var nodeKey = node.key;
          var value = node.value;


          var serviceName = _this4.getServiceNameFromKey(nodeKey);
          var _version = _this4.getVersionFromKey(nodeKey);
          var environment = _this4.getEnvironmentFromKey(nodeKey);

          if (serviceName && _version && environment) {
            var lastKeyLayer = (0, _EtcdUtils.getLastKeyLayer)(nodeKey);
            if (lastKeyLayer === 'url') {
              if (!value) {
                console.info('Service instance deleted: ' + nodeKey);
                if (_this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).size === 1) {
                  // if removing last service, save it to separate buffer
                  // this service will be returned, if no other services are present
                  _this4.lastKnownServices.set(serviceName + '_' + _version + '_' + environment, _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).get(nodeKey));
                  _this4.lastKnownVersions.set(serviceName + '_' + environment, _version);
                }

                _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).delete(nodeKey);
              } else {
                console.info('Service instance added: ' + nodeKey + ' Value: ' + value);
                try {
                  if (!_this4.serviceInstances.has(serviceName + '_' + _version + '_' + environment)) {
                    _this4.serviceInstances.set(serviceName + '_' + _version + '_' + environment, new Map());
                  }

                  var etcd2Service = {
                    baseUrl: new _url.URL(value),
                    containerUrl: null,
                    clusterId: null
                  };

                  if (_this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).has(nodeKey)) {
                    etcd2Service.containerUrl = _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).get(nodeKey).containerUrl;
                    etcd2Service.containerUrl = _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).get(nodeKey).clusterId;
                  }
                  _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).set(nodeKey, etcd2Service);
                } catch (urlErr) {
                  log.severe('Malformed URL exception: ' + urlErr);
                }
              }
            }

            if (lastKeyLayer === 'containerUrl') {
              if (!value) {
                var service = _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).get(_this4.getKeyOneLayerUp(nodeKey) + 'url');
                if (service) {
                  console.info('Service container url deleted: ' + nodeKey);
                  service.containerUrl = null;
                  _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).set(_this4.getKeyOneLayerUp(nodeKey) + 'url', service);
                }
              } else {
                console.info('Service container url added: ' + nodeKey + ' Value: ' + value);
                try {
                  if (!_this4.serviceInstances.has(serviceName + '_' + _version + '_' + environment)) {
                    _this4.serviceInstances.set(serviceName + '_' + _version + '_' + environment, new Map());
                  }
                  var instanceMapKey = _this4.getKeyOneLayerUp(nodeKey) + 'url';
                  var _etcd2Service = {
                    baseUrl: null,
                    containerUrl: new _url.URL(value),
                    clusterId: null
                  };

                  if (_this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).has(instanceMapKey)) {
                    _etcd2Service.baseUrl = _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).get(instanceMapKey).baseUrl;
                    _etcd2Service.clusterId = _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).get(instanceMapKey).clusterId;
                  }

                  _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).set(instanceMapKey, _etcd2Service);
                } catch (urlErr) {
                  console.error('Malformed URL exception: ' + urlErr);
                }
              }
            }

            if (lastKeyLayer === 'clusterId') {
              if (!value) {
                var _service = _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).get(_this4.getKeyOneLayerUp(nodeKey) + 'url');
                if (_service) {
                  console.info('Service container id deleted ' + nodeKey);
                  _service.clusterId = null;
                  _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).set(_this4.getKeyOneLayerUp(nodeKey) + 'url', _service);
                }
              } else {
                console.info('Service container id added ' + nodeKey + ' Value: ' + value);

                if (!_this4.serviceInstances.has(serviceName + '_' + _version + '_' + environment)) {
                  _this4.serviceInstances.set(serviceName + '_' + _version + '_' + environment, new Map());
                }
                var _instanceMapKey = _this4.getKeyOneLayerUp(nodeKey) + 'url';
                var _etcd2Service2 = {
                  baseUrl: null,
                  containerUrl: null,
                  clusterId: new _url.URL(value)
                };

                if (_this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).has(_instanceMapKey)) {
                  _etcd2Service2.baseUrl = _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).get(_instanceMapKey).baseUrl;
                  _etcd2Service2.containerUrl = _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).get(_instanceMapKey).clusterId;
                }
                _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).set(_instanceMapKey, _etcd2Service2);
              }
            }

            if (lastKeyLayer === 'gatewayUrl') {
              if (!value && _this4.gatewayUrls.has(serviceName + '_' + _version + '_' + environment)) {
                console.info('Gateway URL deleted: ' + nodeKey);
                _this4.gatewayUrls.delete(serviceName + '_' + _version + '_' + environment);
              } else {
                console.info('Gateway URL added or modified: ' + nodeKey + ' Value: ' + value);

                var gatewayUrl = null;

                try {
                  gatewayUrl = new _url.URL(value);
                } catch (urlErr) {
                  console.error('Malformed URL exception: ' + urlErr);
                }

                _this4.gatewayUrls.set(serviceName + '_' + _version + '_' + environment, gatewayUrl);
              }
            }

            if (lastKeyLayer === 'status' && value === 'disabled') {
              console.info('Service instance disabled: ' + nodeKey);
              _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).delete(_this4.getKeyOneLayerUp(nodeKey) + 'url');
            }
            // Node's TTL expired
            if (res.action === 'expire' && _this4.serviceInstances.has(serviceName + '_' + _version + '_' + environment) && _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).has(nodeKey + '/url')) {
              console.info('Service instance TTL expired: ' + nodeKey);
              if (_this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).size === 1) {
                // if removing last service, save it to separate buffer
                // this service will be returned, if no other services are present
                _this4.lastKnownServices.set(serviceName + '_' + _version + '_' + environment, _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).get(nodeKey + '/url'));
                _this4.lastKnownVersions.set(serviceName + '_' + environment, _version);
              }
              _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).delete(nodeKey + '/url');
            }

            if (_this4.isKeyForVersions(key)) {
              if (_this4.serviceInstances.has(serviceName + '_' + _version + '_' + environment)) {
                var versions = _this4.serviceVersions.get(serviceName + '_' + environment);
                if (versions.includes(_version) && _this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).size === 0) {
                  // version was removed and no other instances of this version exist, remove version
                  versions = versions.filter(function (v) {
                    return v !== _version;
                  });

                  _this4.serviceVersions.set(serviceName + '_' + environment, versions);
                } else if (!versions.includes(_version) && (!_this4.serviceInstances.has(serviceName + '_' + _version + '_' + environment) || !_this4.serviceInstances.get(serviceName + '_' + _version + '_' + environment).size === 0)) {
                  versions.push(_version);
                  _this4.serviceVersions.set(serviceName + '_' + environment, versions);
                }
              }
            }
          }

          if (_this4.isKeyForVersions(key) || !_this4.serviceVersions.has(serviceName + '_' + environment)) {
            watch(res.node.modifiedIndex);
          }
        }
      };
      try {
        this.etcd.watch(key, { recursive: true, waitIndex: index, maxRetries: 0 }, callback);
      } catch (err) {
        console.error('Exception when watching key: ' + err);
      }
    }
  }, {
    key: 'disableServiceInstance',
    value: function disableServiceInstance(serviceName, version, environment, url) {
      var _this5 = this;

      var key = (0, _EtcdUtils.getServiceKeyInstances)(environment, serviceName, version);

      var etcdKeysResponseWhole = (0, _EtcdUtils.getEtcdDir)(this.etcd, key, 1, this.resilience);
      if (!etcdKeysResponseWhole.err) {
        var etcdKeysResponse = etcdKeysResponseWhole.body;
        etcdKeysResponse.node.nodes.forEach(function (instance) {
          if (instance.nodes) {
            instance.nodes.forEach(function (node) {
              if ((0, _EtcdUtils.getLastKeyLayer)(node.key) === 'url' && node.value === url) {
                console.info('Disabling service instance ' + instance.key);
                _this5.setEtcdKey(instance.key + '/status', 'disabled');
              }
            });
          }
        });
      }
    }
  }, {
    key: 'setEtcdKey',
    value: function setEtcdKey(key, value) {
      if (this.etcd) {
        var response = this.etcd.setSync(key, value);
        if (response.err) {
          if (this.resilience) {
            console.error('Timeout exception. Cannot set given key in specified time or retry-count constraints: ' + response.err);
          } else {
            throw new Error('Timeout exception. Cannot set given key in specified time or retry-count constraints: ' + response.err);
          }
        }
      } else {
        console.error('etcd not initialised');
      }
    }
  }, {
    key: 'isKeyForVersions',
    value: function isKeyForVersions(key) {
      return key.split('/').length === 5;
    }
  }, {
    key: 'getKeyOneLayerUp',
    value: function getKeyOneLayerUp(key) {
      key = key.split('/');
      var newKey = '';
      for (var ind = 0; ind < key.length - 1; ind++) {
        newKey = '' + newKey + key[ind] + '/';
      }
      return newKey;
    }
  }, {
    key: 'getServiceNameFromKey',
    value: function getServiceNameFromKey(key) {
      var splitted = key.split('/');
      return splitted.length < 4 ? null : splitted[4];
    }
  }, {
    key: 'getVersionFromKey',
    value: function getVersionFromKey(key) {
      var splitted = key.split('/');
      return splitted.length < 5 ? null : splitted[5];
    }
  }, {
    key: 'getEnvironmentFromKey',
    value: function getEnvironmentFromKey(key) {
      var splitted = key.split('/');
      return splitted.length < 2 ? null : splitted[2];
    }
  }, {
    key: 'getServiceKeyVersions',
    value: function getServiceKeyVersions(serviceName, environment) {
      return '/environments/' + environment + '/services/' + serviceName;
    }
  }, {
    key: 'getGatewayKey',
    value: function getGatewayKey(environment, serviceName, version) {
      return '/environments/' + environment + '/services/' + serviceName + '/' + version + '/gatewayUrl';
    }
  }]);

  return EtcdDiscoveryUtil;
}();

exports.default = new EtcdDiscoveryUtil();