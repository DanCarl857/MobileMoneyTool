package org.mifos.mmoney.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="configurations")
public class Configurations {
	
	// table name declarations in the configurations database
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	// Constructor
	public Configurations(){}
	
	// Column names in the database
	@Column(name="Region")
	private String region;
	
	@Column(name="Country")
	private String country;
	
	@Column(name="Parameters")
	private String parameters;
	
	@Column(name="Domain")
	private String domain;

	public int getId() {
		return this.id;
	}

	public String getRegion() {
		return this.region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getCountry() {
		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getParameters() {
		return this.parameters;
	}

	public void setParameters(String parameters) {
		this.parameters = parameters;
	}

	public String getDomain() {
		return this.domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}
}
