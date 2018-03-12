package repositories;

import com.kumuluz.ee.rest.beans.QueryParameters;
import com.kumuluz.ee.rest.utils.JPAUtils;
import entitete.Odgovor;
import napake.EntitetaNeObstajaException;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@ApplicationScoped
public class OdgovorRepository {
	
	@PersistenceContext(unitName = "baza-jpa-unit")
	private EntityManager em;
	
	public List<Odgovor> poisciVseOdgovore(QueryParameters query) {
		return JPAUtils.queryEntities(em, Odgovor.class, query);
	}
	
	public Odgovor poisciEnOdgovor(long id) throws EntitetaNeObstajaException {
		Odgovor odgovor = em.find(Odgovor.class, id);
		if(odgovor == null) {
			throw new EntitetaNeObstajaException();
		}
		return odgovor;
	}
	
	public long prestejVseZadetke() {
		Query query = em.createNamedQuery("Odgovor.countAll");
		return (long) query.getSingleResult();
	}
	
	@Transactional
	public void shraniOdgovor(Odgovor odgovor) {
		em.persist(odgovor);
	}
	
	@Transactional
	public void posodobiOdgovor(Odgovor odgovor, long id) throws EntitetaNeObstajaException {
		Odgovor stariOdgovor = em.find(Odgovor.class, id);
		if(stariOdgovor == null) {
			throw new EntitetaNeObstajaException();
		}
		stariOdgovor.setOdgovor(odgovor.getOdgovor());
		stariOdgovor.setPosodobljenOb(new Date());
		stariOdgovor.setVprasanje(odgovor.getVprasanje());
		
		em.merge(stariOdgovor);
	}
	
	@Transactional
	public void izbrisiOdgovor(long id) throws EntitetaNeObstajaException {
		Odgovor odgovor = em.find(Odgovor.class, id);
		if(odgovor == null) {
			throw new EntitetaNeObstajaException();
		}
		em.remove(odgovor);
	}
	
}
