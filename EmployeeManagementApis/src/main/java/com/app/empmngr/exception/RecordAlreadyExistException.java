package com.app.empmngr.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class RecordAlreadyExistException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public RecordAlreadyExistException(String message) {
		super(message);
	}
	
	public RecordAlreadyExistException(String message, Throwable t) {
		super(message, t);
	}
}
