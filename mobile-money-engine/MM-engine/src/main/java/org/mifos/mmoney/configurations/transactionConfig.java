package org.mifos.mmoney.configurations;

import javax.sql.DataSource;
import org.apache.commons.dbcp.BasicDataSource;
import org.hibernate.SessionFactory;
import org.mifos.mmoney.dao.ITransactionDao;
import org.mifos.mmoney.dao.TransactionDao;
import org.mifos.mmoney.models.Transactions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBuilder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/*
 * Class to handle SessionFactory configurations
 * for the transactions history database for hibernate
 */
@Configuration
@EnableTransactionManagement
public class transactionConfig {
	/*
	 * Bean definitions
	 */
	@Bean
	public ITransactionDao transactionDao(){
		return new TransactionDao();
	}
	@Bean
	public HibernateTemplate hibernateTemplate(){
		HibernateTemplate hibernateTemplate = new HibernateTemplate(sessionFactory());
		/*
		 * Without doing this, bean will be in READ-ONLY MODE and will give exceptions 
		 * in TransactionDao.java
		 */
		hibernateTemplate.setCheckWriteOperations(false);
		return hibernateTemplate;
	}
	
	@Bean
	public SessionFactory sessionFactory() {
		return new LocalSessionFactoryBuilder(getDataSource())
		   .addAnnotatedClasses(Transactions.class)
		   .buildSessionFactory();
	}
	
	@Bean 
	public DataSource getDataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName("com.mysql.jdbc.Driver");
		dataSource.setUrl("jdbc:mysql://localhost:3306/mobile_money_application");
		dataSource.setUsername("root");
		dataSource.setPassword("mysql");
		
		return dataSource;
	}
	
	@Bean
	public HibernateTransactionManager transactionMan(){
		return new HibernateTransactionManager(sessionFactory());
	}
}
