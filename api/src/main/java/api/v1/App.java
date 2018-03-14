package api.v1;

import com.kumuluz.ee.cors.annotations.CrossOrigin;
import com.kumuluz.ee.discovery.annotations.RegisterService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@OpenAPIDefinition(
	info = @Info(title = "VprasanjaApi", version = "v1.0"),
	servers = @Server(url = "http://localhost:8080/v1")
)
@RegisterService(
    value = "vprasanja-service", ttl = 20, pingInterval = 15,
    environment = "dev", version = "1.0.0", singleton = false
)
@ApplicationPath("/v1")
@CrossOrigin(supportedMethods="GET, POST, PUT, DELETE")
public class App extends Application {}