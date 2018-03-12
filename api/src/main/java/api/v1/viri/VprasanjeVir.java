package api.v1.viri;

import com.kumuluz.ee.rest.beans.QueryParameters;
import entitete.Vprasanje;
import napake.EntitetaNeObstajaException;
import storitve.VprasanjeStoritev;
import zahteve.NovoVprasanjeZahteva;
import zahteve.PosodobiVprasanjeZahteva;

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
	
	@GET
	public Response vrniVsaVprasanja() {
		QueryParameters query = QueryParameters.query(uriInfo.getRequestUri().getQuery()).build();
		List<Vprasanje> vprasanja = vprasanjeStoritev.vrniVsaVprasanja(query);
		return Response.status(Response.Status.OK).entity(vprasanja).build();
	}
	
	@GET
	@Path("{id}")
	public Response vrniEnoVprasanje(@PathParam("id") long id) throws EntitetaNeObstajaException {
		Vprasanje vprasanje = vprasanjeStoritev.vrniEnoVprasanje(id);
		return Response.status(Response.Status.OK).entity(vprasanje).build();
	}
	
	@POST
	public Response kreirajNovoVprasanje(NovoVprasanjeZahteva zahteva) {
		Vprasanje vprasanje = vprasanjeStoritev.shraniVprasanje(zahteva);
		return Response.status(Response.Status.CREATED).entity(vprasanje).build();
	}
	
	@PUT
	@Path("{id}")
	public Response posodobiVprasanje(PosodobiVprasanjeZahteva zahteva, @PathParam("id") long id) throws EntitetaNeObstajaException {
		Vprasanje vprasanje = vprasanjeStoritev.posodobiVprasanje(zahteva);
		return Response.status(Response.Status.OK).entity(vprasanje).build();
	}
	
	@DELETE
	@Path("{id}")
	public Response izbrisiVprasanje(@PathParam("id") long id) throws EntitetaNeObstajaException {
		vprasanjeStoritev.izbrisiVprasanje(id);
		return Response.status(Response.Status.NO_CONTENT).build();
	}
	
}
