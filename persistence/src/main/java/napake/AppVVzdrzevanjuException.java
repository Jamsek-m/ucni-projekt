package napake;

import java.io.IOException;

public class AppVVzdrzevanjuException extends IOException {

    public AppVVzdrzevanjuException() {
        super("Service is currently in maintenance mode, try again later.");
    }
}
