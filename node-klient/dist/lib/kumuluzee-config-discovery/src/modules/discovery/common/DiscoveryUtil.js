import ConsulDiscoveryUtil from 'modules/discovery/consul/ConsulDiscoveryUtil';
import EtcdDiscoveryUtil from 'modules/discovery/etcd/EtcdDiscoveryUtil';

class DiscoveryUtil {
  discoverySource = null;

  async initialize(extension) {
    if (extension === 'consul') {
      this.discoverySource = ConsulDiscoveryUtil;
    } else if (extension === 'etcd') {
      this.discoverySource = EtcdDiscoveryUtil;
    } else {
      console.error('Invalid extension');
    }

    await this.discoverySource.init();
  }

  async register(serviceName, version, environment, ttl, pingInterval, singleton) {
    this.discoverySource.register(serviceName, version, environment, ttl, pingInterval, singleton);

    // Application was interupted (Console)
    process.on('SIGINT', async () => {
      await this.deregister();
      process.exit();
    });

    // Application got signal to terminate (ex: Kubernetes)
    process.on('SIGTERM', async () => {
      await this.deregister();
      process.exit();
    });
  }

  async deregister() {
    await this.discoverySource.deregister();
  }

  getUrl(serviceName, version, environment = 'dev', accessType) {
    console.info(`Initializing field for service: ${serviceName} version: ${version} environment: ${environment}`);

    return this.discoverySource.getServiceInstance(serviceName, version, environment, accessType);
  }

  disableServiceInstance(serviceName, version, environment, url) {
    this.discoverySource.disableServiceInstance(serviceName, version, environment, url);
  }
}

export default new DiscoveryUtil();
