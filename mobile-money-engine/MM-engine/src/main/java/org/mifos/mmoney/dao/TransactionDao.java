package org.mifos.mmoney.dao;

import java.util.Set;

import org.mifos.mmoney.models.Transactions;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("unused")
@Transactional
public interface TransactionDao extends CrudRepository<Transactions, Long>{
	
}
