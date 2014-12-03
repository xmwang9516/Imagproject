package com.whi8per.sense.web;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.springframework.stereotype.Component;

@Component("jsonpCallbackFilter")
public class JsonpCallbackFilter implements Filter {

	public void init(FilterConfig fConfig) throws ServletException {
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;

		@SuppressWarnings("unchecked")
		Map<String, String[]> parms = httpRequest.getParameterMap();

		if (parms.containsKey("callback")) {
			OutputStream out = httpResponse.getOutputStream();
			GenericResponseWrapper wrapper = new GenericResponseWrapper(
					httpResponse);
			try {
				chain.doFilter(request, wrapper);
				byte[] callBack = (parms.get("callback")[0] + "(")
						.getBytes("UTF-8");
				byte[] callBackEnd = (");").getBytes("UTF-8");
				byte[] jsonpResponse = new byte[callBack.length
						+ wrapper.getData().length + callBackEnd.length];
				wrapper.setContentType("application/javascript; charset=UTF-8");
				wrapper.setContentLength(jsonpResponse.length);
				System.arraycopy(callBack, 0, jsonpResponse, 0, callBack.length);
				System.arraycopy(wrapper.getData(), 0, jsonpResponse,
						callBack.length, wrapper.getData().length);
				System.arraycopy(callBackEnd, 0, jsonpResponse, callBack.length
						+ wrapper.getData().length, callBackEnd.length);
				out.write(jsonpResponse);
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			} finally {
				out.close();
			}
		} else {
			chain.doFilter(request, response);
		}
	}

	public void destroy() {

	}

	public static class GenericResponseWrapper extends
			HttpServletResponseWrapper {

		private ByteArrayOutputStream output;
		private int contentLength;
		private String contentType;

		public GenericResponseWrapper(HttpServletResponse response) {
			super(response);
			output = new ByteArrayOutputStream();
		}

		public byte[] getData() {
			return output.toByteArray();
		}

		public ServletOutputStream getOutputStream() {
			return new FilterServletOutputStream(output);
		}

		public PrintWriter getWriter() {
			return new PrintWriter(getOutputStream(), true);
		}

		public void setContentLength(int length) {
			this.contentLength = length;
			super.setContentLength(length);
		}

		public int getContentLength() {
			return contentLength;
		}

		public void setContentType(String type) {
			this.contentType = type;
			super.setContentType(type);
		}

		public String getContentType() {
			return contentType;
		}
	}

	public static class FilterServletOutputStream extends ServletOutputStream {

		private DataOutputStream stream;

		public FilterServletOutputStream(OutputStream output) {
			stream = new DataOutputStream(output);
		}

		public void write(int b) throws IOException {
			stream.write(b);
		}

		public void write(byte[] b) throws IOException {
			stream.write(b);
		}

		public void write(byte[] b, int off, int len) throws IOException {
			stream.write(b, off, len);
		}
	}
}