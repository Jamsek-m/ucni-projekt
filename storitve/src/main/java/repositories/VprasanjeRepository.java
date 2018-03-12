package repositories;

import com.kumuluz.ee.rest.beans.QueryParameters;
import com.kumuluz.ee.rest.utils.JPAUtils;
import entitete.Vprasanje;
import napake.EntitetaNeObstajaException;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class VprasanjeRepository {
	
	@PersistenceContext(unitName = "baza-jpa-unit")
	private EntityManager em;
	
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
	
	@Transactional
	public void shraniVprasanje(Vprasanje vprasanje) {
		em.persist(vprasanje);
	}
	
	@Transactional
	public void izbrisiVprasanje(long vprasanjeId) throws EntitetaNeObstajaException {
		Vprasanje vprasanje = em.find(Vprasanje.class, vprasanjeId);
		if(vprasanje != null) {
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
