package com.whi8per.sense.deeplearn.web.mvc.deeplearn;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletRequest;

import com.lakeside.core.utils.UrlUtils;

/**
 * describe the page information
 * 
 * @author houdejun
 *
 */
public class Page {

	// size of the page.
	private int pageSize=20;
	// max display pages
	private int maxDisplayPage=10;
	// the total amount of elements.
	private long totalCount=0;
	// the start of current page
	private long start = 0;
	// end of current page
	private long end;
	
	public int getPage() {
		return (int) (start/pageSize +1);
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getTotalPages() {
		return (int) Math.ceil(totalCount*1.0/pageSize);
	}
	public long getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(long hitCount) {
		this.totalCount = hitCount;
	}
	public long getStart() {
		return start;
	}
	public void setStart(long start2) {
		this.start = start2;
	}
	public long getEnd() {
		return end;
	}
	public void setEnd(int end) {
		this.end = end;
	}
	
	public int getMaxDisplayPage() {
		return maxDisplayPage;
	}
	public void setMaxDisplayPage(int maxDisplayPage) {
		this.maxDisplayPage = maxDisplayPage;
	}
	public void setEnd(long end) {
		this.end = end;
	}
	public boolean hasPreviousPage(){
		return this.getPage() > 1;
	}
	
	public boolean hasNextPage(){
		return getPage() < getTotalPages();
	}

	public boolean isFirstPage() {
		return !hasPreviousPage();
	}

	public boolean isLastPage() {
		return !hasNextPage();
	}
}
