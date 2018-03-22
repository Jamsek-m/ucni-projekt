"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const DiscoveryConfig_1 = require("../lib/DiscoveryConfig");
const ServiceDiscovery_1 = require("../lib/ServiceDiscovery");
class VprasanjeService {
    static pridobiSeznamVprasanj(callback) {
        const config = new DiscoveryConfig_1.DiscoveryConfig("dev", "vprasanja-service", "1.0.0");
        const serviceDiscovery = new ServiceDiscovery_1.ServiceDiscovery("http://159.122.178.28:30079");
        serviceDiscovery.pridobiURLStoritve(config, (napaka, urlStoritve) => {
            if (napaka) {
                return callback(napaka);
            }
            else {
                const url = `${urlStoritve}/v1/vprasanja`;
                request.get({ url, json: true }, (error, resp, body) => {
                    if (error) {
                        return callback(error);
                    }
                    else if (resp.statusCode === 200) {
                        return callback(null, body);
                    }
                    else {
                        return callback({
                            napaka: `${resp.statusCode} - ${resp.statusMessage ? resp.statusMessage : "Napaka"}`,
                        });
                    }
                });
            }
        });
    }
}
exports.VprasanjeService = VprasanjeService;
