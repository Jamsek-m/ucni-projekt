package storitve;

import com.kumuluz.ee.rest.beans.QueryParameters;
import entitete.MozenOdgovor;
import entitete.Vprasanje;
import napake.EntitetaNeObstajaException;
import repositories.MozenOdgovorRepository;
import zahteve.mozenodgovor.NovMozenOdgovorZahteva;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class MozenOdgovorStoritev {
	
	@Inject
	private MozenOdgovorRepository mozenOdgovorRepository;

	@Inject
	private VprasanjeStoritev vprasanjeStoritev;
	
	public List<MozenOdgovor> vrniVseMozneOdgovore(QueryParameters query) {
		return mozenOdgovorRepository.poisciVseMozneOdgovore(query);
	}
	
	public List<MozenOdgovor> vrniVseMozneOdgovoreVprasanja(long idVprasanja) {
		return mozenOdgovorRepository.poisciVseMozneOdgovoreVprasanja(idVprasanja);
	}
	
	public MozenOdgovor vrniEnMozenOdgovor(long id) throws EntitetaNeObstajaException {
		return mozenOdgovorRepository.poisciEnOdgovor(id);
	}
	
	public long prestejVseZadetke() {
		return mozenOdgovorRepository.prestejVseZadetke();
	}
	
	public MozenOdgovor shraniMozenOdgovor(NovMozenOdgovorZahteva req) throws EntitetaNeObstajaException {
		Vprasanje vprasanje = vprasanjeStoritev.vrniEnoVprasanje(req.vprasanjeId);
		MozenOdgovor odgovor = new MozenOdgovor(req.odgovor, vprasanje);

		mozenOdgovorRepository.shraniMozenOdgovor(odgovor);

        vprasanje.getSeznamMoznihOdgovorov().add(odgovor);
        vprasanjeStoritev.shraniVprasanje(vprasanje);

		return odgovor;
	}

	public MozenOdgovor shraniMozenOdgovor(MozenOdgovor odgovor) throws EntitetaNeObstajaException {
		mozenOdgovorRepository.shraniMozenOdgovor(odgovor);
		return odgovor;
	}
	
	public MozenOdgovor posodobiMozenOdgovor(NovMozenOdgovorZahteva req, long idMoznegaOdgovora) throws EntitetaNeObstajaException {
		Vprasanje vprasanje = vprasanjeStoritev.vrniEnoVprasanje(req.vprasanjeId);
		MozenOdgovor odgovor = mozenOdgovorRepository.poisciEnOdgovor(idMoznegaOdgovora);
		
		odgovor.setVprasanje(vprasanje);
		odgovor.setTipOdgovora(req.odgovor);
		
		mozenOdgovorRepository.posodobiMozenOdgovor(odgovor, odgovor.getId());

		return odgovor;
	}

	public MozenOdgovor posodobiMozenOdgovor(MozenOdgovor odgovor) throws EntitetaNeObstajaException {
		mozenOdgovorRepository.posodobiMozenOdgovor(odgovor, odgovor.getId());
		return odgovor;
	}
	
	public void izbrisiMozenOdgovor(long id) throws EntitetaNeObstajaException {
		MozenOdgovor odgovor = mozenOdgovorRepository.poisciEnOdgovor(id);

		Vprasanje vprasanje = vprasanjeStoritev.vrniEnoVprasanje(odgovor.getVprasanje().getId());

		List<MozenOdgovor> seznam = new ArrayList<>(vprasanje.getSeznamMoznihOdgovorov());
		MozenOdgovor toDelete = null;
		for (MozenOdgovor mozenOdgovor : seznam) {
			if (mozenOdgovor.getId() == odgovor.getId()) {
				toDelete = mozenOdgovor;
			}
		}
		seznam.remove(toDelete);
		vprasanje.setSeznamMoznihOdgovorov(new ArrayList<>(seznam));

		mozenOdgovorRepository.izbrisiMozenOdgovor(id);
		vprasanjeStoritev.posodobiVprasanje(vprasanje);
	}
	
}
