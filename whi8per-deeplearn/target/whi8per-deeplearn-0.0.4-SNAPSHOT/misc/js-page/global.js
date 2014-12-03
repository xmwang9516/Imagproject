/**
 * global methods for help improve develop experience
 * by hou dejun
 */

!function ($) {
	var originAlert = null;
	var originConfirm = null;
	var confirmHtml='\
	<div class="modal hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
	 <div class="modal-body">\
	    <p>One fine body…</p>\
	  </div>\
	  <div class="modal-footer">\
	    <button class="btn cancel">Cancel</button>\
	    <button class="btn ok btn-primary">Ok</button>\
	  </div>\
	</div>';
	
	var alertHtml='\
		<div class="modal hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
		 <div class="modal-body">\
		    <p></p>\
		  </div>\
		  <div class="modal-footer">\
		    <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">Ok</button>\
		  </div>\
		</div>';
	
	var messageHtml='\
	  <div class="alert alert-block fade in">\
        <button type="button" class="close" data-dismiss="alert">×</button>\
        <h4 class="alert-heading">Oh snap! You got an error!</h4>\
        <p></p>\
      </div>';
	
	var loadingHtml='\
		  <div class="modal modal-loading">\
		 	<div class="modal-body"><p><img src="{ctx}/misc/images/ajax-loader.gif"</p></div> \
	      </div>';
	
	/**
	 * override the default confirm method
	 */
	originConfirm = window.confirm;
	window.confirm=function(message, successCallback,failCalBack) {
		var dialog = $(confirmHtml);
		dialog.on("show", function() {    // wire up the OK button to dismiss the modal when shown
			dialog.find(".modal-footer .ok").on("click", function(e) {
				if(successCallback){
					successCallback(true);
				}
		    	dialog.modal('hide');     // dismiss the dialog
			});
			dialog.find(".modal-footer .cancel").on("click", function(e) {
				if(failCalBack){
					failCalBack(false);
				}
				dialog.modal('hide');     // dismiss the dialog
			});
		})
		.find(".modal-body p").html(message).end()
		.modal({backdrop:'static'});
	};
	
	/**
	 * override the default alert method
	 */
	originAlert = window.alert;
	window.alert=function(message) {
		$(alertHtml).find(".modal-body p").html(message).end()
		.modal({backdrop:'static'});
	};
	
	/**
	 * show a message in the page, this is different with alert.
	 */
	window.showMessage = function(message){
		$(messageHtml).appendTo("#message")
		.find("h4")
		.html(message).end()
		.addClass("alert-info")
		.alert();
	};
	
	/**
	 * show a error message in the page.
	 */
	window.showError = function(message){
		$(messageHtml).appendTo("#message")
		.find("h4")
		.html(message).end()
		.addClass("alert-error")
		.alert();
	};
	
	//重新设置canvas的大小
	function resizeCanvas(canvas){
	    var H = $(window).height();
		var canvas = $(canvas);
		if(canvas.length>0){
			var top = canvas.offset().top;
			h = H-top - 60 ; // 30 is the padding of the content_canvas
			canvas.height(h);
		}
	};
	// 调整canvas的大小，并绑定自动调整事件
	window.adjustCanvas = function(canvas){
		//绑定自动大小设置
		$(window).bind('resize', function() { 
			resizeCanvas(canvas);
		});
		resizeCanvas(canvas);
	};
	
	window.addScript=function(url){
	    var s = document.createElement("script");
	    s.type = "text/javascript";
	    s.src = url;
	    // Use any selector
	    $("head").append(s);
	};
	var __loading=null;
	var __disableLoading = false;
	window.showLoading = function(){
		if(__disableLoading || __loading){
			return;
		}
		
		loadingHtml = loadingHtml.replace("\{ctx\}",ctx);
//		$("body>.modal").remove();
		__loading =$(loadingHtml).appendTo("body").modal({backdrop:'static'});
		$(".modal-backdrop").addClass("modal-backdrop-white");
	};
	window.hideLoading = function(){
		if(__loading){
			__loading.modal('hide');
			__loading = null;
		}
	};
	
	/**
	 * define a popupForm function,
	 * 1. this function will popup a model dialog, and fill the form with data from datum.
	 * 2. binding different form-action
	 */
	var popup_form_org_action = null;
	window.popupForm = function(container,datum,callback,failCallback){
		container = $(container);
		container.modal();
		// give default failCallBack function
		if(!failCallback)failCallback = function(errorThrown){
			alert(errorThrown+"");
		};
		//binding event
		if(!container.data("popup-form")){
			popup_form_org_action = container.find("form").attr("action");
			// binding send ajax request
			container.find("form").submit(function(e){
			    var postData = $(this).serializeArray();
			    var formURL = $(this).attr("action");
			    $.ajax({
			        url : formURL,
			        type: "POST",
			        data : postData,
			        success:function(data, textStatus, jqXHR){
			            //data: return data from server
			        	container.modal('hide');
			        	if(callback)callback(data);
			        },
			        error: function(jqXHR, textStatus,errorThrown){
			            //if fails
			        	container.modal('hide');
			        	if(failCallback)failCallback(errorThrown);
			        }
			    });
			    e.preventDefault(); //STOP default action
			});
			var windowConfirm = null;
			//binding button click event handler
			container.find("button").click(function(btne){
				var confirmMessage = $(this).attr("confirm-message");
				if(windowConfirm==null && confirmMessage && ""!==confirmMessage){
					if(!originConfirm(confirmMessage)){
						return;
					}
				}
				var formAction = $(this).attr("form-action");
				if(formAction && ""!==formAction){
					container.find("form").attr("action",formAction);
				}else{
					container.find("form").attr("action",popup_form_org_action);
				};
			});
			container.data("popup-form",true);
		}
		if(datum){
			container.find(":input").each(function(){
				var name = $(this).attr("name");
				if(datum[name]){
					$(this).val(datum[name]);
				}
			});
		}
	};

	   
	/**
	 * 全局预加载完成事件（onload)处理区块
	 */
	$(function(){
		$("a.post-link").postlink();
		/**
		 * set global ajax option
		 */
		$.ajaxSetup({
			timeout: 30000, //10 second timeout, 
			error: function(jqXHR, status, errorThrown){   //the status returned will be "timeout" 
			  hideLoading();
			  if(errorThrown==="timeout") {
		          alert("request timeout");
			  } else if(errorThrown && (typeof errorThrown === 'string') && errorThrown!=""){
				  alert(errorThrown);
			  } else if(errorThrown && $.isPlainObject(errorThrown)){
		          alert(errorThrown.message);
			  }else if(jqXHR.status==0){
				  // this indicated that need a refresh operation.
				  location.reload(true);
			  }else {
				  alert("request error");
			  }
			},
		});
		
	});

	
	/**
	 * extends postlink method
	 */
	$.fn.postlink = function(options){
        var defaults = {
	            enabled: true,
	            debug: true
	        };
	        var options = $.extend(defaults, options);
	        return this.each(function() {
	            var $obj = $(this);
	            if ( $obj[0].tagName != "A") {
	                return;
	            }
	            $obj.click(function(clickEvent) {
	                clickEvent.preventDefault();
	                var $link=$(this);
	                var confirmMessage = $link.attr("confirm-message");
	                //如果有message，提示message
	    			if(confirmMessage && ""!==confirmMessage){
	    				confirm(confirmMessage,function(){
    					   var href=$link.attr("href");
    					   var hrefObj = parseLink(href);
    					   var $linkForm = createPostForm(hrefObj);
    					   $('body').append($linkForm);
    					   $linkForm.submit();
	    				});
	    				return;
	    			}
	                
	                var href=$link.attr("href");
	                var hrefObj = parseLink(href);
	                var $linkForm = createPostForm(hrefObj);
	                $('body').append($linkForm);
	                $linkForm.submit();
	            });
	        });
	    };
	    function createPostForm(hrefObj) {
            var linkForm = document.createElement("form");
            $linkForm = $(linkForm);
            if (hrefObj.url && hrefObj.url.length > 0) {
                $linkForm.attr("action", hrefObj.url);
            }
            $linkForm.attr("method", "post");
            var thisDate = new Date();
            $linkForm.attr("id", "postlinkForm_" + thisDate.getTime());
            var counter=0;
            for (var parmKey in hrefObj.keyPairs) {
                var input = document.createElement("input");
                input.name = parmKey;
                var $input = $(input);
                $input.attr("id", "postlink_hidden_" + parmKey + counter + "_input");
                $input.attr("type", "hidden");
//                $input.attr("name", parmKey);
                $input.attr("value", hrefObj.keyPairs[parmKey]);
                $linkForm.append($input);
            }
            return $linkForm;
        }

        function parseLink(linkHref) {
            var hrefObj = {
                url: null,
                keyPairs: {}
            };
            if ( linkHref.match(/\?/) ) {
                var urlParts = linkHref.split('?');
                if (urlParts[0] !== "" || urlParts[0] > 0) {
                    hrefObj.url = urlParts[0];
                }
                var queryString = urlParts[1];
                var hrefKeyPairs = queryString.split('&');
                while (hrefKeyPairs.length > 0) {
                    var keyPair = hrefKeyPairs.shift().split('=');
                    hrefObj.keyPairs[decodeURIComponent(keyPair[0])] = decodeURIComponent(keyPair[1]);
                }
            } else {
                hrefObj.url = linkHref;
            }
            return hrefObj;
        }
}(window.jQuery);