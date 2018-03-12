package api.v1;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@OpenAPIDefinition(
		info = @Info(title = "VprasanjaApi", version = "v1.0"),
		servers = @Server(url = "http://localhost:8080/v1")
)
@ApplicationPath("/v1")
public class App extends Application {}