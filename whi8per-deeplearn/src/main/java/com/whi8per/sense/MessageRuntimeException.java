package com.whi8per.sense;


public class MessageRuntimeException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -652271005246208955L;


	public MessageRuntimeException(String message) {
		super(message);
	}

	public String getMessage(){
		return "Message : "+super.getMessage();
	}
}
