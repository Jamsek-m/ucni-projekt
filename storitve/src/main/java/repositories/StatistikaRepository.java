package repositories;

import entitete.Vprasanje;
import entitete.unmapped.StatistikaVprasanja;
import napake.EntitetaNeObstajaException;
import storitve.VprasanjeStoritev;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@ApplicationScoped
public class StatistikaRepository {

    @PersistenceContext(unitName = "baza-jpa-unit")
    private EntityManager em;

    @Inject
    private VprasanjeStoritev vprasanjeStoritev;

    public List<StatistikaVprasanja> vrniStatistikoVprasanja(long idVprasanja) throws EntitetaNeObstajaException {
        vprasanjeStoritev.vrniEnoVprasanje(idVprasanja);

        Query query = em.createQuery("SELECT NEW entitete.unmapped.StatistikaVprasanja(" +
            "COUNT(o.id), o.odgovor, " +
            "(SELECT COUNT(o2.id) FROM Odgovor o2 WHERE o2.vprasanje.id = :id_vprasanja)" +
            ") FROM Odgovor o WHERE o.vprasanje.id = :id_vprasanja GROUP BY o.odgovor");
        query.setParameter("id_vprasanja", idVprasanja);
        return query.getResultList();
    }
}
