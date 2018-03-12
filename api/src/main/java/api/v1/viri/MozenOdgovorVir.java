package api.v1.viri;

import com.kumuluz.ee.rest.beans.QueryParameters;
import entitete.MozenOdgovor;
import napake.EntitetaNeObstajaException;
import storitve.MozenOdgovorStoritev;
import zahteve.mozenodgovor.NovMozenOdgovorZahteva;

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
	
	@GET
	public Response vrniVse() {
		QueryParameters query = QueryParameters.query(uriInfo.getRequestUri().getQuery()).build();
		List<MozenOdgovor> seznam = mozenOdgovorStoritev.vrniVseMozneOdgovore(query);
		return Response.status(Response.Status.OK).entity(seznam).build();
	}
	
	@GET
	@Path("vprasanje/{id}")
	public Response vrniVseOdVprasanja(@PathParam("id") long idVprasanja) {
		List<MozenOdgovor> seznam = mozenOdgovorStoritev.vrniVseMozneOdgovoreVprasanja(idVprasanja);
		return Response.status(Response.Status.OK).entity(seznam).build();
	}
	
	@GET
	@Path("{id}")
	public Response vrniEnega(@PathParam("id") long id) throws EntitetaNeObstajaException {
		MozenOdgovor odgovor = mozenOdgovorStoritev.vrniEnMozenOdgovor(id);
		return Response.status(Response.Status.OK).entity(odgovor).build();
	}
	
	@POST
	public Response kreirajNovega(NovMozenOdgovorZahteva zahteva) throws EntitetaNeObstajaException {
		MozenOdgovor odgovor = mozenOdgovorStoritev.shraniMozenOdgovor(zahteva);
		return Response.status(Response.Status.CREATED).entity(odgovor).build();
	}
	
	@PUT
	@Path("{id}")
	public Response posodobi(NovMozenOdgovorZahteva zahteva, @PathParam("id") long id) throws EntitetaNeObstajaException {
		MozenOdgovor odgovor = mozenOdgovorStoritev.posodobiMozenOdgovor(zahteva, id);
		return Response.status(Response.Status.OK).entity(odgovor).build();
	}
	
	@DELETE
	@Path("{id}")
	public Response izbrisi(@PathParam("id") long id) throws EntitetaNeObstajaException {
		mozenOdgovorStoritev.izbrisiMozenOdgovor(id);
		return Response.status(Response.Status.NO_CONTENT).build();
	}
	
}
