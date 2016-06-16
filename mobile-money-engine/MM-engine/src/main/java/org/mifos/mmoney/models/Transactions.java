package org.mifos.mmoney.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
 * Transaction Entity to Persist Data:
 * POJO class to define transactions Entity.
 *
 */
@Entity
@Table(name="transaction_history")
public class Transactions {
	
	// Declare table names in the transaction database
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column(name="staff")
	private String staff;
	@Column(name="office")
	private String office;
	@Column(name="transaction_type")
	private String type;
	@Column(name="amount")
	private Long amount;
	@Column(name="recipient")
	private String recipient;
	@Column(name="date")
	private Date date;
	
	// Getters and setters for the above variables
	public int getId() {
		return this.id;
	}
	public String getStaff() {
		return this.staff;
	}
	public void setStaff(String staff) {
		this.staff = staff;
	}
	public String getOffice() {
		return this.office;
	}
	public void setOffice(String office) {
		this.office = office;
	}
	public String getType() {
		return this.type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Long getAmount() {
		return this.amount;
	}
	public void setAmount(Long amount) {
		this.amount = amount;
	}
	public String getRecipient() {
		return this.recipient;
	}
	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}
	public Date getDate() {
		return this.date;
	}
	// set the Date as the current time and date
	public void setDate() {
		Date date = new Date();
		this.date = date;
	}
}
