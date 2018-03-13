package responses.vprasanje;

import com.kumuluz.ee.rest.beans.QueryParameters;

import java.util.List;

public class FindAllResponse<T> {
	
	public Glava glava;
	
	public Telo telo;
	
	public FindAllResponse() {}
	
	public FindAllResponse(List<T> seznam, long steviloVsehZadetkov, QueryParameters query) {
		if(query.getOffset() != null && query.getLimit() != null) {
			long limit = query.getLimit();
			long offset = query.getOffset();
			if(limit == 0) {
				this.glava = new GlavaBrezPaginacije(steviloVsehZadetkov);
			} else {
				this.glava = new GlavaZPaginacijo(steviloVsehZadetkov, limit, offset);
			}
		} else {
			this.glava = new GlavaBrezPaginacije(steviloVsehZadetkov);
		}
		this.telo = new Telo(seznam);
	}
}

abstract class Glava {
	public long steviloVsehZadetkov;
	
	public Glava(long steviloVsehZadetkov) {
		this.steviloVsehZadetkov = steviloVsehZadetkov;
	}
}

class GlavaBrezPaginacije extends Glava {
	public GlavaBrezPaginacije(long steviloVsehZadetkov) {
		super(steviloVsehZadetkov);
	}
	
	@Override
	public String toString() {
		return String.format("GLAVA: { steviloVsehZadetkov: %d }", steviloVsehZadetkov);
	}
}

class GlavaZPaginacijo extends Glava {
	
	public long stNaStran;
	
	public long stStrani;
	
	public long trenutnaStran;
	
	public GlavaZPaginacijo(long steviloVsehZadetkov, long limit, long offset) {
		super(steviloVsehZadetkov);
		this.stNaStran = limit;
		this.trenutnaStran = (offset / limit) + 1;
		this.stStrani = (long) Math.ceil(Math.ceil((double) steviloVsehZadetkov / (double) this.stNaStran));
	}
	
	@Override
	public String toString() {
		return String.format("GLAVA: { steviloVsehZadetkov: %d, stNaStran: %d, stStrani: %d, trenutnaStran: %d }",
				steviloVsehZadetkov, stNaStran, stStrani, trenutnaStran);
	}
}

class Telo<T> {
	
	public List<T> seznam;
	
	public Telo(List<T> seznam) {
		this.seznam = seznam;
	}
}
