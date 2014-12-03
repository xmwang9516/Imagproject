<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../includes.jsp"%>

<html>
<head>
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Home</title>

<!-- BEGIN CORE CSS FRAMEWORK -->
<link href="${ctx}/misc/theme/plugins/boostrapv3/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/misc/theme/plugins/boostrapv3/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/misc/theme/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/misc/theme/css/animate.min.css" rel="stylesheet" type="text/css"/>
<!-- END CORE CSS FRAMEWORK -->

<!-- BEGIN CSS TEMPLATE -->
<link href="${ctx}/misc/theme/css/style.css" rel="stylesheet" type="text/css"/>
<!-- END CSS TEMPLATE -->



<!-- BEGIN CORE JS FRAMEWORK -->
<script src="${ctx}/misc/theme/plugins/jquery-1.8.3.min.js" type="text/javascript"></script>
<script src="${ctx}/misc/theme/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>
<script src="${ctx}/misc/theme/plugins/boostrapv3/js/bootstrap.min.js" type="text/javascript"></script>
<!-- END CORE JS FRAMEWORK -->

<!-- BEGIN PAGE LEVEL JS -->
<script src="${ctx}/misc/theme/plugins/pace/pace.min.js" type="text/javascript"></script>
<script src="${ctx}/misc/theme/plugins/jquery-slider/jquery.sidr.min.js" type="text/javascript"></script>
<script src="${ctx}/misc/theme/plugins/jquery-numberAnimate/jquery.animateNumbers.js" type="text/javascript"></script>
<script src="${ctx}/misc/theme/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script> 

<!-- Core js functions -->
<script src="${ctx}/misc/js-page/global.js"></script>
<!-- Core js functions -->


<!-- PAGE CSS -->

<link href="${ctx}/misc/styles/style.css" rel="stylesheet" />
<link href="${ctx}/misc/styles/searchBar.css" rel="stylesheet" />
<link href="${ctx}/misc/styles/deeplearn.css" rel="stylesheet" />
<link href="${ctx}/misc/styles/image.css" rel="stylesheet" />

<link href="${ctx}/misc/fancybox/jquery.fancybox.css" rel="stylesheet" />  
<link href="${ctx}/misc/fancybox/jquery.fancybox-buttons.css" rel="stylesheet" /> 

<!-- jquery-flickr css -->
<link rel="stylesheet" href="${ctx}/misc/jquery-flickr/vendor/Gallery-2.15.0/css/blueimp-gallery.min.css" />
<link rel="stylesheet" href="${ctx}/misc/jquery-flickr/vendor/Bootstrap-Image-Gallery-3.1.0/css/bootstrap-image-gallery.min.css" />

<script type="text/javascript">
	var _ctx = "${ctx}";
	var webcontext = _ctx, webContext = _ctx;
	window.webcontext = window.webContext = window.ctx = _ctx;
</script>

