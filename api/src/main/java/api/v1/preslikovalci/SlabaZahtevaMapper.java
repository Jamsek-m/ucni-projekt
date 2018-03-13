package api.v1.preslikovalci;

import napake.SlabaZahtevaException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class SlabaZahtevaMapper implements ExceptionMapper<SlabaZahtevaException> {

    @Override
    public Response toResponse(SlabaZahtevaException exception) {
        Response.Status status = Response.Status.BAD_REQUEST;
        MapperResponseObject obj = new MapperResponseObject(
            status.getStatusCode(),
            exception.getMessage()
        );
        return Response.status(status).entity(obj).build();
    }
}
