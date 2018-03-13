// from: https://www.npmjs.com/package/nodejs-etcd
import * as Etcd from "nodejs-etcd";
import * as path from "path";
import { DiscoveryConfig } from "./DiscoveryConfig";

export class ServiceDiscovery {

    private static izberiServis(seznamServisov: string[]): string {
        const seznam = seznamServisov.map((item) => {
            const tabela = item.split("/");
            return tabela[tabela.length - 1];
        });
        // Mogoce se izbere tistega za najdaljsim expiration date
        return seznam[0];
    }

    private static izvleciUrlIzNodea(seznamServisov): string {
        let seznam = seznamServisov.filter((item) => {
            const tabela = item.key.split("/");
            return tabela[tabela.length - 1] === "url";
        });
        seznam = seznam.map((item) => {
            return item.value;
        });
        return seznam[0];
    }

    public etcdUrl: string;
    private etcd;

    constructor(url: string) {
        this.etcdUrl = url;
        this.etcd = new Etcd({url: this.etcdUrl});
    }

    public pridobiURLStoritve(config: DiscoveryConfig, callback): void {
        const POT = path.join("/", "environments", config.env, "services",
            config.imeStoritve, config.verzija, "instances");

        this.etcd.read({key: POT}, (napakaSeznama, odgovorSeznama, teloSeznama) => {
            if (napakaSeznama) {
                return callback(napakaSeznama);
            } else {
                const respSeznam = {
                    sporocilo: odgovorSeznama.statusMessage,
                    status: odgovorSeznama.statusCode,
                };
                if (respSeznam.status === 200) {
                    const teloOdgovora = JSON.parse(teloSeznama);
                    const seznamServisov = teloOdgovora.node.nodes.map((item) => item.key);
                    const instanca = ServiceDiscovery.izberiServis(seznamServisov);
                    const potStoritve = path.join(POT, instanca);

                    this.etcd.read({key: potStoritve}, (napaka, odgovor, telo) => {
                        if (napaka) {
                            return callback(napaka);
                        } else {
                            const resp = {
                                sporocilo: odgovor.statusMessage,
                                status: odgovor.statusCode,
                            };
                            if (resp.status === 200) {
                                const teloInstance = JSON.parse(telo);
                                const seznamInstanc = teloInstance.node.nodes;

                                const urlStoritve = ServiceDiscovery.izvleciUrlIzNodea(seznamInstanc);
                                return callback(null, urlStoritve);
                            } else if (resp.status === 404) {
                                return callback({
                                    napaka: `${resp.status} - Zahtevana storitev ne obstaja!`,
                                });
                            } else {
                                return callback({
                                    napaka: `Napaka s kodo: ${resp.status} in sporocilom: ${resp.sporocilo}`,
                                });
                            }
                        }
                    });
                } else if (respSeznam.status === 404) {
                    return callback({
                        napaka: `${respSeznam.status} - Zahtevana storitev ne obstaja!`,
                    });
                } else {
                    return callback({
                        napaka: `Napaka s kodo: ${respSeznam.status} in sporocilom: ${respSeznam.sporocilo}`,
                    });
                }
            }
        });
    }
}
