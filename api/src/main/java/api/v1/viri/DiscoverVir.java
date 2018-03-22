package api.v1.viri;

import com.kumuluz.ee.discovery.annotations.DiscoverService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

@RequestScoped
@Path("/discover")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DiscoverVir {

    @Inject
    @DiscoverService(value = "test-service", version = "1.0.0", environment = "dev")
    private Optional<WebTarget> urlStoritve;

    @GET
    public Response get() {
        WebTarget api = urlStoritve.get().path("/api");
        Response res = api.request().get();
        return Response.status(Response.Status.OK).entity(res.getEntity()).build();
    }
}
