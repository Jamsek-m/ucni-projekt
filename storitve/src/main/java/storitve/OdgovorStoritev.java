package storitve;

import com.kumuluz.ee.rest.beans.QueryParameters;
import entitete.MozenOdgovor;
import entitete.Odgovor;
import entitete.Vprasanje;
import napake.EntitetaNeObstajaException;
import repositories.OdgovorRepository;
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
	private MozenOdgovorStoritev mozenOdgovorStoritev;

	@Inject
	private VprasanjeStoritev vprasanjeStoritev;
	
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

		MozenOdgovor mozenOdgovor = mozenOdgovorStoritev.vrniEnMozenOdgovor(req.odgovor);
		odgovor.setOdgovor(mozenOdgovor.getTipOdgovora());

		Vprasanje vprasanje = vprasanjeStoritev.vrniEnoVprasanje(req.idVprasanja);
		odgovor.setVprasanje(vprasanje);
		vprasanje.getOdgovori().add(odgovor);

		vprasanjeStoritev.posodobiVprasanje(vprasanje);
		return odgovor;
	}

	public Odgovor shraniOdgovor(Odgovor odgovor) {
		Date datum = new Date();
		odgovor.setUstvarjenOb(datum);
		odgovor.setPosodobljenOb(datum);
		odgovorRepository.shraniOdgovor(odgovor);
		return odgovor;
	}
	
	public Odgovor posodobiOdgovor(NovOdgovorZahteva req, long id) throws EntitetaNeObstajaException {
		Odgovor odgovor = odgovorRepository.poisciEnOdgovor(id);
		odgovor.setPosodobljenOb(new Date());

		MozenOdgovor mozenOdgovor = mozenOdgovorStoritev.vrniEnMozenOdgovor(req.odgovor);
		odgovor.setOdgovor(mozenOdgovor.getTipOdgovora());

		Vprasanje vprasanje = vprasanjeStoritev.vrniEnoVprasanje(req.idVprasanja);
		odgovor.setVprasanje(vprasanje);
		
		odgovorRepository.posodobiOdgovor(odgovor, id);
		return odgovor;
	}

	public Odgovor posodobiOdgovor(Odgovor odgovor) throws EntitetaNeObstajaException {
		odgovor.setPosodobljenOb(new Date());
		odgovorRepository.posodobiOdgovor(odgovor, odgovor.getId());
		return odgovor;

	}
	
	public void izbrisiOdgovor(long id) throws EntitetaNeObstajaException {
		odgovorRepository.izbrisiOdgovor(id);
	}
	
}
