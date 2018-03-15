package storitve;

import com.kumuluz.ee.rest.beans.QueryParameters;
import entitete.MozenOdgovor;
import entitete.Vprasanje;
import napake.EntitetaNeObstajaException;
import repositories.VprasanjeRepository;
import zahteve.mozenodgovor.NovMozenOdgovorZahteva;
import zahteve.vprasanje.NovoVprasanjeZahteva;
import zahteve.vprasanje.OdgovorNaVprasanjeRequest;
import zahteve.vprasanje.PosodobiVprasanjeZahteva;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class VprasanjeStoritev {

    @Inject
    private VprasanjeRepository vprasanjeRepository;

    @Inject
    private MozenOdgovorStoritev mozenOdgovorStoritev;

    public List<Vprasanje> vrniVsaVprasanja(QueryParameters query) {
        return vprasanjeRepository.poisciVsaVprasanja(query);
    }

    public Vprasanje vrniEnoVprasanje(long id) throws EntitetaNeObstajaException {
        return vprasanjeRepository.poisciEnoVprasanje(id);
    }

    public Vprasanje vrniNakljucnoVprasanje() {
        return vprasanjeRepository.vrniEnoNakljucnoVprasanje();
    }

    public long prestejVseZadetke() {
        return vprasanjeRepository.vrniSteviloVsehZadetkov();
    }

    public Vprasanje shraniVprasanje(NovoVprasanjeZahteva req) throws EntitetaNeObstajaException {
        Vprasanje vprasanje = new Vprasanje(req.vprasanje);
        vprasanjeRepository.shraniVprasanje(vprasanje);
        for (String mozniOdgovor : req.mozniOdgovori) {
            MozenOdgovor odg = new MozenOdgovor(mozniOdgovor, vprasanje);
            vprasanje.getSeznamMoznihOdgovorov().add(odg);
            mozenOdgovorStoritev.shraniMozenOdgovor(odg);
        }
        vprasanjeRepository.posodobiVprasanje(vprasanje, vprasanje.getId());
        return vprasanje;
    }

    public Vprasanje shraniVprasanje(Vprasanje vprasanje) {
        vprasanjeRepository.shraniVprasanje(vprasanje);
        return vprasanje;
    }

    public Vprasanje posodobiVprasanje(PosodobiVprasanjeZahteva zahteva) throws EntitetaNeObstajaException {
        Vprasanje vprasanje = vprasanjeRepository.poisciEnoVprasanje(zahteva.id);
        vprasanje.setVprasanje(zahteva.vprasanje);
        for (OdgovorNaVprasanjeRequest req : zahteva.mozniOdgovori) {
            if(req.id == 0) {
                MozenOdgovor mozenOdgovor = new MozenOdgovor(req.tipOdgovora, vprasanje);
                mozenOdgovorStoritev.shraniMozenOdgovor(mozenOdgovor);
                vprasanje.getSeznamMoznihOdgovorov().add(mozenOdgovor);
            } else {
                MozenOdgovor mozenOdgovor = mozenOdgovorStoritev.vrniEnMozenOdgovor(req.id);
                List<MozenOdgovor> seznam = new ArrayList<>(vprasanje.getSeznamMoznihOdgovorov());
                MozenOdgovor toDelete = null;
                for(MozenOdgovor mo : seznam) {
                    if(mozenOdgovor.getId() == mo.getId()) {
                        toDelete = mo;
                    }
                }
                seznam.remove(toDelete);
                seznam.add(mozenOdgovor);
                vprasanje.setSeznamMoznihOdgovorov(new ArrayList<>(seznam));
                mozenOdgovor.setTipOdgovora(req.tipOdgovora);

                mozenOdgovorStoritev.posodobiMozenOdgovor(mozenOdgovor);
            }
        }
        vprasanjeRepository.posodobiVprasanje(vprasanje, zahteva.id);

        return vprasanje;
    }

    public Vprasanje posodobiVprasanje(Vprasanje vprasanje) throws EntitetaNeObstajaException {
        vprasanjeRepository.posodobiVprasanje(vprasanje, vprasanje.getId());
        return vprasanje;

    }

    public void izbrisiVprasanje(long id) throws EntitetaNeObstajaException {
        vprasanjeRepository.izbrisiVprasanje(id);
    }

}
