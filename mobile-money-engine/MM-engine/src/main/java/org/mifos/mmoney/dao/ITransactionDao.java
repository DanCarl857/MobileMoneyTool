package org.mifos.mmoney.dao;

public interface ITransactionDao {
	public void saveTransaction(String staff, long amount, String office, String recipient, String type);
}
