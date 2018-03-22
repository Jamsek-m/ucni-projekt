package api.v1.filtri;

import config.RestConfigProps;
import napake.AppVVzdrzevanjuException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
@ApplicationScoped
public class MaintenanceModeFilter implements ContainerRequestFilter {

    @Inject
    private RestConfigProps restConfigProps;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        if (restConfigProps.getMaintenanceMode()) {
            throw new AppVVzdrzevanjuException();
        }
    }
}
