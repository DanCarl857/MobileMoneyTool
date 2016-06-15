package org.mifos.mmoney.api;

import java.math.BigInteger;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.mifos.mmoney.models.Transactions;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionController {
	private static BigInteger nextId;
	private static Map<BigInteger, Transactions> transactionMap;
	
	@SuppressWarnings("unused")
	private static Transactions save(Transactions transactions){
		if(transactionMap == null){
			transactionMap = new HashMap<BigInteger, Transactions>();
			nextId = BigInteger.ONE;
		}
		transactions.setId(nextId);
		nextId = nextId.add(BigInteger.ONE);
		transactionMap.put(transactions.getId(),  transactions);
		return transactions;
	}
	
	static {
		Transactions t1 = new Transactions();
		t1.setText("Testing..");
		save(t1);
		
		Transactions t2 = new Transactions();
		t2.setText("This is new");
		save(t2);
	}
	
	@SuppressWarnings("unused")
	@RequestMapping(
			value="/api/transactions",
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Transactions> > getTransactions(){
		Collection<Transactions> transactions = transactionMap.values();
		
		return new ResponseEntity<Collection<Transactions>>(transactions, HttpStatus.OK);
	}
}
