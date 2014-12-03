package com.whi8per.sense.deeplearn.web.mvc.deeplearn;

import java.util.List;
import java.util.Map;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.google.common.collect.Lists;

/**
 * 此对象用于封装 Explore 的返回结果. 作为 Response Model 提供view层使用或转换为JSON.
 * 
 * @author houdejun
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true,value={"page"})
public class DeeplearnResult {
	
	public int getTotalCount() {
		return totalCount;
	}

	public List<Map<String, Object>> getList() {
		return list;
	}

	public static int PageSize;
	
	private long start = 0;
	
	private int totalCount = 0;
	
	private List<Map<String,Object>> list = Lists.newArrayList();

	public long getStart() {
		return start;
	}

	public void setStart(long start) {
		this.start = start;
	}
	
	public boolean isEmptyResult(){
		return this.list==null || this.list.size()==0;
	}

	/**
	 * 返回Page 对象，用于分页实现。
	 * @return
	 */
	public Page getPage(){
		Page page = new Page();
		page.setPageSize(PageSize);
		page.setTotalCount(totalCount);
		page.setStart(start);
		return page;
	}
	
	/**
	 * default constructor
	 * @param query
	 */
	public DeeplearnResult() {
		this.list = null;
	}
	
	/**
	 * wrap the request query.
	 * @param query
	 */
	public DeeplearnResult(List<Map<String,Object>> list,int totalCount) {
		this.list = list;
		this.totalCount = totalCount;
	}
	
}
