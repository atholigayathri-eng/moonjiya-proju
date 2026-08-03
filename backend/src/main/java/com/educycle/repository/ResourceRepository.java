package com.educycle.repository;

import com.educycle.entity.Resource;
import com.educycle.entity.User;
import com.educycle.entity.enums.ExchangeType;
import com.educycle.entity.enums.ResourceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByStatus(ResourceStatus status);
    List<Resource> findByCategory(String category);
    List<Resource> findByUser(User user);
    List<Resource> findByExchangeType(ExchangeType exchangeType);
    List<Resource> findByTitleContainingIgnoreCase(String keyword);
    List<Resource> findByCategoryAndExchangeType(String category, ExchangeType exchangeType);
}
