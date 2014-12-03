package com.whi8per.sense.deeplearn.web.mvc.builder;

import javax.servlet.http.HttpServletRequest;

import com.lakeside.core.utils.StringUtils;
import com.lakeside.web.beans.config.ConfigSetting;

public abstract class DeepLearnBuilder {
	public final static String DEEPLEARN_TAG = "tag";//TAG
	public final static String PEOPLE_LOCATION = "loc";//地点 string e.g shanghai
	public final static String PEOPLE_OCCUPATION = "ind";// 行业 string e.g:computer
	public final static String PEOPLE_INTEREST = "int";//兴趣 string e.g:football
	public final static String PEOPLE_GENDER = "g";//性别  f or m
	public final static String PEOPLE_AGE = "age";//年龄段 e.g 0-18 ,18-23,50
	public final static String PEOPLE_MARRIAGE = "mrg";//婚恋状况 e.g f,m
	public final static String PEOPLE_MAJOR = "maj";//专业
	public final static String PEOPLE_FOLLOWERS = "fol";//粉丝数（大于 小于）split with '-' ,e.g:0-50,51-100,...
	public final static String PEOPLE_ACTIVE = "act";//活跃度（大于 小于）split with '-' ,e.g:0-20,20-40,0-100
	public final static String PEOPLE_INFLUENCE = "inf";//社交影响力（大于 小于 ）0-20,20-40,0-100
	
	protected HttpServletRequest request;
	
	protected ConfigSetting config;
	
	public DeepLearnBuilder(HttpServletRequest request,ConfigSetting config){
		this.request = request;
		this.config = config;
	}
	
	public boolean contains(String key){
		String parameter = request.getParameter(key);
		if(StringUtils.isEmpty(parameter)){
			return false;
		}
		return true;
	}
	
	public String getParamString(String key){
		String parameter = request.getParameter(key);
		return parameter;
	}
	
	public String[] getParamStrings(String key){
		String[] paramters = request.getParameterValues(key);
		if(paramters==null){
			paramters = request.getParameterValues(key+"[]");
		}
		return paramters;
	}
	
	public int getParamInt(String key,int defaultVal){
		String parameter = request.getParameter(key);
		if(StringUtils.isNotEmpty(parameter)){
			int int1 = StringUtils.toInt(parameter);
			return int1;
		}
		return defaultVal;
	}
}
