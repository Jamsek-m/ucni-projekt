// @flow
import express from 'express';

import KumuluzeeDiscovery from './modules/discovery/index.js';
import { restConfig } from './config';

const server = express();

const register = async () => {
    await KumuluzeeDiscovery.initialize({ extension: 'consul' });

    KumuluzeeDiscovery.registerService();
};

register();

server.get('/lookup', async (req, res) => {
    const resp = await KumuluzeeDiscovery.discoverService({
        value: 'customer-service', version: '^1.x.4', environment: 'dev', accessType: 'DIRECT',
    });
    res.status(200).json(resp);
});

server.get('/config', async (req, res) => {
    res.status(200).json(restConfig);
});

server.all('*', (req, res) => {
    res.status(404).json({
        message: 'This route does not exist!',
    });
});

server.listen(3000, () => {
    console.info('Service is listening on port 3000');
});
