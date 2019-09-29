package com.app.empmngr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.empmngr.model.EmployeeEntity;
import com.app.empmngr.model.ManagerEntity;

@Repository
public interface ManagerRepository extends JpaRepository<ManagerEntity, Long> {
	@Query("select new EmployeeEntity(emp.id, emp.firstname, emp.lastname, emp.mngid ) from ManagerEntity mng left outer join EmployeeEntity emp on mng.id=emp.mngid where mng.id=?1")
	List<EmployeeEntity> getEmployeesByMngId(@Param("id") Long id);

	@Query("select new ManagerEntity(mng.id, mng.firstname, mng.lastname, mng.email) from ManagerEntity mng where mng.email=?1 and mng.password=?2")
	Optional<ManagerEntity> findByEmailPassword(@Param("email") String email, @Param("password") String password);

	@Query("select mng.id from ManagerEntity mng where mng.email=?1")
	Optional<Integer> findByEmail(@Param("email") String email);

}
