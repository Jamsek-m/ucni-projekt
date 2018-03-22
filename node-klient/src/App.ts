import * as bodyParser from "body-parser";
import * as express from "express";
import * as logger from "morgan";

import {KumuluzeeDiscovery} from "./lib/kumuluzee-config-discovery/modules/discovery/index";
import IndexRouter from "./routes/IndexRouter";
import MessageRouter from "./routes/MessageRouter";

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.registerService();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes(): void {
        const router = express.Router();

        this.express.use("/vprasanja", IndexRouter);
        this.express.use("/api/v1/sporocila", MessageRouter);
    }

    private async registerService() {
        await KumuluzeeDiscovery.initialize({extension: "etcd"});
        KumuluzeeDiscovery.registerService();
    }

}

export default new App().express;
