package repositories;

import com.kumuluz.ee.rest.beans.QueryParameters;
import com.kumuluz.ee.rest.utils.JPAUtils;
import entitete.MozenOdgovor;
import napake.EntitetaNeObstajaException;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class MozenOdgovorRepository {
	
	@PersistenceContext(unitName = "baza-jpa-unit")
	private EntityManager em;
	
	public List<MozenOdgovor> poisciVseMozneOdgovore(QueryParameters query) {
		return JPAUtils.queryEntities(em, MozenOdgovor.class, query);
	}
	
	public MozenOdgovor poisciEnOdgovor(long id) throws EntitetaNeObstajaException {
		MozenOdgovor odgovor = em.find(MozenOdgovor.class, id);
		if(odgovor == null) {
			throw new EntitetaNeObstajaException();
		}
		return odgovor;
	}
	
	public long prestejVseZadetke() {
		Query query = em.createNamedQuery("MozenOdgovor.countAll");
		return (long) query.getSingleResult();
	}
	
	public List<MozenOdgovor> poisciVseMozneOdgovoreVprasanja(long idVprasanja) {
		Query query = em.createQuery("SELECT so FROM MozenOdgovor so WHERE so.vprasanje.id = :id");
		query.setParameter("id", idVprasanja);
		return query.getResultList();
	}
	
	@Transactional
	public void shraniMozenOdgovor(MozenOdgovor odgovor) {
		em.persist(odgovor);
	}
	
	@Transactional
	public void posodobiMozenOdgovor(MozenOdgovor odgovor, long id) throws EntitetaNeObstajaException {
		MozenOdgovor mozenOdgovor = em.find(MozenOdgovor.class, id);
		if(mozenOdgovor == null) {
			throw new EntitetaNeObstajaException();
		}
		mozenOdgovor.setTipOdgovora(odgovor.getTipOdgovora());
		mozenOdgovor.setVprasanje(odgovor.getVprasanje());
		em.merge(mozenOdgovor);
	}
	
	@Transactional
	public void izbrisiMozenOdgovor(long id) throws EntitetaNeObstajaException {
		MozenOdgovor odgovor = em.find(MozenOdgovor.class, id);
		if(odgovor == null) {
			throw new EntitetaNeObstajaException();
		}
		em.remove(odgovor);
	}
}
