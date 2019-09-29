package com.app.empmngr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.empmngr.exception.RecordAlreadyExistException;
import com.app.empmngr.exception.RecordNotFoundException;
import com.app.empmngr.model.EmployeeEntity;
import com.app.empmngr.model.ManagerEntity;
import com.app.empmngr.repository.EmployeeRepository;
import com.app.empmngr.repository.ManagerRepository;

@Service
public class ManagerService {

	@Autowired
	ManagerRepository mngRepository;

	@Autowired
	EmployeeRepository empRepository;

	public ManagerEntity getManagerInfo(ManagerEntity manager) throws RecordNotFoundException {
		Optional<ManagerEntity> mngInfo = mngRepository.findByEmailPassword(manager.getEmail(), manager.getPassword());

		if (mngInfo.isPresent()) {
			return mngInfo.get();
		} else {
			throw new RecordNotFoundException("No manager record exist for given id");
		}
	}

	public ManagerEntity registerManager(ManagerEntity manager) throws RecordAlreadyExistException {
		Optional<Integer> employee = mngRepository.findByEmail(manager.getEmail());
		if (employee.isPresent()) {
			throw new RecordAlreadyExistException("Manager Already Exist with the same email id");
		} else {
			ManagerEntity mngInfo = mngRepository.save(manager);
			return mngInfo;
		}
	}

	public List<EmployeeEntity> getEmployeesByMngId(Long id) throws RecordNotFoundException {
		List<EmployeeEntity> employee = mngRepository.getEmployeesByMngId(id);

		if (employee.size() > 0) {
			return employee;
		} else {
			throw new RecordNotFoundException("No employee record exist for given id");
		}
	}

	public EmployeeEntity createOrUpdateEmployee(EmployeeEntity entity) throws RecordNotFoundException {
		Optional<EmployeeEntity> employee = null;
		if (null != entity.getId()) {
			employee = empRepository.findById(entity.getId());
		}

		if (null != employee && employee.isPresent()) {
			EmployeeEntity newEntity = employee.get();

			newEntity.setFirstname(entity.getFirstname());
			newEntity.setLastname(entity.getLastname());
			newEntity.setMngid(entity.getMngid());
			newEntity = empRepository.save(newEntity);

			return newEntity;
		} else {
			entity = empRepository.save(entity);

			return entity;
		}
	}

	public void deleteEmployeeById(Long id) throws RecordNotFoundException {
		Optional<EmployeeEntity> employee = empRepository.findById(id);

		if (employee.isPresent()) {
			empRepository.deleteById(id);
		} else {
			throw new RecordNotFoundException("No employee record exist for given id");
		}
	}

}