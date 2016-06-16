package org.mifos.mmoney.dao;

import org.mifos.mmoney.models.Transactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;

public class TransactionDao implements ITransactionDao {
	@Autowired
	private HibernateTemplate hibernateTemplate;
	public void saveTransaction(){
		Transactions transaction = new Transactions();
		transaction.setAmount((long) 5000);
		transaction.setDate();
		transaction.setStaff("null");
		transaction.setOffice("Head Office");
		transaction.setRecipient("null");
		transaction.setType("savings");
		hibernateTemplate.save(transaction);
	}
}
