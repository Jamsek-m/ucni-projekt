"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* tslint:disable no-var-requires */
/* tslint:enable no-var-requires */
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
