package storitve;

import com.kumuluz.ee.rest.beans.QueryParameters;
import entitete.Vprasanje;
import napake.EntitetaNeObstajaException;
import repositories.VprasanjeRepository;
import zahteve.NovoVprasanjeZahteva;
import zahteve.PosodobiVprasanjeZahteva;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class VprasanjeStoritev {
	
	@Inject
	private VprasanjeRepository vprasanjeRepository;
	
	public List<Vprasanje> vrniVsaVprasanja(QueryParameters query) {
		return vprasanjeRepository.poisciVsaVprasanja(query);
	}
	
	public Vprasanje vrniEnoVprasanje(long id) throws EntitetaNeObstajaException {
		return vprasanjeRepository.poisciEnoVprasanje(id);
	}
	
	public Vprasanje shraniVprasanje(NovoVprasanjeZahteva req) {
		Vprasanje vprasanje = new Vprasanje(req.vprasanje);
		vprasanjeRepository.shraniVprasanje(vprasanje);
		return vprasanje;
	}
	
	public Vprasanje posodobiVprasanje(PosodobiVprasanjeZahteva zahteva) throws EntitetaNeObstajaException {
		Vprasanje vprasanje = vprasanjeRepository.poisciEnoVprasanje(zahteva.id);
		vprasanje.setVprasanje(zahteva.vprasanje);
		vprasanjeRepository.posodobiVprasanje(vprasanje, zahteva.id);
		return vprasanje;
	}
	
	public void izbrisiVprasanje(long id) throws EntitetaNeObstajaException {
		vprasanjeRepository.izbrisiVprasanje(id);
	}
	
}
