package entitete;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "vprasanja")
@NamedQueries({
	@NamedQuery(name = "Vprasanje.findOne", query = "SELECT v FROM Vprasanje v WHERE v.id = :id"),
	@NamedQuery(name = "Vprasanje.findAll", query = "SELECT v FROM Vprasanje v"),
	@NamedQuery(name = "Vprasanje.countAll", query = "SELECT COUNT(v.id) FROM Vprasanje v")
})
public class Vprasanje implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String vprasanje;
	
	@OneToMany(mappedBy = "vprasanje", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<MozenOdgovor> seznamMoznihOdgovorov;
	
	@OneToMany(mappedBy = "vprasanje", cascade = CascadeType.ALL, orphanRemoval = true)
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
	
	public List<MozenOdgovor> getSeznamMoznihOdgovorov() {
		return seznamMoznihOdgovorov;
	}
	
	public void setSeznamMoznihOdgovorov(List<MozenOdgovor> seznamMoznihOdgovorov) {
		this.seznamMoznihOdgovorov = seznamMoznihOdgovorov;
	}
	
	public List<Odgovor> getOdgovori() {
		return odgovori;
	}
	
	public void setOdgovori(List<Odgovor> odgovori) {
		this.odgovori = odgovori;
	}
}
