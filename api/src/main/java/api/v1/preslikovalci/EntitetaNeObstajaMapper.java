package api.v1.preslikovalci;

import napake.EntitetaNeObstajaException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class EntitetaNeObstajaMapper implements ExceptionMapper<EntitetaNeObstajaException> {
	
	public Response toResponse(EntitetaNeObstajaException entitetaNeObstajaException) {
		Response.Status status = Response.Status.NOT_FOUND;
		MapperResponseObject obj = new MapperResponseObject(
				status.getStatusCode(),
				entitetaNeObstajaException.getMessage()
		);
		return Response.status(status).entity(obj).build();
	}
	
}