</head>
<body>
	<div id="container" class="page-container row">
		<div class="page-content">
			
			<!-- search result ： people list -->
			<div class="p-c-l-3">
				<div class="search-bar">
					<div class="col-md-12 search-content no-padding">
						<%@ include file="../searchBar.jsp"%>
					</div>
				</div>
				<div class="people-list ">
					<ul class="list">
						<div id="tag_list" class="tag_list">
							{{#list}}
							<li id="{{gid}}">
								<div class="row">
								
								 <div class="btnspace" > " "</div>
						           <div  class="info pull-to-left">
										<a class="detail">{{{tag1}}} </a>
									</div> 
									
									
									 <div class="btntxt btngrpid" >{{gid}}</div>
									
									
									<div class="info2 pull-to-left">
										<a class="detail2">{{{tag2}}}</a>
									</div>
									
								</div>
							</li> 
							{{/list}}
						</div>
					</ul>
					
					<div class="row">
					<div class="search-pagination">
						 <ul id="total"></ul>
					     <ul id="search-paginator"></ul>
				    </div>
					</div>
					
				</div>
			</div>
			<!-- search result ： attribute images  -->
			
			<div class="p-c-r-9">
				<div class="widget-content" id="note-widget">
					<div class="wrap" id="note-wrap">
						<div id="img_list" class="img_list">
							<ul>
								{{#list}}
								<li id="item_{{id}}">
									<div class="row-item">
										<div class="img">
											<p style="text-align: center">
											<a class="fancybox-media" href="{{imgurl}}">
													<img src="{{imgurl}}" >
												</a>
											<!--  	<img src="{{imgurl}}">  -->
											</p>
										</div>
										<div class="clear"></div>
									</div>
								</li> 
								{{/list}}
							</ul>
						</div>
						<div class="loadmore"><a href="#">Load More</a></div>
					</div>
					
				</div>
			</div>
			
<!-- image gallery  -->	
		<div class="gallerycontainer">

        <div class="gallery">
            <div class="rowgallery">
                <div class="col-xs-12 spinner-wrapper">
                    <div class="spinner"></div>
                </div>
                <div class="gallery-container">
                </div>
            </div>
        </div>

        <div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls">
            <div class="slides"></div>
            <h3 class="title"></h3>
            <a class="prev">‹</a>
            <a class="next">›</a>
            <a class="close">×</a>
            <a class="play-pause"></a>
            <ol class="indicator"></ol>
            <div class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-hidden="true">&times;</button>
                            <h4 class="modal-title"></h4>
                        </div>
                        <div class="modal-body next"></div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default pull-left prev">
                                <i class="glyphicon glyphicon-chevron-left"></i>
                                Previous
                            </button>
                            <button type="button" class="btn btn-primary next">
                                Next
                                <i class="glyphicon glyphicon-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <script type="text/javascript">
        $(function() {
            
            // Set blueimp gallery options.
            $.extend(blueimp.Gallery.prototype.options, {
                useBootstrapModal: false,
                hidePageScrollbars: false
            });

            // Engage gallery.
            $('.gallery').flickr({
                apiKey: '59ac8916e80833e67ab731f8c95dfdde',
                photosetId: '72157630137235910'
            });
        });
        </script>
    </div>
		
			
		
        
			
			
			
			
			<!-- 
			<div class="col-md-9 p-l-0">
				<div class="people-analysis">
					<div class="title">分析结果：</div>
					<div class="row"></div>
				</div>
			</div>
			 -->
		</div>
		
		
<span class="visible-desktop" style="font-size: 1px !important"
	id="cwspear-is-awesome">.</span>
<div id="back-to-top">
	<a href="#">Back to Top</a>
</div>
	
	
</div>
	</div>
	<!-- PAGE JS -->
	<script src="${ctx}/misc/theme/js/tabs_accordian.js"
		type="text/javascript"></script>
	<script src="${ctx}/misc/js/highstock.js" type="text/javascript"></script>
	<script src="${ctx}/misc/js/highcharts-more.js" type="text/javascript"></script>
	<script src="${ctx}/misc/js/echarts-plain-map.js"
		type="text/javascript"></script>
	<script src="${ctx}/misc/js/mustache.js" type="text/javascript"></script>
	<script src="${ctx}/misc/js/d3.v3.min.js" type="text/javascript"></script>
	<script src="${ctx}/misc/js/d3.layout.cloud.js" type="text/javascript"></script>
	<script src="${ctx}/misc/js/jquery.nicescroll.min.js"
		type="text/javascript"></script>
	<script src="${ctx}/misc/js/bootstrap-paginator.min.js"
		type="text/javascript"></script>
		
	<!-- jqyery-flickr CSS -->
    <script src="${ctx}/misc/jquery-flickr/vendor/imagesloaded.pkgd.min.js"></script>
    <script src="${ctx}/misc/jquery-flickr/vendor/Gallery-2.15.0/js/jquery.blueimp-gallery.min.js"></script>
    <script src="${ctx}/misc/jquery-flickr/vendor/Bootstrap-Image-Gallery-3.1.0/js/bootstrap-image-gallery.min.js"></script>
    <script src="${ctx}/misc/jquery-flickr/js/flickr-jquery.js"></script> 
	
	
	<script  src="${ctx}/misc/fancybox/jquery.fancybox.min.js" type="text/javascript"></script>
	<script  src="${ctx}/misc/fancybox/jquery.fancybox-buttons.js" type="text/javascript"></script>
	
		
	<script src="${ctx}/misc/js-page/deeplearn.js" type="text/javascript"></script>
	
	

<script type="text/javascript">
	$(document).ready(function () {
	var queryButtonSelection = ".search-name";
	$(queryButtonSelection).click();
	
	});
	
    
</script>


    



</body>
</html>

