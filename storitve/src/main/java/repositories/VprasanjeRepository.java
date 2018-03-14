package repositories;

import com.kumuluz.ee.rest.beans.QueryParameters;
import com.kumuluz.ee.rest.utils.JPAUtils;
import entitete.MozenOdgovor;
import entitete.Odgovor;
import entitete.Vprasanje;
import napake.EntitetaNeObstajaException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Random;

@ApplicationScoped
public class VprasanjeRepository {
	
	@PersistenceContext(unitName = "baza-jpa-unit")
	private EntityManager em;

	@Inject
	private MozenOdgovorRepository mozenOdgovorRepository;

	@Inject
	private OdgovorRepository odgovorRepository;
	
	public List<Vprasanje> poisciVsaVprasanja(QueryParameters query) {
		return JPAUtils.queryEntities(em, Vprasanje.class, query);
	}
	
	public Vprasanje poisciEnoVprasanje(long vprasanjeId) throws EntitetaNeObstajaException {
		Vprasanje vprasanje = em.find(Vprasanje.class, vprasanjeId);
		if(vprasanje == null) {
			throw new EntitetaNeObstajaException();
		}
		return vprasanje;
	}

	public Vprasanje vrniEnoNakljucnoVprasanje() {
	    Query countQuery = em.createQuery("SELECT COUNT(v.id) FROM Vprasanje v");
	    long count = (long) countQuery.getSingleResult();

        Random random = new Random();
        int prviRez = random.nextInt((int) count);

        Query query = em.createQuery("SELECT v FROM Vprasanje v");
        query.setFirstResult(prviRez);
        query.setMaxResults(1);

        return (Vprasanje) query.getSingleResult();
    }
	
	public long vrniSteviloVsehZadetkov() {
		Query query = em.createNamedQuery("Vprasanje.countAll");
		return (Long) query.getSingleResult();
	}
	
	@Transactional
	public void shraniVprasanje(Vprasanje vprasanje) {
		em.persist(vprasanje);
	}
	
	@Transactional
	public void izbrisiVprasanje(long vprasanjeId) throws EntitetaNeObstajaException {
		Vprasanje vprasanje = em.find(Vprasanje.class, vprasanjeId);
		if(vprasanje != null) {
			for(MozenOdgovor odg : vprasanje.getSeznamMoznihOdgovorov()) {
				mozenOdgovorRepository.izbrisiMozenOdgovor(odg.getId());
			}
			for(Odgovor odg : vprasanje.getOdgovori()) {
				odgovorRepository.izbrisiOdgovor(odg.getId());
			}
			em.remove(vprasanje);
		} else {
			throw new EntitetaNeObstajaException();
		}
	}
	
	@Transactional
	public void posodobiVprasanje(Vprasanje vprasanje, long vprasanjeId) throws EntitetaNeObstajaException {
		Vprasanje staroVprasanje = em.find(Vprasanje.class, vprasanjeId);
		if(staroVprasanje == null) {
			throw new EntitetaNeObstajaException();
		}
		staroVprasanje.setOdgovori(vprasanje.getOdgovori());
		staroVprasanje.setVprasanje(vprasanje.getVprasanje());
		staroVprasanje.setSeznamMoznihOdgovorov(vprasanje.getSeznamMoznihOdgovorov());
		em.merge(staroVprasanje);
	}
	
}
