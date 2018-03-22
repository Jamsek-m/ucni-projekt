# Kumuluzee Configuration and Discovery for Node.js

This is a repository for testing KumuluzEE Configuration and Discovery features.
* KumuluzEE Configuration for Node.js
* KumuluzEE Discovery for Node.js

# KumuluzEE Configuration for Node.js

This is a Node.js module based on a [KumuluzEE Configuration](https://github.com/kumuluz/kumuluzee-config).
This module supports configuration managment using etcd, Consul, environment variables and configuration files.

#### Configuring etcd

To connect to an etcd cluster, an odd number of etcd hosts must be specified with configuration key ```kumuluzee.config .etcd.hosts``` in format ```'http://192.168.99.100:2379,http://192.168.99.101:2379,http://192.168.99.102:2379'```.

Etcd can be configured to support user authentication and client-to-server transport security with HTTPS. To access authentication-enabled etcd host, username and password have to be defined with configuration keys ```kumuluzee.config.etcd.username``` and ```kumuluzee.config.etcd.password```. To enable transport security, follow https://coreos.com/etcd/docs/latest/op-guide/security.html To access HTTPS-enabled etcd host, PEM certificate string have to be defined with configuration key ```kumuluzee.config.etcd.ca```.

Sample configuration file:

```yaml
kumuluzee:
    config:
        start-retry-delay-ms: 500
        max-retry-delay-ms: 900000
        etcd:
            hosts: http://192.168.99.100:2379,http://192.168.99.101:2379,http://192.168.99.102:2379
            username: root
            password: admin
            ca: -----BEGIN CERTIFICATE-----
                MIIDDjCCAfagAwIBAgIUZzEIr206GOYqlxHLWtUUEu2ztvcwDQYJKoZIhvcNAQEL
                BQAwDTELMAkGA1UEAxMCQ0EwHhcNMTcwNDEwMDcyMDAwWhcNMjIwNDA5MDcyMDAw
                WjANMQswCQYDVQQDEwJDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
                AMKAeFREzc3wjOCQ8RlbnTJmD0PUls4HS6lV/xlRKbsNwqC3rxpoSp7lDoVy6MNr
                vX+7ZiyL05bkhWfF6Vzqqy6BVc6ock+nsIQyn1mXaTYDftue2z142KpjPLsj9YbP
                r2C5fmQk3rigQER95nT4gX3SleFENrnsmJU8bOt59b33uaYv6WLKUCInADITsQAN
                O8LiQ4scRwQXMFq0xORWdno9xPoRZOKMi5p+mIN0cGl9/+ComuqIcWomjKkWYK58
                Qhsy9jSaFYo6INMKLAjnmu5qY2Z7Hpf6iaVjgCayO8IXBWegspCTtZWZKOCpbO4A
                w3iH1eCz6VaG3F9FC1yWlh0CAwEAdaNmMGQwDgYDVR0PAQH/BAQDAgEGMBIGA1Ud
                EwEB/wQIMAYBAf8CAQIwHQYDeoklfBYEFBG6m7kZljsfFK2MTnQ5RWdM+mnDMB8G
                A1UdIwQYMBaAFBG6m7kZljsfFK2MTnQ5RWdM+mnDMA0GCSqGSIb3DQEBCwUAA4IB
                AQAT3tRmXGqt8Uh3Va0+Rlm4MDzcFsD7aO77tJuELCDC4cOCeROCEtYNJGm33MFe
                buxwaZ+zAneg5a1DtDkdjMZ6N+CVkMBTDWWm8cuo6Dm3HKWr+Rtd6Z8LwOq/X40C
                CHyowEYlYZSAof9rOHwn0rt8zgUSmZV6z9PXwFajwE2nEU7wlglYXtuLqBNzUYeN
                wYNnVFjMYtsWKgi/3nCegXastYGqoDpnAT25CsExrRuxAQw5i5WJU5RJwNsOPod5
                6X2Iz/EV5flbWti5OcoxLr3pfaCueLa71E+mPDKlWB55BXdNyHyS248msZC7UD2I
                Opyz239QjRq2HRMl+i7C0e6O
                -----END CERTIFICATE-----
```

#### Configuring Consul

By default, KumuluzEE Config Consul automatically connects to the local agent at ```http://localhost:8500```. This behaviour can be overridden by specifying agent URL with configuration key ```kumuluzee.config.consul.agent```.

##### Configuration source priorities

Included source acts as any other configuration source. It has the second highest priority, which means that properties from etcd override properties from configuration files and can be overwritten with properties from environmental variables.

##### Configuration properties inside etcd

Configuration properties are stored in etcd key/value store. 

Key names are automatically parsed from KumuluzEE to etcd format (e.g. `environments.dev.name` -> 
`environments/dev/name`).

Configuration properties are in etcd stored in a dedicated namespace, which is automatically generated from 
configuration keys `kumuluzee.env.name`, `kumuluzee.name` and `kumuluzee.version`. Example: `kumuluzee.env.name: dev`,
`kumuluzee.name: customer-service`, `kumuluzee.version: 1.2.3` is
mapped to namespace `environments/dev/services/customer-service/1.2.3/config`. If `kumuluzee.env.name` or
`kumuluzee.version` keys are not specified, defaults are used (`dev` and `1.0.0`). If `kumuluzee.name` is not
specified, namespace `environments/<environment>/services/config` is used. Automatic namespace generation can be
overwritten with key `kumuluzee.config.namespace`. Example:
`kumuluzee.config.namespace: environments/dev/services/config`.

Namespace is used as a first part of the key used for etcd key/value store. Example: with set `kumuluzee.env.name: dev`, 
field `port` from example bellow is in etcd stored in key `/environments/dev/services/test-service/config/port`.

##### Configuration properties inside Consul

Configuration properties in Consul are stored in a similar way as in etcd.
Since Consul uses the same format as etcd, key names are parsed in similar fashion.
KumuluzEE Config Consul also stores keys in automatically generated dedicated namespaces.
For more details, see section above.

## Usage

#### ConfigBundle(ConfigurationObject)

Creates a new object which will automatically load and hold our configuration properties.

#### ConfigurationObject

Object, needed for initialization of ConfigBundle. Possible properties:
* ```prefixKey``` (String, optional): value represents the prefix for the configuration properties keys ( This property can only be used on a first level of object!),
* ```name``` (String, optional): overrides field name used to form a configuration key,
* ```type``` (String): type of a field. Possible values: 'number', 'string', 'boolean', 'array' and 'object',
* ```watch```(Boolean, optional): to enable watch for this field( and all its subfields ) set value to true
* ```fields```(ConfigurationObject, optional): if type of current field is 'object' or 'array', fields represent nested values of object

#### ConfigBundle.initialize([{extension}])

Connects and populates values based on ```ConfigurationObject```. In orded to enable configuration for Consul provide ```consul``` as extension value or ```etcd``` if you want to use etcd as your configuration source.



#### ConfigurationUtil
Configuration can be retrieved the same way as in basic configuration framework.
Configuration properties can be accessed with ConfigurationUtil class. Example:

```
import { ConfigurationUtil } from './modules/configuration/index.js';
```
##### ConfigurationUtil.get(key)

Returnes value of a given `key`. Returned value is a Promise, so you need to `await` for retruned value.
```
const booleanProperty = await ConfigurationUtil.get('rest-config.boolean-property');
```

##### ConfigurationUtil.subscribe(key,callback)

If a watch is enabled on a certain key, we can subscribe to changes using `subscribe` function.

```javascript
ConfigurationUtil.subscribe(watchKey, (key, value) => {
  if (watchKey === key) {
    console.info(`New value for key ${key} is ${value}`);
  }
});
```
##### Example:

KumuluzEE configuration and custom configuration properties in ```config.yaml``` configuration file: 

```yaml
kumuluzee:
    name: customer-service
    version: 1.0.0
    env:
        name: dev
    config:
        start-retry-delay-ms: 500
        max-retry-delay-ms: 900000
        etcd:
            hosts: http://192.168.99.100:2379

rest-config:
    inti: 23
    boolean-property: true
    string-property: Monday
    nested-object:
        integer-property: 114
        arr:
          - first
          - second
          - third
          - fourth
```
`config.js`

```javascript
import ConfigBundle from './modules/configuration/index.js';

const kumuluzeeConfig = new ConfigBundle({
    "prefixKey": "rest-config",
    "type": "object",
    "fields": {
        "integerProperty": {
            "type": "number",
            "name": "inti"
        },
        "booleanProperty": {
            "type": "boolean",
            "watch": true
        },
        "stringProperty": {
            "type": "string"
        },
        "nestedObject": {
            "type": "object",
            "watch": true,
            "fields": {
                "integerProperty": {
                    "type": "number"
                },
                "arr": {
                    "type": "array"
                }
            }
        }
    }
});
```


When calling `kumuluzeeConfig.initialize()` the module will connect to configuration source and populate values. Fields with property `"watch": true` will watch for changes in etcd's key/value store. This will monitor the changes of this key in etcd and automatically update its value.
```javascript
kumuluzeeConfig.initialize({ extension: 'consul'});
```
We can modify a value to etcd with the following command:
```bash
$ docker exec etcd etcdctl --endpoints //192.168.99.100:2379 set /environments/dev/services/customer-service/1.0.0/config/rest-config/nested-object/integer-property 45
```

In the end our ConfigBundle object looks like this:

```json
{
    "integerProperty": 23,
    "booleanProperty": true,
    "stringProperty": "Monday",
    "nestedObject": {
        "integerProperty": 45,
        "arr": ["first", "second", "third", "fourth"]
    }
}
```


## KumuluzEE Discovery for Node.js

This is a Node.js module based on a [KumuluzEE Discovery](https://github.com/kumuluz/kumuluzee-discovery).

KumuluzEE Discovery is a service discovery extension for the KumuluzEE microservice framework. It provides support for service registration, service discovery and client side load balancing.

## Usage

```javascript
import KumuluzeeDiscovery from './modules/discovery/index.js';
```

#### KumuluzeeDiscovery.initialize({extension})

Using `initialize` function KumuluzeeDiscovery connects to given extension. Return value is a Promise, so you need to call `await` in order to wait for successful connection to given discovery source. Possible extenisons are `consul` and `etcd`.

```javascript
await KumuluzeeDiscovery.initialize({ extension: 'consul' });
```

#### KumuluzeeDiscovery.registerService(options)

Used for registration of service.


Possible options are:
* value (String): service name. Default value is fully classified class name. Service name can be overridden with configuration key `kumuluzee.service-name`.
* ttl (Integer, optional): time to live of a registration key in the store. Default value is 30 seconds. TTL can be overridden with configuration key `kumuluzee.discovery.ttl`.
* pingInterval (Integer, optional): an interval in which service updates registration key value in the store. Default value is 20. Ping interval can be overridden with configuration key `kumuluzee.discovery.ping-interval`.
* environment(String, optional): environment in which service is registered. Default value is "dev". Environment can be overridden with configuration key `kumuluzee.env.name`.
* version(String, optional): version of service to be registered. Default value is "1.0.0". Version can be overridden with configuration key `kumuluzee.version`.
* singleton(Boolean, optional):  if true ensures, that only one instance of service with the same name, version and environment is registered. Default value is false.


```javascript
KumuluzeeDiscovery.registerService({
    value: 'customer-service',
    ttl: 40,
    pingInterval: 20,
    environment: 'test',
    version: '1.0.2',
    singleton: false,
  });
```

To register a service with etcd, service URL has to be provided with the configuration key `kumuluzee.server.base-url` in 
the following format:`http://localhost:8080`. Consul implementation uses agent's IP address for the URL of registered 
services, so this key is not used.

KumuluzEE Discovery supports registration of multiple different versions of a service in different environments. The 
environment can be set with the configuration key `kumuluzee.env.name`, the default value is `dev`. Service version can 
also be set with the configuration key `kumuluzee.version`, the default value is `1.0.0`. Configuration keys will 
override annotation values.

#### KumuluzeeDiscovery.discoverService(options)

Service can be discovered using `discoverService` function. Returned value is url of searched service.
Possible options:

* value: name of the service we want to discover.
* environment: service environment, e.g. prod, dev, test. If value is not provided, environment is set to the value 
defined with the configuration key `kumuluzee.env.name`. If the configuration key is not present, value is set to `dev`.
* version: service version or NPM version range. Default value is "*", which resolves to the highest deployed 
version.
- accessType: defines, which URL is returned. Supported values are `GATEWAY` and `DIRECT`.
Default is `GATEWAY`.

```javascript
const serviceUrl = await KumuluzeeDiscovery.discoverService({
    value: 'customer-service',
    version: '^1.x.4',
    environment: 'dev',
    accessType: 'GATEWAY',
})
```

If no service is found, empty array is returned.

Service discovery supports two access types:
- `GATEWAY` returns gateway URL, if it is present. If not, behavior is the same as with `DIRECT`.
- `DIRECT` always returns base URL or container URL.

If etcd implementation is used, gateway URL is read from etcd key-value store used for service discovery. It is stored
in key `/environments/'environment'/services/'serviceName'/'serviceVersion'/gatewayUrl` and is automatically updated, if 
value changes.

##### Using the last-known service

Etcd implementation improves resilience by saving the information of the last present service, before it gets deleted.
This means, that etcd discovery extension will return the URL of the last-known service, if no services are present in
the registry. When discovering the last-known service a warning is logged.

#### Cluster, cloud-native platforms and Kubernetes

KumuluzEE Discovery is fully compatible with clusters and cloud-native platforms. It has been extensively tested with Kubernetes.
If you are running your services in cluster (for example Kubernetes), you should specify the cluster id in the
configuration key `kumuluzee.discovery.cluster`. Cluster id should be the same for every service running in the same
cluster.

Services running in the same cluster will be discovered by their container IP. Services accessing your service from
outside the cluster will discover your service by its base url (`kumuluzee.server.base-url`).

Container IP is automatically acquired when you run the service. If you want to override it, you can do so by 
specifying configuration key `kumuluzee.container-url`.



## License

MIT
