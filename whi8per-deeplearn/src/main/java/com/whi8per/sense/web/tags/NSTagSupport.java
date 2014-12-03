package com.whi8per.sense.web.tags;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.tagext.TagSupport;

import com.lakeside.web.ApplicationContextHolder;

public abstract class NSTagSupport extends TagSupport{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -264523884978346568L;

	protected String getContext(){
		HttpServletRequest request = (HttpServletRequest)this.pageContext.getRequest();
		return request.getContextPath();
	}
	
	protected String getRequestUrl(){
		ServletRequest request = this.pageContext.getRequest();
		HttpServletRequest htpRequest = (HttpServletRequest)request;
		Object attribute = request.getAttribute("javax.servlet.forward.request_uri");
		String reqUri = htpRequest.getServletPath();
		if(attribute!= null){
			reqUri = attribute.toString();
		}
		String queryString = htpRequest.getQueryString();
		if(queryString==null){
			return reqUri;
		}else{
			return reqUri+"?"+queryString;
		}
	}
	
	protected <T> T getAttribute(String key,Class<T> clazz){
		return (T) pageContext.getAttribute(key);
	}
	
	protected <T> T getSessionAttribute(String key,Class<T> clazz){
		return (T) pageContext.getSession().getAttribute(key);
	}
	
	protected void setAttribute(String key,Object value){
		pageContext.setAttribute(key, value);
	}
	protected void setSessionAttribute(String key,Object value){
		pageContext.getSession().setAttribute(key, value);
	}

	protected <T> T getApplicationContextBean(Class<T> requiredType) {
		return ApplicationContextHolder.getBean(requiredType);
	}
	
}
