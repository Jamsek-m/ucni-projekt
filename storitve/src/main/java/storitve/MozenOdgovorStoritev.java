package storitve;

import com.kumuluz.ee.rest.beans.QueryParameters;
import entitete.MozenOdgovor;
import entitete.Vprasanje;
import napake.EntitetaNeObstajaException;
import repositories.MozenOdgovorRepository;
import repositories.VprasanjeRepository;
import zahteve.mozenodgovor.NovMozenOdgovorZahteva;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.ext.ExceptionMapper;
import java.util.List;

@ApplicationScoped
public class MozenOdgovorStoritev {
	
	@Inject
	private MozenOdgovorRepository mozenOdgovorRepository;

	@Inject
	private VprasanjeRepository vprasanjeRepository;
	
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
		Vprasanje vprasanje = vprasanjeRepository.poisciEnoVprasanje(req.vprasanjeId);
		MozenOdgovor odgovor = new MozenOdgovor(req.odgovor, vprasanje);

		mozenOdgovorRepository.shraniMozenOdgovor(odgovor);

        vprasanje.getSeznamMoznihOdgovorov().add(odgovor);
        vprasanjeRepository.shraniVprasanje(vprasanje);

		return odgovor;
	}
	
	public MozenOdgovor posodobiMozenOdgovor(NovMozenOdgovorZahteva req, long idMoznegaOdgovora) throws EntitetaNeObstajaException {
		Vprasanje vprasanje = vprasanjeRepository.poisciEnoVprasanje(req.vprasanjeId);
		MozenOdgovor odgovor = mozenOdgovorRepository.poisciEnOdgovor(idMoznegaOdgovora);
		
		odgovor.setVprasanje(vprasanje);
		odgovor.setTipOdgovora(req.odgovor);
		
		mozenOdgovorRepository.posodobiMozenOdgovor(odgovor, odgovor.getId());

		return odgovor;
	}
	
	public void izbrisiMozenOdgovor(long id) throws EntitetaNeObstajaException {
		mozenOdgovorRepository.izbrisiMozenOdgovor(id);
	}
	
}
