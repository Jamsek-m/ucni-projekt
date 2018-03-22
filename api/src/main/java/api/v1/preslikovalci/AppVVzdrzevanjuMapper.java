package api.v1.preslikovalci;

import napake.AppVVzdrzevanjuException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class AppVVzdrzevanjuMapper implements ExceptionMapper<AppVVzdrzevanjuException> {

    @Override
    public Response toResponse(AppVVzdrzevanjuException exception) {
        Response.Status status = Response.Status.SERVICE_UNAVAILABLE;
        MapperResponseObject obj = new MapperResponseObject(
            status.getStatusCode(),
            exception.getMessage()
        );
        return Response.status(status).entity(obj).build();
    }

}
