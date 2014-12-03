package com.whi8per.sense;

/**
 * @author zhufb
 *
 */
public class SenseException extends RuntimeException {

	private static final long serialVersionUID = -1442102604482577469L;
	
	public SenseException(String message){
		super(message);
	}
	
	public String getMessage(){
		return "Sense: " + super.getMessage();
	}
	
}
