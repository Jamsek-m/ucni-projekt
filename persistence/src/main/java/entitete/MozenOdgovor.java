package entitete;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;
import java.io.Serializable;

@Entity
@Table(name = "mozen_odgovor")
@NamedQueries({
	@NamedQuery(name = "MozenOdgovor.findOne", query = "SELECT so FROM MozenOdgovor so WHERE so.id = :id"),
	@NamedQuery(name = "MozenOdgovor.findAll", query = "SELECT so FROM MozenOdgovor so"),
	@NamedQuery(name = "MozenOdgovor.countAll", query = "SELECT COUNT(mo.id) FROM MozenOdgovor mo")
})
public class MozenOdgovor implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "tip_odgovora")
	private String tipOdgovora;
	
	@ManyToOne
	@JoinColumn(name = "vprasanje_id")
	private Vprasanje vprasanje;
	
	public MozenOdgovor() {}
	
	public MozenOdgovor(String tipOdgovora, Vprasanje vprasanje) {
		this.tipOdgovora = tipOdgovora;
		this.vprasanje = vprasanje;
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getTipOdgovora() {
		return tipOdgovora;
	}
	
	public void setTipOdgovora(String tipOdgovora) {
		this.tipOdgovora = tipOdgovora;
	}
	
	@XmlTransient
	public Vprasanje getVprasanje() {
		return vprasanje;
	}
	
	public void setVprasanje(Vprasanje vprasanje) {
		this.vprasanje = vprasanje;
	}
}
