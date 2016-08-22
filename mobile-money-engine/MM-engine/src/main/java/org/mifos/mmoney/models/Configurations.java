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
	
	@Column(name="API")
	private String apiName;
	
	@Column(name="Org_phone")
	private int phone;
	
	@Column(name="Org_id")
	private int orgAccId;
	
	@Column(name="URLs")
	private String urls;
	
	@Column(name="Parameters")
	private String parameters;
	
	
	// Getter and setters
	public int getPhone() {
		return phone;
	}

	public void setPhone(int phone) {
		this.phone = phone;
	}

	public int getOrgAccId() {
		return orgAccId;
	}

	public void setOrgAccId(int orgAccId) {
		this.orgAccId = orgAccId;
	}

	public int getId() {
		return id;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getApiName() {
		return apiName;
	}

	public void setApiName(String apiName) {
		this.apiName = apiName;
	}

	public String getUrls() {
		return urls;
	}

	public void setUrls(String urls) {
		this.urls = urls;
	}

	public String getParameters() {
		return parameters;
	}

	public void setParameters(String parameters) {
		this.parameters = parameters;
	}
}
