package com.educycle.repository;

import com.educycle.entity.Resource;
import com.educycle.entity.ResourceRequest;
import com.educycle.entity.User;
import com.educycle.entity.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRequestRepository extends JpaRepository<ResourceRequest, Long> {
    List<ResourceRequest> findByRequester(User requester);
    List<ResourceRequest> findByOwner(User owner);
    List<ResourceRequest> findByResource(Resource resource);
    List<ResourceRequest> findByStatus(RequestStatus status);
}
