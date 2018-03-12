package entitete;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "seznam_odgovorov")
@NamedQueries({
	@NamedQuery(name = "SeznamOdgovorov.findOne", query = "SELECT so FROM SeznamOdgovorov so WHERE so.id = :id"),
	@NamedQuery(name = "SeznamOdgovorov.findAll", query = "SELECT so FROM SeznamOdgovorov so")
})
public class SeznamOdgovorov implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String tipOdgovora;
	
	@ManyToOne
	@JoinColumn(name = "vprasanje_id")
	private Vprasanje vprasanje;
	
	public SeznamOdgovorov() {}
	
	public SeznamOdgovorov(String tipOdgovora, Vprasanje vprasanje) {
		this.tipOdgovora = tipOdgovora;
		this.vprasanje = vprasanje;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getTipOdgovora() {
		return tipOdgovora;
	}
	
	public void setTipOdgovora(String tipOdgovora) {
		this.tipOdgovora = tipOdgovora;
	}
	
	public Vprasanje getVprasanje() {
		return vprasanje;
	}
	
	public void setVprasanje(Vprasanje vprasanje) {
		this.vprasanje = vprasanje;
	}
}
