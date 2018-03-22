"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessageService_1 = require("../services/MessageService");
class MessageRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", this.getDailyMessage);
    }
    getDailyMessage(req, res, next) {
        MessageService_1.MessageService.pridobiSporocilo((err, sporocilo) => {
            if (!err) {
                res.status(200);
                res.json(sporocilo);
            }
            else {
                throw err;
            }
        });
    }
}
exports.MessageRouter = MessageRouter;
const indexRoutes = new MessageRouter().router;
exports.default = indexRoutes;
