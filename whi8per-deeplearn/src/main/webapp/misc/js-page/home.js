$(function() {
	
	$("#search_form").attr("action",ctx+"/deeplearn");
	
	/**
	 * add click event at search button by name
	 */
	function queryByName(){
		$("#search_form").submit();
	}
	$(".search-name").click(function(){
		queryByName();
	});
	$("#inputName").keydown(function(e) {
		if (e.which == 13) { queryByName(); }
	});
	
});