package storitve;

import com.kumuluz.ee.rest.beans.QueryParameters;
import entitete.MozenOdgovor;
import entitete.Odgovor;
import entitete.Vprasanje;
import napake.EntitetaNeObstajaException;
import repositories.MozenOdgovorRepository;
import repositories.OdgovorRepository;
import repositories.VprasanjeRepository;
import zahteve.odgovor.NovOdgovorZahteva;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Date;
import java.util.List;

@ApplicationScoped
public class OdgovorStoritev {
	
	@Inject
	private OdgovorRepository odgovorRepository;

	@Inject
	private MozenOdgovorRepository mozenOdgovorRepository;
	
	@Inject
	private VprasanjeRepository vprasanjeRepository;
	
	public List<Odgovor> vrniVseOdgovore(QueryParameters query) {
		return odgovorRepository.poisciVseOdgovore(query);
	}

	public List<Odgovor> vrniVseOdgovoreVprasanja(long idVprasanja) {
		return odgovorRepository.pridobiOdgovoreVprasanja(idVprasanja);
	}

	public Odgovor vrniEnOdgovor(long id) throws EntitetaNeObstajaException {
		return odgovorRepository.poisciEnOdgovor(id);
	}
	
	public long prestejVseZadetke() {
		return odgovorRepository.prestejVseZadetke();
	}
	
	public Odgovor shraniOdgovor(NovOdgovorZahteva req) throws EntitetaNeObstajaException {
		Odgovor odgovor = new Odgovor();
		Date datum = new Date();
		odgovor.setUstvarjenOb(datum);
		odgovor.setPosodobljenOb(datum);

		MozenOdgovor mozenOdgovor = mozenOdgovorRepository.poisciEnOdgovor(req.odgovor);
		odgovor.setOdgovor(mozenOdgovor.getTipOdgovora());

		Vprasanje vprasanje = vprasanjeRepository.poisciEnoVprasanje(req.idVprasanja);
		odgovor.setVprasanje(vprasanje);
		
		odgovorRepository.shraniOdgovor(odgovor);
		return odgovor;
	}
	
	public Odgovor posodobiOdgovor(NovOdgovorZahteva req, long id) throws EntitetaNeObstajaException {
		Odgovor odgovor = odgovorRepository.poisciEnOdgovor(id);
		odgovor.setPosodobljenOb(new Date());

		MozenOdgovor mozenOdgovor = mozenOdgovorRepository.poisciEnOdgovor(req.odgovor);
		odgovor.setOdgovor(mozenOdgovor.getTipOdgovora());

		Vprasanje vprasanje = vprasanjeRepository.poisciEnoVprasanje(req.idVprasanja);
		odgovor.setVprasanje(vprasanje);
		
		odgovorRepository.posodobiOdgovor(odgovor, id);
		return odgovor;
	}
	
	public void izbrisiOdgovor(long id) throws EntitetaNeObstajaException {
		odgovorRepository.izbrisiOdgovor(id);
	}
	
}
