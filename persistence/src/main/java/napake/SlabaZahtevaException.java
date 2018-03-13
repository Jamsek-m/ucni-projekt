package napake;

public class SlabaZahtevaException extends Exception {

    public SlabaZahtevaException() {
        super("Slaba zahteva! Poslani podatki ne ustrezajo formatu.");
    }

    public SlabaZahtevaException(String message) {
        super(message);
    }
}
