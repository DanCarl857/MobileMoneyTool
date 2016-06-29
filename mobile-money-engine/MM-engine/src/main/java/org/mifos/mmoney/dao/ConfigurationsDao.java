package org.mifos.mmoney.dao;

import javax.transaction.Transactional;

import org.mifos.mmoney.models.Configurations;
import org.springframework.data.repository.CrudRepository;

@SuppressWarnings("unused")
@Transactional
public interface ConfigurationsDao extends CrudRepository<Configurations, Long> {

}
