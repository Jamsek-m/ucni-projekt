package api.v1.preslikovalci;

public class MapperResponseObject {
	
	public int status;
	
	public String sporocilo;
	
	public MapperResponseObject() {
	}
	
	public MapperResponseObject(int status, String sporocilo) {
		this.status = status;
		this.sporocilo = sporocilo;
	}
}
