package api.v1.viri;

import api.v1.config.RestConfigProps;
import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.Histogram;
import org.eclipse.microprofile.metrics.Meter;
import org.eclipse.microprofile.metrics.MetricUnits;
import org.eclipse.microprofile.metrics.annotation.Gauge;
import org.eclipse.microprofile.metrics.annotation.Metric;
import org.eclipse.microprofile.metrics.annotation.Timed;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@ApplicationScoped
@Path("/config")
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
public class ConfigVir {

    @Inject
    private RestConfigProps restConfigProps;

    @Inject
    @Metric(name = "config_counter")
    private Counter stevec;

    @Inject
    @Metric(name = "avg_param_length")
    private Histogram histogram;

    @Inject
    @Metric(name = "add_meter")
    private Meter addMeter;


    @GET
    @Timed(name = "config_read_timer")
    public Response get() {
        getCount();
        String s = String.format("1: %s, 2: %d\n", restConfigProps.getStringProperty(), restConfigProps.getIntegerProperty());
        return Response.status(Response.Status.OK).entity(s).build();
    }

    @GET
    @Path("metrike/{param}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response spremeniMetrike(@PathParam("param") String param) {
        stevec.inc();
        addMeter.mark();
        histogram.update(param.length());
        return Response.status(Response.Status.OK).entity(param).build();
    }

    @Gauge(name = "customer_count", unit = MetricUnits.NONE)
    private long getCount() {
        return 10;
    }



}
