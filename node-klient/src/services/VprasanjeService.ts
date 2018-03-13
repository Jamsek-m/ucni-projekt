import * as request from "request";
import { DiscoveryConfig } from "../lib/DiscoveryConfig";
import { ServiceDiscovery } from "../lib/ServiceDiscovery";

export class VprasanjeService {

    public static pridobiSeznamVprasanj(callback) {
        const config = new DiscoveryConfig("dev", "vprasanja-service", "1.0.0");
        const serviceDiscovery = new ServiceDiscovery("http://localhost:2379");
        serviceDiscovery.pridobiURLStoritve(config, (napaka, urlStoritve) => {
            if (napaka) {
                return callback(napaka);
            } else {
                const url = `${urlStoritve}/v1/vprasanja`;
                request.get({url, json: true}, (error, resp, body) => {
                    if (error) {
                        return callback(error);
                    } else if (resp.statusCode === 200) {
                        return callback(null, body);
                    } else {
                        return callback(
                            {napaka: `${resp.statusCode} - ${resp.statusMessage ? resp.statusMessage : "Napaka"}`,
                        });
                    }
                });
            }
        });
    }

}
