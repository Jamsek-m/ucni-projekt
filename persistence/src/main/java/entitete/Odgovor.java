package entitete;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "odgovori")
@NamedQueries({
	@NamedQuery(name = "Odgovor.findOne", query = "SELECT o FROM Odgovor o WHERE o.id = :id"),
	@NamedQuery(name = "Odgovor.findAll", query = "SELECT o FROM Odgovor o")
})
public class Odgovor implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date ustvarjenOb;
	
	private String odgovor;
	
	@ManyToOne
	@JoinColumn(name = "vprasanje_id")
	private Vprasanje vprasanje;
	
	public Odgovor() {}
	
	public Odgovor(Date ustvarjenOb, String odgovor, Vprasanje vprasanje) {
		this.ustvarjenOb = ustvarjenOb;
		this.odgovor = odgovor;
		this.vprasanje = vprasanje;
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public Date getUstvarjenOb() {
		return ustvarjenOb;
	}
	
	public void setUstvarjenOb(Date ustvarjenOb) {
		this.ustvarjenOb = ustvarjenOb;
	}
	
	public String getOdgovor() {
		return odgovor;
	}
	
	public void setOdgovor(String odgovor) {
		this.odgovor = odgovor;
	}
	
	public Vprasanje getVprasanje() {
		return vprasanje;
	}
	
	public void setVprasanje(Vprasanje vprasanje) {
		this.vprasanje = vprasanje;
	}
}
