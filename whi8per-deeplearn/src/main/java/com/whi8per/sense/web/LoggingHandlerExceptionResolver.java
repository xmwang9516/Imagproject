package com.whi8per.sense.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.whi8per.sense.MessageRuntimeException;

@Component
public class LoggingHandlerExceptionResolver 
implements HandlerExceptionResolver, Ordered {
	
	private static Logger log = LoggerFactory.getLogger(LoggingHandlerExceptionResolver.class);
	
    public int getOrder() {
        return Integer.MIN_VALUE; // we're first in line, yay!
    }

    public ModelAndView resolveException(
        HttpServletRequest aReq, HttpServletResponse aRes,
        Object aHandler, Exception anExc
    ) {
    	
    	boolean writeLog = true;
    	
    	if(anExc instanceof MessageRuntimeException){
    		writeLog = false;
    	}
    	
    	if(writeLog){
    		log.error(anExc.getMessage(),anExc);
    	}
        return null; // trigger other HandlerExceptionResolver's
    }
}