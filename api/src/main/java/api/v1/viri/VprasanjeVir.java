package api.v1.viri;

import api.v1.preslikovalci.MapperResponseObject;
import com.kumuluz.ee.rest.beans.QueryParameters;
import entitete.Vprasanje;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import napake.EntitetaNeObstajaException;
import napake.SlabaZahtevaException;
import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.MetricUnits;
import org.eclipse.microprofile.metrics.annotation.Metered;
import org.eclipse.microprofile.metrics.annotation.Metric;
import responses.vprasanje.FindAllResponse;
import storitve.VprasanjeStoritev;
import zahteve.vprasanje.NovoVprasanjeZahteva;
import zahteve.vprasanje.PosodobiVprasanjeZahteva;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.List;

@ApplicationScoped
@Path("vprasanja")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class VprasanjeVir {
	
	@Inject
	private VprasanjeStoritev vprasanjeStoritev;
	
	@Context
	private UriInfo uriInfo;

    @Inject
    @Metric(name = "stevec_prikazanih_vprasanj")
    private Counter stevecPrikazanihVprasanj;

	@Operation(
		summary = "Pridobi seznam vprašanj",
		tags = {"vprašanje"},
		description = "Vrne vsa vprašanja",
		responses = {
			@ApiResponse(
				description = "Seznam vprašanj", responseCode = "200",
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
	public Response vrniVsaVprasanja() {
		QueryParameters query = QueryParameters.query(uriInfo.getRequestUri().getQuery()).build();
		List<Vprasanje> vprasanja = vprasanjeStoritev.vrniVsaVprasanja(query);
		long steviloVsehZadetkov = vprasanjeStoritev.prestejVseZadetke();
		
		FindAllResponse res = new FindAllResponse(vprasanja, steviloVsehZadetkov, query);
		return Response.status(Response.Status.OK).entity(res).build();
	}

	@Operation(
		summary = "Pridobi vprašanje",
		tags = {"vprašanje"},
		description = "Vrne vprašanje z podanim id-jem",
		responses = {
			@ApiResponse(
				description = "Vprašanje z podanim id-jem", responseCode = "200",
				content = @Content(
					schema = @Schema(
						implementation = Vprasanje.class
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
    @Metered(name = "stevec_zahtev_na_uro_vprasanj")
	public Response vrniEnoVprasanje(@PathParam("id") long id) throws EntitetaNeObstajaException {
		Vprasanje vprasanje = vprasanjeStoritev.vrniEnoVprasanje(id);
		stevecPrikazanihVprasanj.inc();
		return Response.status(Response.Status.OK).entity(vprasanje).build();
	}

	@Operation(
		summary = "Shrani vprašanje",
		tags = {"vprašanje"},
		description = "Shrani vprašanje",
		responses = {
			@ApiResponse(
				description = "Vprašanje je bilo shranjeno", responseCode = "201",
				content = @Content(
					schema = @Schema(
						implementation = Vprasanje.class
					)
				)
			)
		}
	)
	@POST
	public Response kreirajNovoVprasanje(NovoVprasanjeZahteva zahteva) throws SlabaZahtevaException {
		if(zahteva.vprasanje.isEmpty()) {
			throw new SlabaZahtevaException();
		}
		Vprasanje vprasanje = vprasanjeStoritev.shraniVprasanje(zahteva);
		return Response.status(Response.Status.CREATED).entity(vprasanje).build();
	}

	@Operation(
		summary = "Posodobi vprašanje",
		tags = {"vprašanje"},
		description = "Posodobi vprašanje",
		responses = {
			@ApiResponse(
				description = "Vprašanje je bilo posodobljeno", responseCode = "200",
				content = @Content(
					schema = @Schema(
						implementation = Vprasanje.class
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
	public Response posodobiVprasanje(PosodobiVprasanjeZahteva zahteva, @PathParam("id") long id)
		throws EntitetaNeObstajaException, SlabaZahtevaException {
			if(zahteva.vprasanje.isEmpty() || zahteva.id == 0) {
				throw new SlabaZahtevaException();
			}
			Vprasanje vprasanje = vprasanjeStoritev.posodobiVprasanje(zahteva);
			return Response.status(Response.Status.OK).entity(vprasanje).build();
	}

	@Operation(
		summary = "Izbriši vprašanje",
		tags = {"vprašanje"},
		description = "Izbriši vprašanje",
		responses = {
			@ApiResponse(
				description = "Vprašanje je bilo izbrisano", responseCode = "204"
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
	public Response izbrisiVprasanje(@PathParam("id") long id) throws EntitetaNeObstajaException {
		vprasanjeStoritev.izbrisiVprasanje(id);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

}
