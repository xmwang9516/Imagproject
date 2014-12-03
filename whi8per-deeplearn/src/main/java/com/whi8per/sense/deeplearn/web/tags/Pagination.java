package com.whi8per.sense.deeplearn.web.tags;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

import com.hp.gagawa.java.elements.A;
import com.hp.gagawa.java.elements.Div;
import com.hp.gagawa.java.elements.Li;
import com.hp.gagawa.java.elements.Ul;
import com.lakeside.core.utils.UrlUtils;
import com.whi8per.sense.deeplearn.web.mvc.deeplearn.Page;
import com.whi8per.sense.web.tags.NSTagSupport;

/**
 * 分页控件。
 * 
 * @author houdejun
 *
 */
public class Pagination extends NSTagSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2399003472282750789L;
	
	private Page page;
	
	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}

	@Override
	public int doEndTag() throws JspException {
		ServletRequest request = this.pageContext.getRequest();
		int maxDisplayPage = page.getMaxDisplayPage();
		int current =  page.getPage();
		int begin = Math.max(1, current - maxDisplayPage/2);
		int end = Math.min(begin + (maxDisplayPage - 1), page.getTotalPages());
		// start build
		Div div = new Div();
		Ul ul = new Ul().setCSSClass("pagination pagination-sm");
		if (page.hasPreviousPage()){
			ul.appendChild(new Li().appendChild(new A().setHref(getHref(1,request)).appendText("&lt;&lt;")));
			ul.appendChild(new Li().appendChild(new A().setHref(getHref(current-1,request)).appendText("&lt;")));
		}else{
			ul.appendChild(new Li().appendChild().setCSSClass("disabled").appendChild(new A().appendText("&lt;&lt;")));
			ul.appendChild(new Li().appendChild().setCSSClass("disabled").appendChild(new A().appendText("&lt;")));
		}
		for(int i=begin;i<=end;i++){
			if(i == current){
				ul.appendChild(new Li().setCSSClass("active").appendChild(new A().setHref(getHref(i,request)).appendText(String.valueOf(i))));
			}else{
				ul.appendChild(new Li().appendChild(new A().setHref(getHref(i,request)).appendText(String.valueOf(i))));
			}
		}
		
		if (page.hasNextPage()){
			ul.appendChild(new Li().appendChild(new A().setHref(getHref(current+1,request)).appendText("&gt;")));
			ul.appendChild(new Li().appendChild(new A().setHref(getHref(page.getTotalPages(),request)).appendText("&gt;&gt;")));
		}else{
			ul.appendChild(new Li().appendChild().setCSSClass("disabled").appendChild(new A().appendText("&gt;")));
			ul.appendChild(new Li().appendChild().setCSSClass("disabled").appendChild(new A().appendText("&gt;&gt;")));
		}
		div.appendChild(ul);
		try {
			JspWriter out = pageContext.getOut();
			out.write(div.write());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return super.doEndTag();
	}
	
	public String getHref(int page,ServletRequest request){
		String requestUrl = request.getAttribute("requesturl").toString();
		Map<String, String> params = getParams(request);
		StringBuilder url = new StringBuilder(requestUrl);
		url.append("?");
		boolean containPageParam=false;
		for(String name:params.keySet()){
			if("start".equals(name) && !containPageParam){
				url.append("start="+(page-1)*this.page.getPageSize()+"&");
				containPageParam=true;
			}else{
				url.append(""+name+"="+UrlUtils.encode(params.get(name))+"&");
			}
		}
		if(!containPageParam){
			url.append("start="+(page-1)*this.page.getPageSize()+"&");
		}
		return url.toString();
	}
	private static String ModifiableParametersAttr = "modifiableParameters";
	private Map<String,String> getParams(ServletRequest request){
		Enumeration parameterNames = request.getParameterNames();
		Map<String,String> params = new HashMap<String,String>();
		while(parameterNames.hasMoreElements()) {
			String name = parameterNames.nextElement().toString();
			String parameter = request.getParameter(name);
			if(parameter!=null && !"".equals(parameter)){
				params.put(name, parameter);
			}
		}
		Map<String,String> modifParams =(Map<String,String> )request.getAttribute(ModifiableParametersAttr);
		if(modifParams!=null){
			params.putAll(modifParams);
		}
		return params;
	}
}
/** print out html as below **/
/**

<div >
<ul class="pagination pagination-sm">
	 <% if (page.hasPreviousPage()){%>
           	<li><a href="<%=page.getHref(1,request)%>">&lt;&lt;</a></li>
            <li><a href="<%=page.getHref(current-1,request)%>">&lt;</a></li>
     <%}else{%>
            <li class="disabled"><a href="#">&lt;&lt;</a></li>
            <li class="disabled"><a href="#">&lt;</a></li>
     <%} %>

	<c:forEach var="i" begin="${begin}" end="${end}">
        <c:choose>
            <c:when test="${i == current}">
                <li class="active"><a href="${page.href(i,request) }">${i}</a></li>
            </c:when>
            <c:otherwise>
                <li><a href="${page.href(i,request) }">${i}</a></li>
            </c:otherwise>
        </c:choose>
    </c:forEach>
  
  	 <% if (page.hasNextPage()){%>
           	<li><a href="<%=page.getHref(current+1,request)%>">&gt;</a></li>
            <li><a href="<%=page.getHref(page.getTotalPages(),request)%>">&gt;&gt;</a></li>
     <%}else{%>
            <li class="disabled"><a href="#">&gt;</a></li>
            <li class="disabled"><a href="#">&gt;&gt;</a></li>
     <%} %>

</ul>
</div>
**/
