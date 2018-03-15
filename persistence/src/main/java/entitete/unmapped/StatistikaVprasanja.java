package entitete.unmapped;

public class StatistikaVprasanja {
    public long steviloOdgovorov;
    public String odgovor;
    public double procent;

    public StatistikaVprasanja() {}

    public StatistikaVprasanja(long steviloOdgovorov, String odgovor, long vsota) {
        this.steviloOdgovorov = steviloOdgovorov;
        this.odgovor = odgovor;
        this.procent = (double) steviloOdgovorov / (double) vsota;
    }
}
