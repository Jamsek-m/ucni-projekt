package api.v1.viri;

import api.v1.config.RestConfigProps;
import com.kumuluz.ee.discovery.annotations.DiscoverService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URL;


@ApplicationScoped
@Path("/config")
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
public class ConfigVir {

    @Inject
    private RestConfigProps restConfigProps;

    @Inject
    @DiscoverService(value = "vprasanja-service", environment = "dev", version = "1.0.0")
    private String url;

    @GET
    public Response get() {
        String s = String.format("1: %s, 2: %d\n", restConfigProps.getStringProperty(), restConfigProps.getIntegerProperty());
        return Response.status(Response.Status.OK).entity(s).build();
    }

    @GET
    @Path("serv")
    public Response getServ() {
        System.err.println("Tuki sm");
        Client client = ClientBuilder.newClient();
        WebTarget base = client.target(url);
        WebTarget vprasanja = base.path("/v1/vprasanja");

        System.err.println("POT: " + vprasanja.getUri().toString());

        Response odgovor = vprasanja.request().get();
        Object resp = odgovor.getEntity();

        return Response.status(Response.Status.OK).entity(resp).build();
    }



}
