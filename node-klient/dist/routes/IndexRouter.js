"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VprasanjeService_1 = require("../services/VprasanjeService");
class IndexRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", this.getAll);
    }
    getAll(req, res, next) {
        /*const config = new DiscoveryConfig("dev", "vprasanja-service", "1.0.0");
        const serviceDiscovery = new ServiceDiscovery("http://localhost:2379");
        serviceDiscovery.pridobiURLStoritve(config, (napaka, url) => {
            if (napaka) {
                res.json({napaka});
            } else {
                res.json({storitev: url});
            }
        });*/
        VprasanjeService_1.VprasanjeService.pridobiSeznamVprasanj((napaka, podatki) => {
            if (napaka) {
                res.json({ napaka });
            }
            else {
                res.json({ podatki });
            }
        });
    }
}
exports.IndexRouter = IndexRouter;
const indexRoutes = new IndexRouter().router;
exports.default = indexRoutes;
