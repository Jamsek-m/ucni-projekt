package api.v1.viri;

import api.v1.preslikovalci.MapperResponseObject;
import com.kumuluz.ee.rest.beans.QueryParameters;
import entitete.Odgovor;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import napake.EntitetaNeObstajaException;
import napake.SlabaZahtevaException;
import responses.vprasanje.FindAllResponse;
import storitve.OdgovorStoritev;
import zahteve.odgovor.NovOdgovorZahteva;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.List;

@ApplicationScoped
@Path("odgovori")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class OdgovorVir {
	
	@Inject
	private OdgovorStoritev odgovorStoritev;
	
	@Context
	private UriInfo uriInfo;
	
	@Operation(
		summary = "Pridobi seznam odgovorov",
		tags = {"odgovor"},
		description = "Vrne vse odgovore na vprašanja",
		responses = {
			@ApiResponse(
				description = "Seznam odgovorov", responseCode = "200",
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
		List<Odgovor> seznam = odgovorStoritev.vrniVseOdgovore(query);
		long steviloVsehZadetkov = odgovorStoritev.prestejVseZadetke();
		FindAllResponse res = new FindAllResponse(seznam, steviloVsehZadetkov, query);
		return Response.status(Response.Status.OK).entity(res).build();
	}

	@Operation(
		summary = "Pridobi odgovor",
		tags = {"odgovor"},
		description = "Vrne odgovor z podanim id-jem",
		responses = {
			@ApiResponse(
				description = "Odgovor z podanim id-jem", responseCode = "200",
				content = @Content(
					schema = @Schema(
						implementation = Odgovor.class
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
		Odgovor odgovor = odgovorStoritev.vrniEnOdgovor(id);
		return Response.status(Response.Status.OK).entity(odgovor).build();
	}

	@Operation(
		summary = "shrani odgovor",
		tags = {"odgovor"},
		description = "Shrani odgovor",
		responses = {
			@ApiResponse(
				description = "Odgovor je shranjen", responseCode = "201",
				content = @Content(
					schema = @Schema(
						implementation = Odgovor.class
					)
				)
			)
		}
	)
	@POST
	public Response shrani(NovOdgovorZahteva zahteva) throws EntitetaNeObstajaException, SlabaZahtevaException {
		if(zahteva.idVprasanja == 0 || zahteva.odgovor == 0) {
			throw new SlabaZahtevaException();
		}
		Odgovor odgovor = odgovorStoritev.shraniOdgovor(zahteva);
		return Response.status(Response.Status.CREATED).entity(odgovor).build();
	}

	@Operation(
		summary = "posodobi odgovor",
		tags = {"odgovor"},
		description = "Posodobi odgovor",
		responses = {
			@ApiResponse(
				description = "Odgovor je posodobljen", responseCode = "200",
				content = @Content(
					schema = @Schema(
						implementation = Odgovor.class
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
	public Response posodobi(NovOdgovorZahteva zahteva, @PathParam("id") long id)
		throws EntitetaNeObstajaException, SlabaZahtevaException {
			if(zahteva.idVprasanja == 0 || zahteva.odgovor == 0) {
				throw new SlabaZahtevaException();
			}
			Odgovor odgovor = odgovorStoritev.posodobiOdgovor(zahteva, id);
			return Response.status(Response.Status.OK).entity(odgovor).build();
	}

	@Operation(
		summary = "izbriše odgovor",
		tags = {"odgovor"},
		description = "Izbriši odgovor",
		responses = {
			@ApiResponse(
				description = "Odgovor je izbrisan", responseCode = "204"
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
		odgovorStoritev.izbrisiOdgovor(id);
		return Response.status(Response.Status.NO_CONTENT).build();
	}
}
