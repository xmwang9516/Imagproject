package com.whi8per.sense.web.mvc;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.lakeside.core.utils.StringUtils;
import com.lakeside.core.utils.UrlUtils;
import com.lakeside.web.WebRequestContext;


/**
 * mvc拦截器
 * 1. 注入 web app context 
 * 2. project id check
 * 
 * @author hdj
 *
 */
public class NSHandlerInterceptorAdapter extends HandlerInterceptorAdapter {
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		super.postHandle(request, response, handler, modelAndView);
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		WebRequestContext.initialize(request);
		String context = getContext(request);
		request.setAttribute("context", context);
		request.setAttribute("ctx", context);
		StringBuffer requestURL = request.getRequestURL();
		String host = UrlUtils.getHost(requestURL.toString());
		request.setAttribute("hostip",host);
		String reqUri = request.getRequestURI().toString();
		request.setAttribute("requesturl",reqUri);
		return true;
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		WebRequestContext.clearContext();
	}

	private static String app_context="";
	/**
	 * get the request context path name of the application
	 * @param request
	 * @return
	 */
	private String getContext(HttpServletRequest request){
		if(!StringUtils.isEmpty(app_context)){
			return app_context;
		}
		String _context  = request.getContextPath();
		app_context=_context;
		return app_context;
	}
}
