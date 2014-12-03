$(function() {
	//load people list template
	var people_list_panel = $(".people-list ul:first");
	var people_list_template = people_list_panel.html();
	people_list_panel.empty();
	
	
	var imgPanel = $("#img_list ul");
	var imgTemplate =imgPanel.html();
	imgPanel.empty();
	imgTemplate = imgTemplate.replace(/%7B%7B/g, '{{').replace(/%7D%7D/g, '}}');
	//imgPanel.css("display","none"); // for debug the image gallery;
	
	
	adjustCanvas("body .page-content");
	resize();
	
	/****************************** load image fancybox Option ****************************************************/
	var fancyboxOption = {
			openEffect: 'elastic',closeEffect: 'elastic',type: 'image',scrolling: 'auto',
			afterLoad: function(){
				$(".fancybox-wrap").appendTo(".fancybox-overlay");
				$("html").addClass("fancybox-lock").addClass("fancybox-margin");
			},	
			helpers		: {
				title	: { type : 'inside' },
				buttons	: {}
			}
	};
	
	//resize and niceScroll
	function resize(active){
		var top = 124;
		if(active){
			top = 197;
		}
		var height = $(".page-content").height() - top;
	}
	
	
	$(window).bind('resize', function() { 
		resize();
	});
	
	/**
	 * add click event at search button by name
	 */
	function queryByName(){
		showLoading();
		$(".people-list").hide();
		var moreParameters = {};//  = getMoreParameters();
		moreParameters["tag"] = $("#inputName").val();
		queryPeopleList(moreParameters);
		hideLoading();
	}
	$(".search-name").click(function(){
		queryByName();
	});
	
	$("#inputName").keydown(function(e) {
		if (e.which == 13) { 
			var moreParameters = {};
			moreParameters["tag"] = $("#inputName").val();
			showLoading();
			$(".people-list").hide();
			queryPeopleList(moreParameters);
			hideLoading();
			return false;
		}
	});	
	
	
	var cacheParameters;
	
	/**
	 * 加载page页面的点击事件
	 */
	function peopleListPageClick(start){
		if(cacheParameters && cacheParameters!=null){
			cacheParameters["start"]=start;
		}
		queryPeopleList(cacheParameters);
	}
	
	var currentPage ;
	var currentOrder;
	var currentAttrt;
	var imgpageSize ;//  56;
	
	// get the window height and width;
	
	var imgsRow = Math.floor((document.body.clientHeight-150)/170);
	var imgsCol = Math.floor((document.body.clientWidth*0.7)/170);
	
	imgpageSize = (imgsRow+1) * imgsCol ;
	
	function queryPeopleList(moreParameters){
		cacheParameters = moreParameters;
		$.getJSON(ctx + "/deeplearn/s",moreParameters , function(data) {
			if(!data || data['totalCount'] == null || typeof data["list"] == 'undefined' || data['list'] == null){
				return ;
			}
			var peopleList = data['list'];
			var totalCount = data['totalCount'];
			$('.loadmore').css("display","block");
			
			if(totalCount == 0){
				imgPanel.empty().html(html);
				people_list_panel.empty().html(html);
				$("#total").text(totalCount+" results");
				$('.loadmore').css("display","none");
				$("#search-paginator").css("display","none");
				$(".people-list").css("display","block");
			}else{
				var html = Mustache.to_html(people_list_template, {
					list : peopleList,
					totalCount : totalCount
				});
				people_list_panel.empty().html(html);
				$("#search-paginator").css("display","block");
				
				people_list_panel.empty().html(html).find(".detail2").click(function() {
					$(".row .info").css("background", "none");
					$(".row .info2").css("background", "none");
					$(".row .detail").css("color","rgb(211, 211, 211)");
					$(".row .detail2").css("color","rgb(211, 211, 211)");
					$(this).parent().css("background","grey");
					$(this).css("color","white");
					$('.loadmore').css("display","block");
					refreshNegImgList($(this).parent().parent().parent());
				  });
				people_list_panel.find(".detail").click(function() {
					$(".row .info").css("background", "none");
					$(".row .info2").css("background", "none");
					$(".row .detail").css("color","rgb(211, 211, 211)");
					$(".row .detail2").css("color","rgb(211, 211, 211)");
					$(this).parent().css("background","grey");
					$(this).css("color","white");
					$('.loadmore').css("display","block");
					refreshPosImgList($(this).parent().parent().parent());
				});
				refreshPosImgList($("#tag_list li").first());
				// default highlight the first result in the first attribute of returned results;
				var elem = $("#tag_list li").first();
				$(elem).find(".detail").css("color","white");
				$(elem).find(".detail").parent().css("background","grey");
				// default highlight the first result in the first attribute of returned results;
				
				//------------- pagination  -------------//
				var page = data.page;
				var pageSize = page.pageSize;
				var maxDisplayPage = page.maxDisplayPage;
				var current = page.page;
				var begin = Math.max(1, current - maxDisplayPage / 2);
				var totalPages = Math.min(begin + (maxDisplayPage - 1),page.totalPages);
				$("#total").text(totalCount+" results");
				if (totalPages>0){
					$(".search-pagination #search-paginator").bootstrapPaginator({
						size : "small",
						bootstrapMajorVersion : 3,
						currentPage : current,
						totalPages : page.totalPages,
						onPageClicked : function(e, originalEvent, type,page) {
							var pages = $(e.currentTarget).bootstrapPaginator("getPages");
							if (pages.current != page) {
								peopleListPageClick((page - 1) * pageSize);
							}
						}
					});
				}
				$(".people-list").css("display","block");
			}
		});
	}
	
	function refreshPosImgList(ele){
		$("#tag_list li").removeClass("selected");
		$(ele).addClass("selected");
		showLoading();
		currentOrder = $(ele).attr("id");
		currentPage = 1;
		currentAttrt = 1;
		 $.getJSON(ctx+"/deeplearn/img_list.json?gid="+currentOrder+"&page="+currentPage+"&imgperpage="+imgpageSize+"&attr="+currentAttrt, function(list) {
			 if(!list || typeof list[0] == 'undefined' || list[0] == null){
					return;
				}
			  var html = Mustache.to_html(imgTemplate, {
				  list : list
			  });
			  imgPanel.empty().html(html);
			  
			  $(".row-item .img a").attr('rel', 'gallery').fancybox(fancyboxOption);
			  
			  
			  hideLoading();
			  resize();
			  
//			  var key = list.length;
//		      var element = $('.gallery-container');
//		      $.each(list, function(key, list) {
//		         var img = $('<img>', { 'class': 'thumb img-thumbnail img-responsive', src: list.imgurl });
//		         element.append($('<div></div>', { 'class': 'col-lg-2 col-md-2 col-xs-6 col-center' })
//		                  .append($('<a></a>', { 'class': '', href: list.imgurl, 'data-gallery': '' })
//		                   .append(img)));
//		         });
//
//		        element.imagesLoaded()
//		               .done($.proxy($(element)._flickrAnimate, $(element)))
//		               .always($.proxy($(element)._hideSpinner, $(element)));
		        
		       
		        
		        
		  });
	}
	
	function refreshNegImgList(ele){
		$("#tag_list li").removeClass("selected");
		$(ele).addClass("selected");
		showLoading();
		currentOrder = $(ele).attr("id");
		currentPage = 1;
		currentAttrt = 2;
		 $.getJSON(ctx+"/deeplearn/img_list.json?gid="+currentOrder+"&page="+currentPage+"&imgperpage="+imgpageSize+"&attr="+currentAttrt, function(list) {
			 if(!list || typeof list[0] == 'undefined' || list[0] == null){
					return;
				}
			  var html = Mustache.to_html(imgTemplate, {
				  list : list
			  });
			  imgPanel.empty().html(html);
			  
			  $(".row-item .img a").attr('rel', 'gallery').fancybox(fancyboxOption);
			  
			  hideLoading();
			  resize();
			  
			  
//			  var key = list.length;
//		      var element = $('.gallery-container');
//		      $.each(list, function(key, list) {
//		         var img = $('<img>', { 'class': 'thumb img-thumbnail img-responsive', src: list.imgurl });
//		         element.append($('<div></div>', { 'class': 'col-lg-2 col-md-2 col-xs-6 col-center' })
//		                  .append($('<a></a>', { 'class': '', href: list.imgurl, 'data-gallery': '' })
//		                   .append(img)));
//		         });
//
//		        element.imagesLoaded()
//		               .done($.proxy($(element)._flickrAnimate, $(element)))
//		               .always($.proxy($(element)._hideSpinner, $(element)));
		      
		        
		  });
	}
	
	$('.loadmore a').click(function(){
		showLoading();
		currentPage +=1;
		$.getJSON(ctx+"/deeplearn/img_list.json?gid="+currentOrder+"&page="+currentPage+"&imgperpage="+imgpageSize+"&attr="+currentAttrt, function(list) {
			if(!list || typeof list[0] == 'undefined' || list[0] == null){
					return;
			}
			var html = Mustache.to_html(imgTemplate, {
				list : list
			});
			$(html).each(function(){
        		$(this).appendTo(imgPanel);
        	});
			if(list.length < imgpageSize)
			{
				$('.loadmore').css("display","none");
			}
				
			$("#note-wrap").getNiceScroll().resize().show();
			
			$(".row-item .img a").attr('rel', 'gallery').fancybox(fancyboxOption);
			 
			 
			resize();
			hideLoading();
		});
	});
	
	function mousePos(e){ 
	    var x,y; 
	    var e = e||window.event; 
	    return { 
	        x:e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft, 
	        y:e.clientY+document.body.scrollTop+document.documentElement.scrollTop 
	    }; 
	}
	
	
	

	 
	
	
	
});