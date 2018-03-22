package api.v1.viri;

import config.RestConfigProps;
import api.v1.preslikovalci.MapperResponseObject;
import entitete.unmapped.StatistikaVprasanja;
import interceptorji.maintenancemode.NaVoljo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import napake.AppVVzdrzevanjuException;
import napake.EntitetaNeObstajaException;
import repositories.StatistikaRepository;
import storitve.VprasanjeStoritev;

import javax.annotation.PostConstruct;
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
    private StatistikaRepository statistikaRepository;

    @Operation(
        summary = "Pridobi statistiko vprašanja",
        tags = {"statistika"},
        description = "Vrne statistiko vprašanja s podanim id-jem",
        responses = {
            @ApiResponse(
                description = "Statistika vprašanja z podanim id-jem", responseCode = "200",
                content = @Content(
                    schema = @Schema(
                        implementation = StatistikaVprasanja.class
                    )
                ),
                headers = {@Header(name = "Vrne statistiko",
                    schema = @Schema(type = "List<StatistikaVprasanja>")
                )}
            ),
            @ApiResponse(
                description = "Napaka - entiteta ne obstaja", responseCode = "404",
                content = @Content(
                    schema = @Schema(
                        implementation = MapperResponseObject.class
                    )
                )
            )
        }
    )
    @GET
    @Path("{idVprasanja}")
    public Response pridobiStatistikoVprasanja(@PathParam("idVprasanja") long id) throws EntitetaNeObstajaException {
        List<StatistikaVprasanja> seznam = statistikaRepository.vrniStatistikoVprasanja(id);
        return Response.status(Response.Status.OK).entity(seznam).build();
    }

}
