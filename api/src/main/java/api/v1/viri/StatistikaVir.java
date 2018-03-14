package api.v1.viri;

import entitete.unmapped.StatistikaVprasanja;
import repositories.StatistikaRepository;
import storitve.VprasanjeStoritev;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@ApplicationScoped
@Path("statistika")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class StatistikaVir {

    @Inject
    private VprasanjeStoritev vprasanjeStoritev;

    @Inject
    private StatistikaRepository statistikaRepository;

    @GET
    @Path("{idVprasanja}")
    public Response pridobiStatistikoVprasanja(@PathParam("idVprasanja") long id) {
        List<StatistikaVprasanja> seznam = statistikaRepository.vrniStatistikoVprasanja(id);
        return Response.status(Response.Status.OK).entity(seznam).build();
    }


}
