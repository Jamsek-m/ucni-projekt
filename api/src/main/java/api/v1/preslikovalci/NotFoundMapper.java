package api.v1.preslikovalci;

import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class NotFoundMapper implements ExceptionMapper<NotFoundException> {
    @Override
    public Response toResponse(NotFoundException exception) {
        Response.Status status = Response.Status.NOT_FOUND;
        MapperResponseObject obj = new MapperResponseObject(
            status.getStatusCode(),
            exception.getMessage()
        );
        return Response.status(status).entity(obj).build();
    }
}
