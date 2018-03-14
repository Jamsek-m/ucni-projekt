package repositories;

import entitete.unmapped.StatistikaVprasanja;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@ApplicationScoped
public class StatistikaRepository {

    @PersistenceContext(unitName = "baza-jpa-unit")
    private EntityManager em;

    public List<StatistikaVprasanja> vrniStatistikoVprasanja(long idVprasanja) {
        Query query = em.createQuery("SELECT NEW entitete.unmapped.StatistikaVprasanja(COUNT(o.id), o.odgovor) " +
            "FROM Odgovor o WHERE o.vprasanje.id = :id_vprasanja GROUP BY o.odgovor");
        query.setParameter("id_vprasanja", idVprasanja);
        return query.getResultList();
    }
}
