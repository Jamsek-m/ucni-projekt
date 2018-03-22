package api.v1.viri;

import config.RestConfigProps;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;

@ApplicationScoped
@Path("config")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ConfigVir {

    @Inject
    private RestConfigProps restConfigProps;

    @GET
    public Response vrniConfig() {
        HashMap<String, Boolean> hash = new HashMap<>();
        hash.put("maintenance-mode", restConfigProps.getMaintenanceMode());
        return Response.status(Response.Status.OK).entity(hash).build();
    }

}
