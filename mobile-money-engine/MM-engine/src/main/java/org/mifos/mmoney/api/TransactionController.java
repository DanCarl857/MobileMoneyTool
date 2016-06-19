package org.mifos.mmoney.api;

import org.mifos.mmoney.dao.ITransactionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionController {
	
	@Autowired
	private ApplicationContext appContext;
	
	{
		/*appContext.register(transactionConfig);
		appContext.refresh();*/
		ITransactionDao test = appContext.getBean(ITransactionDao.class);
		test.saveTransaction("Bill", 50000, "Head Office", "null", "Withdrawal");
		System.out.println("Inserted into database me too in the database");
	}
}
