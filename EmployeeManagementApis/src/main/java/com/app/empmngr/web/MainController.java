package com.app.empmngr.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.empmngr.exception.RecordAlreadyExistException;
import com.app.empmngr.exception.RecordNotFoundException;
import com.app.empmngr.exception.UserNotAuthorized;
import com.app.empmngr.model.EmployeeEntity;
import com.app.empmngr.model.ManagerEntity;
import com.app.empmngr.service.ManagerService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/manager")
public class MainController {
	@Autowired
	ManagerService service;

	@PostMapping("/auth")
	public ResponseEntity<ManagerEntity> findManagerInfo(@RequestBody ManagerEntity manager) throws UserNotAuthorized {
		ManagerEntity mngrInfo = service.getManagerInfo(manager);

		return new ResponseEntity<ManagerEntity>(mngrInfo, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<ManagerEntity> registerManager(@RequestBody ManagerEntity manager) throws RecordAlreadyExistException {
		ManagerEntity mngrInfo = service.registerManager(manager);

		return new ResponseEntity<ManagerEntity>(mngrInfo, new HttpHeaders(), HttpStatus.CREATED);
	}

	@GetMapping("/getemp/{id}")
	public ResponseEntity<List<EmployeeEntity>> getEmployeeByMngId(@PathVariable("id") Long id)
			throws RecordNotFoundException {
		List<EmployeeEntity> entity = service.getEmployeesByMngId(id);

		return new ResponseEntity<List<EmployeeEntity>>(entity, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/newemp")
	public ResponseEntity<EmployeeEntity> createEmployee(@RequestBody EmployeeEntity employee)
			throws  RecordAlreadyExistException {
		EmployeeEntity created = service.createEmployee(employee);
		return new ResponseEntity<EmployeeEntity>(created, new HttpHeaders(), HttpStatus.CREATED);
	}
	
	@PutMapping("/updemp")
	public ResponseEntity<EmployeeEntity> UpdateEmployee(@RequestBody EmployeeEntity employee)
			throws RecordNotFoundException {
		EmployeeEntity updated = service.updateEmployee(employee);
		return new ResponseEntity<EmployeeEntity>(updated, new HttpHeaders(), HttpStatus.OK);
	}

	@DeleteMapping("/delemp/{id}")
	public ResponseEntity<Void> deleteEmployeeById(@PathVariable("id") Long id) throws RecordNotFoundException {
		service.deleteEmployeeById(id);
		return ResponseEntity.noContent().build();
	}

}