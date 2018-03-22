export class MessageService {
    public static sporocila: string[] = ["Pozdravljen Svet!", "Hello World!", "Pozdravljen!"];

    public static pridobiSporocilo(callback): string {
        return callback(null, this.sporocila[Math.floor(Math.random() * this.sporocila.length)]);
    }

}
