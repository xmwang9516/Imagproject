<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="includes.jsp" %>
<html >
  <head>
 	<title>Access to this page is forbidden</title>
 	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<meta http-equiv="Cache-Control" content="no-store" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<!-- <link href="${ctx}/misc/images/favicon.ico" type="image/x-icon" rel="shortcut icon"> -->
	
	<!-- bootstrap style sheets -->
	<link href="${ctx}/misc/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	
	<!-- start theme style sheets  -->
	<link href="${ctx}/misc/theme/css/icons.css" rel="stylesheet" />
	<!-- app style sheets -->
	<link href="${ctx}/misc/theme/css/app.css" rel="stylesheet" />
	<!-- end of theme style sheets -->
	
	<!-- Custom style sheets ( Put your own changes here ), 
		this style contain some modify or other style for our application -->
	<link href="${ctx}/misc/styles/style.css" rel="stylesheet" />
	
	<!-- Le javascript ================================================== -->
	<!-- Important plugins put in all pages -->
	<script src="${ctx}/misc/js/jquery.js" type="text/javascript"></script>
	<script src="${ctx}/misc/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	
	<script src="${ctx}/misc/theme/js/conditionizr.min.js"></script>  
	<script src="${ctx}/misc/theme/js/jquery.genyxAdmin.js"></script>
	<script src="${ctx}/misc/theme/js/plugins/core/jrespond/jRespond.min.js"></script>
	<script src="${ctx}/misc/theme/js/plugins/forms/uniform/jquery.uniform.min.js"></script>
	
	<!-- Init plugins -->
	<script src="${ctx}/misc/theme/js/app.js"></script><!-- Core js functions -->
 	<script src="${ctx}/misc/theme/js/pages/error-pages.js" type="text/javascript" ></script>
    <script type="text/javascript">
    </script>
  </head>
  <body>
  	 <div class="container-fluid">

        <div class="errorContainer">
            <h2 class="center gap20">Access to this page is forbidden</h2>

            <div class="center gap-bottom5">
                <div class="or center"><strong>or</strong></div>
                <hr class="seperator">

                <a href="javascript: history.go(-1)" class="btn"><i class="icon16 i-arrow-left-7 gap-left0"></i> Go back</a>
                <a href="${ctx}" class="btn"><i class="icon16 i-home-6 gap-left0"></i> Home</a>
            </div>

        </div>
        
    </div>
  </body>
</html>
