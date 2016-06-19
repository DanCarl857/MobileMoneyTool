package org.mifos.mmoney.dao;

import org.mifos.mmoney.models.Transactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;

public class TransactionDao implements ITransactionDao {
	@Autowired
	private HibernateTemplate hibernateTemplate;
	@Override
	public void saveTransaction(String staff, long amount, String office, String recipient, String type){
		Transactions transaction = new Transactions();
		transaction.setAmount(amount);
		transaction.setDate();
		transaction.setStaff(staff);
		transaction.setOffice(office);
		transaction.setRecipient(recipient);
		transaction.setType(type);
		hibernateTemplate.save(transaction);
	}
}
