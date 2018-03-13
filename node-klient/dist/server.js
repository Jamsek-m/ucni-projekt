"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable no-var-requires */
const debug = require("debug")("tstest:server");
/* tslint:enable no-var-requires */
const http = require("http");
const App_1 = require("./App");
const port = normalizePort(8081);
App_1.default.set("port", port);
const server = http.createServer(App_1.default);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
function normalizePort(val) {
    const setPort = (typeof val === "string") ? parseInt(val, 10) : val;
    if (isNaN(setPort)) {
        return val;
    }
    else if (setPort >= 0) {
        return setPort;
    }
    else {
        return false;
    }
}
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
