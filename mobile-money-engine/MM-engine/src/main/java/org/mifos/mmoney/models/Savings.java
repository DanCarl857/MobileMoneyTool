package org.mifos.mmoney.models;

public class Savings {
	
	private String type;
	private String str;
	// private Value value;
	
	public Savings(){
		
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	public String getStr() {
		return this.str;
	}
	
	public void setStr(String str){
		this.str = str;
	}
	
	@Override
	public String toString() {
		return "Quote{type='" + type + '\'' + ", value=" + str + '}';
	}
}
