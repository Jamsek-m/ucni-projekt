"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageService {
    static pridobiSporocilo(callback) {
        return callback(null, this.sporocila[Math.floor(Math.random() * this.sporocila.length)]);
    }
}
MessageService.sporocila = ["Pozdravljen Svet!", "Hello World!", "Pozdravljen!"];
exports.MessageService = MessageService;
