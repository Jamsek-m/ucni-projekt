package storitve;

import com.kumuluz.ee.rest.beans.QueryParameters;
import entitete.Odgovor;
import napake.EntitetaNeObstajaException;
import repositories.OdgovorRepository;
import repositories.VprasanjeRepository;
import zahteve.odgovor.NovOdgovorZahteva;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class OdgovorStoritev {
	
	@Inject
	private OdgovorRepository odgovorRepository;
	
	@Inject
	private VprasanjeRepository vprasanjeRepository;
	
	public List<Odgovor> vrniVseOdgovore(QueryParameters query) {
		return odgovorRepository.poisciVseOdgovore(query);
	}
	
	public Odgovor vrniEnOdgovor(long id) throws EntitetaNeObstajaException {
		return odgovorRepository.poisciEnOdgovor(id);
	}
	
	public Odgovor shraniOdgovor(NovOdgovorZahteva req) {
		//TODO:
		return null;
	}
	
}
