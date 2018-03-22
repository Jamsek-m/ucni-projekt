package api.v1.viri;

import config.RestConfigProps;
import api.v1.preslikovalci.MapperResponseObject;
import com.kumuluz.ee.rest.beans.QueryParameters;
import entitete.MozenOdgovor;
import interceptorji.maintenancemode.NaVoljo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import napake.AppVVzdrzevanjuException;
import napake.EntitetaNeObstajaException;
import napake.SlabaZahtevaException;
import responses.vprasanje.FindAllResponse;
import storitve.MozenOdgovorStoritev;
import zahteve.mozenodgovor.NovMozenOdgovorZahteva;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.List;

@ApplicationScoped
@Path("mozni-odgovori")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MozenOdgovorVir {

    @Inject
    private MozenOdgovorStoritev mozenOdgovorStoritev;

    @Context
    private UriInfo uriInfo;

    @Operation(
        summary = "Pridobi seznam možnih odgovorov",
        tags = {"možni odgovor"},
        description = "Vrne seznam vseh možnih odgovorov",
        responses = {
            @ApiResponse(
                description = "Seznam možnih odgovorov", responseCode = "200",
                content = @Content(
                    schema = @Schema(
                        implementation = FindAllResponse.class
                    )
                ),
                headers = {@Header(name = "Seznam odgovorov", schema = @Schema(type = "FindAllResponse"))}
            )
        }
    )
    @GET
    public Response vrniVse() {
        QueryParameters query = QueryParameters.query(uriInfo.getRequestUri().getQuery()).build();
        List<MozenOdgovor> seznam = mozenOdgovorStoritev.vrniVseMozneOdgovore(query);
        long steviloVsehZadetkov = mozenOdgovorStoritev.prestejVseZadetke();
        FindAllResponse res = new FindAllResponse(seznam, steviloVsehZadetkov, query);
        return Response.status(Response.Status.OK).entity(res).build();
    }

    @Operation(
        summary = "Pridobi možne odgovore podanega vprašanja",
        tags = {"možni odgovor"},
        description = "Vrne možne odgovore vprašanja z podanim id-jem",
        responses = {
            @ApiResponse(
                description = "Možni odgovori vprašanja z podanim id-jem", responseCode = "200",
                content = @Content(
                    schema = @Schema(
                        implementation = MozenOdgovor.class
                    )
                ),
                headers = {@Header(name = "Seznam odgovorov", schema = @Schema(type = "List<MozenOdgovor>"))}
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
    @Path("vprasanje/{id}")
    public Response vrniVseOdVprasanja(@PathParam("id") long idVprasanja) {
        List<MozenOdgovor> seznam = mozenOdgovorStoritev.vrniVseMozneOdgovoreVprasanja(idVprasanja);
        return Response.status(Response.Status.OK).entity(seznam).build();
    }

    @Operation(
        summary = "Pridobi možen odgovor",
        tags = {"možni odgovor"},
        description = "Vrne možni odgovor z podanim id-jem",
        responses = {
            @ApiResponse(
                description = "Možni odgovor z podanim id-jem", responseCode = "200",
                content = @Content(
                    schema = @Schema(
                        implementation = MozenOdgovor.class
                    )
                )
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
    @Path("{id}")
    public Response vrniEnega(@PathParam("id") long id) throws EntitetaNeObstajaException {
        MozenOdgovor odgovor = mozenOdgovorStoritev.vrniEnMozenOdgovor(id);
        return Response.status(Response.Status.OK).entity(odgovor).build();
    }

    @Operation(
        summary = "Shrani možen odgovor",
        tags = {"možni odgovor"},
        description = "Shrani možen odgovor",
        responses = {
            @ApiResponse(
                description = "Možni odgovor je bil shranjen", responseCode = "201",
                content = @Content(
                    schema = @Schema(
                        implementation = MozenOdgovor.class
                    )
                )
            )
        }
    )
    @POST
    public Response kreirajNovega(NovMozenOdgovorZahteva zahteva)
        throws EntitetaNeObstajaException, SlabaZahtevaException {
        if (zahteva.odgovor.isEmpty() || zahteva.vprasanjeId == 0) {
            throw new SlabaZahtevaException();
        }
        MozenOdgovor odgovor = mozenOdgovorStoritev.shraniMozenOdgovor(zahteva);
        return Response.status(Response.Status.CREATED).entity(odgovor).build();
    }

    @Operation(
        summary = "Posodobi možen odgovor",
        tags = {"možni odgovor"},
        description = "Posodobi možen odgovor",
        responses = {
            @ApiResponse(
                description = "Možni odgovor je bil posodobljen", responseCode = "200",
                content = @Content(
                    schema = @Schema(
                        implementation = MozenOdgovor.class
                    )
                )
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
    @PUT
    @Path("{id}")
    public Response posodobi(NovMozenOdgovorZahteva zahteva, @PathParam("id") long id)
        throws EntitetaNeObstajaException, SlabaZahtevaException {
        if (zahteva.odgovor.isEmpty() || zahteva.vprasanjeId == 0) {
            throw new SlabaZahtevaException();
        }
        MozenOdgovor odgovor = mozenOdgovorStoritev.posodobiMozenOdgovor(zahteva, id);
        return Response.status(Response.Status.OK).entity(odgovor).build();
    }

    @Operation(
        summary = "Izbriši možen odgovor",
        tags = {"možni odgovor"},
        description = "Izbriši možen odgovor",
        responses = {
            @ApiResponse(
                description = "Možni odgovor je bil izbrisan", responseCode = "204"
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
    @DELETE
    @Path("{id}")
    public Response izbrisi(@PathParam("id") long id) throws EntitetaNeObstajaException {
        mozenOdgovorStoritev.izbrisiMozenOdgovor(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }

}
