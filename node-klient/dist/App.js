"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const index_1 = require("./lib/kumuluzee-config-discovery/build/modules/discovery/index");
const IndexRouter_1 = require("./routes/IndexRouter");
const MessageRouter_1 = require("./routes/MessageRouter");
class App {
    constructor() {
        this.express = express();
        this.registerService();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        const router = express.Router();
        this.express.use("/vprasanja", IndexRouter_1.default);
        this.express.use("/api/v1/sporocila", MessageRouter_1.default);
    }
    registerService() {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.KumuluzeeDiscovery.initialize({ extension: "etcd" });
            index_1.KumuluzeeDiscovery.registerService();
        });
    }
}
exports.default = new App().express;
