export class DiscoveryConfig {
    public env: string;
    public imeStoritve: string;
    public verzija: string;

    constructor(env: string, ime: string, verzija: string) {
        this.env = env;
        this.imeStoritve = ime;
        this.verzija = verzija;
    }
}
