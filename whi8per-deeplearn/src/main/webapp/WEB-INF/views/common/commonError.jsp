<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../includes.jsp" %>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  </head>
  <body>
   <div class="wrapper">
		<div class="alert alert-error">
			<b>Oh snap!</b> ${exception.localizedMessage}
		</div>
		<div class="stacktrace">
			<p>
				Exception stack trace detail:
	        </p>
			<small>
				<c:forEach items="${exception.stackTrace}" var="trace">
		           <c:out value="${trace}" />
		           <br />
		        </c:forEach>
	        </small>
        </div>
    </div>
  </body>
</html>
