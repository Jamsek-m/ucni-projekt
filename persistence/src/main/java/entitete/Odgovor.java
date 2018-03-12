package entitete;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "odgovori")
@NamedQueries({
	@NamedQuery(name = "Odgovor.findOne", query = "SELECT o FROM Odgovor o WHERE o.id = :id"),
	@NamedQuery(name = "Odgovor.findAll", query = "SELECT o FROM Odgovor o"),
	@NamedQuery(name = "Odgovor.countAll", query = "SELECT COUNT(o.id) FROM Odgovor o")
})
public class Odgovor implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date ustvarjenOb;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date posodobljenOb;
	
	private String odgovor;
	
	@ManyToOne
	@JoinColumn(name = "vprasanje_id")
	private Vprasanje vprasanje;
	
	public Odgovor() {}
	
	public Odgovor(Date ustvarjenOb, Date posodobljenOb, String odgovor, Vprasanje vprasanje) {
		this.ustvarjenOb = ustvarjenOb;
		this.posodobljenOb = posodobljenOb;
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
	
	public Date getPosodobljenOb() {
		return posodobljenOb;
	}
	
	public void setPosodobljenOb(Date posodobljenOb) {
		this.posodobljenOb = posodobljenOb;
	}
	
	public String getOdgovor() {
		return odgovor;
	}
	
	public void setOdgovor(String odgovor) {
		this.odgovor = odgovor;
	}
	
	@XmlTransient
	public Vprasanje getVprasanje() {
		return vprasanje;
	}
	
	public void setVprasanje(Vprasanje vprasanje) {
		this.vprasanje = vprasanje;
	}
}
