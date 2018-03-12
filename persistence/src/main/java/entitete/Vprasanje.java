package entitete;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "vprasanja")
@NamedQueries({
	@NamedQuery(name = "Vprasanje.findOne", query = "SELECT v FROM Vprasanje v WHERE v.id = :id"),
	@NamedQuery(name = "Vprasanje.findAll", query = "SELECT v FROM Vprasanje v")
})
public class Vprasanje implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String vprasanje;
	
	@OneToMany(mappedBy = "vprasanje")
	private List<SeznamOdgovorov> seznamMoznihOdgovorov;
	
	@OneToMany(mappedBy = "vprasanje")
	private List<Odgovor> odgovori;
	
	public Vprasanje() {}
	
	public Vprasanje(String vprasanje) {
		this.vprasanje = vprasanje;
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getVprasanje() {
		return vprasanje;
	}
	
	public void setVprasanje(String vprasanje) {
		this.vprasanje = vprasanje;
	}
	
	public List<SeznamOdgovorov> getSeznamMoznihOdgovorov() {
		return seznamMoznihOdgovorov;
	}
	
	public void setSeznamMoznihOdgovorov(List<SeznamOdgovorov> seznamMoznihOdgovorov) {
		this.seznamMoznihOdgovorov = seznamMoznihOdgovorov;
	}
	
	public List<Odgovor> getOdgovori() {
		return odgovori;
	}
	
	public void setOdgovori(List<Odgovor> odgovori) {
		this.odgovori = odgovori;
	}
}
