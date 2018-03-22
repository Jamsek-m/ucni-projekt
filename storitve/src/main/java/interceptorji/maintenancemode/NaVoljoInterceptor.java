package interceptorji.maintenancemode;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.xml.ws.Response;

import config.*;
import napake.AppVVzdrzevanjuException;

@Interceptor
@NaVoljo
public class NaVoljoInterceptor {

    @Inject
    private RestConfigProps restConfigProps;

    @AroundInvoke
    public Object preveriMaintenanceMode(InvocationContext context) throws Exception {
        if (restConfigProps.getMaintenanceMode()) {


            System.err.println("Aplikacija je v vzdrzevanju!");

            throw new AppVVzdrzevanjuException();
        }
        return context.proceed();
    }

}
