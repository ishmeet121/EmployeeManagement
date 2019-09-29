package com.app.empmngr.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class UserNotAuthorized extends Exception {

	private static final long serialVersionUID = 1L;
	
	public UserNotAuthorized(String message) {
		super(message);
	}
	
	public UserNotAuthorized(String message, Throwable t) {
		super(message, t);
	}
}
