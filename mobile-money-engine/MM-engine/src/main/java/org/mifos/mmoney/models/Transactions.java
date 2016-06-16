package org.mifos.mmoney.models;

import java.math.BigInteger;

/**
 * 
 * @author dinesh
 * Transaction class:
 * Class to handle the operations to get all transactions from
 * database.
 *
 */

public class Transactions {
		
	private BigInteger id;
	private String text; 
	
	public Transactions(){
		
	}
	
	public BigInteger getId() {
		return this.id;
	}

	public void setId(BigInteger id) {
		this.id = id;
	}

	public String getText() {
		return this.text;
	}

	public void setText(String text) {
		this.text = text;
	}

	
}
