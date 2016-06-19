package org.mifos.mmoney;

import org.mifos.mmoney.configurations.transactionConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@SpringBootApplication
public class MmEngineApplication {

	public static void main(String[] args) {
		@SuppressWarnings("resource")
		AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
		ctx.register(transactionConfig.class);
		ctx.refresh();
		SpringApplication.run(MmEngineApplication.class, args);
	}
}
