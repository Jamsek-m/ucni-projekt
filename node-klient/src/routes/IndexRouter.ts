import {NextFunction, Request, Response, Router} from "express";
/* tslint:disable no-var-requires */
/* tslint:enable no-var-requires */
import * as Etcd from "nodejs-etcd";
import * as path from "path";
import { DiscoveryConfig } from "../lib/DiscoveryConfig";
import { ServiceDiscovery } from "../lib/ServiceDiscovery";
import { VprasanjeService } from "../services/VprasanjeService";

export class IndexRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get("/", this.getAll);
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        /*const config = new DiscoveryConfig("dev", "vprasanja-service", "1.0.0");
        const serviceDiscovery = new ServiceDiscovery("http://localhost:2379");
        serviceDiscovery.pridobiURLStoritve(config, (napaka, url) => {
            if (napaka) {
                res.json({napaka});
            } else {
                res.json({storitev: url});
            }
        });*/
        VprasanjeService.pridobiSeznamVprasanj((napaka, podatki) => {
            if (napaka) {
                res.json({napaka});
            } else {
                res.json({podatki});
            }
        });
    }

}

const indexRoutes = new IndexRouter().router;

export default indexRoutes;
