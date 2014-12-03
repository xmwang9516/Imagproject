$(function(){
	showLoading();
	var profileUrl = ctx + "/profile/profile.json?peopleid="+peopleId;
	$.getJSON(profileUrl, function(data) {
		var statistic = data["statistic"];
		var hashtagData = data["hashtag"];
		var mentionData = data["mentions"];
		var peopleData = data["people"];
		var entityData = data["entity"];
		var sentimentTrack = data["sentitrack"];
		var sentimentData = data["sentiments"];
		var tweetsData = data["tweets"];
		var phraseData = data["phrase"];
		var imagesData = data["images"]
		var timeLineData = data["notetrack"];
		//panel-社交指数
		drawStatisticSocial("#profileMore #column1",statistic);
		
		//panel-发帖数
		drawStatisticPost("#profileMore #column1",statistic);
		
		//panel-转发数
		drawStatisticRetweet("#profileMore #column1",statistic);
		
		//panel-评论数
		drawStatisticComment("#profileMore #column1",statistic);
		
		//panel-个人兴趣
		var interestChart = drawNormalGrid("interestPie","个人兴趣","",12,167);
		$("#profileMore #column2").append(interestChart);
		drawInterestCloud("interestPie",peopleData["interest"],"#ffffff");
		
		//panel-提及好友
		var mentionHtml = drawNormalGrid("mentionCloud","互动好友","",12,167);
		$("#profileMore #column2").append(mentionHtml);
		drawMentionCloud("mentionCloud",mentionData,"#ffffff");
		
		//panel-关注话题
		var hashtagHtml = drawNormalGrid("hashtagCloud","参与话题","",12,167);
		$("#profileMore #column2").append(hashtagHtml);
		drawHashtagCloud("hashtagCloud",hashtagData,"#ffffff");
		
		//panel-语义短语
		var phraseChart = drawNormalGrid("phraseCloud","语义短语","",12,167);
		$("#profileMore #column2").append(phraseChart);
		drawPhraseCloud("phraseCloud",phraseData,"#ffffff");
		
		//panel-关注人物
		var entityPersonHtml = drawEntityPanel("entityPerson","关注人物","entity-bg-color");
		$("#profileMore  #column2").append(entityPersonHtml);
		drawEntityCloud("entityPerson",entityData,"2");
		
		//panel-关注品牌
		var entityBrandHtml = drawEntityPanel("entityBrand","关注品牌","entity-bg-color");
		$("#profileMore #column2").append(entityBrandHtml);
		drawEntityCloud("entityBrand",entityData,"4");
		
		//panel-关注地点
		var entityLocHtml = drawEntityPanel("entityLoc","关注地点","entity-bg-color");
		$("#profileMore #column2").append(entityLocHtml);
		drawEntityCloud("entityLoc",entityData,"3");
		
		//panel-关注机构
		var entityOrgHtml = drawEntityPanel("entityOrg","关注机构","entity-bg-color");
		$("#profileMore #column2").append(entityOrgHtml);
		drawEntityCloud("entityOrg",entityData,"1");
		
		//panel-个人情感
		drawSentimentPanel("#profileMore #row2",statistic["sentimentExp"], sentimentData["positive"],sentimentData["negative"],"sentimentChart");
//		drawSentimentChart("sentimentChart",200,sentimentTrack);
		drawSentimentPie("sentimentPie",sentimentData);
		
		//panel-热门微博
		drawHotTweets("#profile",tweetsData);
		
		//panel-热门图片
		var showImageData = [];
		imagesData.map(function(image){
			if(image.image){
				showImageData.push(image);
			}
		});
		drawHotImages("#profileMore #row3",showImageData);
		
		//panel-timeline
		drawTimeLine("#profile",timeLineData,peopleData);
		
		//
		hideLoading();
		$('#staFollowers').animateNumbers(follows,",",2000);
		$('#staFriends').animateNumbers(friends,",",2000);
		$('#staPosts').animateNumbers(posts,",",2000);
	});
	
	/**
	 * 构建社交指数内容html
	 */
	function drawStatisticSocial(parentSelection,statistic){
		var statisticSocialHtml = drawStatistic("社交统计","users",
				"社交指数","分数","socialExp",
				"影响力排名","名次","influence",
				"覆盖人群","人数","socialCover",
				"活跃度","分数","socialActivity");
		var SocialHtml = drawStatisticGrid("social",'',statisticSocialHtml,12,394);
//		return SocialHtml;
		$(parentSelection).append(SocialHtml);
		
		//动态数字效果
		if(statistic.socialExp){
			$('#socialExp').animateNumbers(statistic.socialExp,",",2000);
		}
		if(statistic.influence){
			$('#influence').animateNumbers(statistic.influence,",",1000);
		}
		if(statistic.socialCover){
			$('#socialCover').animateNumbers(statistic.socialCover,",",2000);
		}
		if(statistic.activity){
			var activity = statistic.activity.toFixed(3);
			$('#socialActivity').animateNumbers(activity,"",1000);
		}
	}
	
	/**
	 * 构建发帖数统计内容html
	 */
	function drawStatisticPost(parentSelection,statistic){
		var statisticSocialHtml = drawStatistic("发帖数统计","share",
				"总帖数","条","posts",
				"平均帖数","条/天","postAvg",
				"原创总帖数","条","postOri",
				"平均原创帖数","条/天","postOriAvg",
				"转发总帖数","条","postRet",
				"平均转发帖数","条/天","postRetAvg");
		var SocialHtml = drawStatisticGrid("social",'',statisticSocialHtml,12,544);
		$(parentSelection).append(SocialHtml);
		//动态数字效果
		if(statistic.posts){
			$('#posts').animateNumbers(statistic.posts,",",2000);
		}
		if(statistic.postAvg){
			var postAvg = statistic.postAvg.toFixed(3);
			$('#postAvg').animateNumbers(postAvg,"",1000);
		}
		if(statistic.postOri){
			$('#postOri').animateNumbers(statistic.postOri,",",2000);
		}
		if(statistic.postOriAvg){
			var postOriAvg = statistic.postOriAvg.toFixed(3);
			$('#postOriAvg').animateNumbers(postOriAvg,"",1000);
		}
		if(statistic.postRet){
			$('#postRet').animateNumbers(statistic.postRet,",",2000);
		}
		if(statistic.postRetAvg){
			var postRetAvg = statistic.postRetAvg.toFixed(3);
			$('#postRetAvg').animateNumbers(postRetAvg,"",1000);
		}
	}
	
	/**
	 * 构建被转发数统计内容html
	 */
	function drawStatisticRetweet(parentSelection,statisitc){
		var statisticRetweetHtml = drawStatistic("被转发数统计","retweet","平均被转发数","次/条","retAvg","最大被转发数","次","retMax","最小被转发数","次","retMin");
		var retweetHtml = drawStatisticGrid("retweet",'',statisticRetweetHtml,12,309);
		$(parentSelection).append(retweetHtml);
		//动态数字效果
		if(statisitc.retweetAvg){
			$('#retAvg').animateNumbers(statisitc.retweetAvg,",",2000);
		}
		if(statisitc.retweetMax){
			$('#retMax').animateNumbers(statisitc.retweetMax,",",2000);
		}
		if(statisitc.retweetMin){
			$('#retMin').animateNumbers(statisitc.retweetMin,",",2000);
		}
	}
	
	/**
	 * 构建被评论数统计内容html
	 */
	function drawStatisticComment(parentSelection,statisitc){
		var statisticCommentHtml = drawStatistic("被评论数统计","comment","平均被评论数","次/条","cmtAvg","最大被评论数","次","cmtMax","最小被评论数","次","cmtMin");
		var commentHtml = drawStatisticGrid("comment",'',statisticCommentHtml,12,309);
		$(parentSelection).append(commentHtml);
		//动态数字效果
		if(statisitc.commentAvg){
			$('#cmtAvg').animateNumbers(statisitc.commentAvg,",",2000);
		}
		if(statisitc.commentMax){
			$('#cmtMax').animateNumbers(statisitc.commentMax,",",2000);
		}
		if(statisitc.commentMin){
			$('#cmtMin').animateNumbers(statisitc.commentMin,",",2000);
		}
	}
	
	/**
	 * 构建统计内容html，最多支持6行统计数字
	 */
	function drawStatistic(titleName,titleIcon,
			sideOneKey,sideOneUnit,sideOneId,
			sideTwoKey,sideTwoUnit,sideTwoId,
			sideThreeKey,sideThreeUnit,sideThreeId,
			sideFourKey,sideFourUnit,sideFourId,
			sideFiveKey,sideFiveUnit,sideFiveId,
			sideSixKey,sideSixUnit,sideSixId){
		var statisticHtml = '';
		statisticHtml = statisticHtml.concat('<div class="col-md-12 col-sm-12 p-t-0 p-b-5">');
		statisticHtml = statisticHtml.concat('<span class="bold text-left text-black no-margin p-t-10 p-b-20 f-s-20">');
		statisticHtml = statisticHtml.concat('<i class="fa fa-'+titleIcon+' fa-s-1 text-error m-r-5"></i>'+titleName);
		statisticHtml = statisticHtml.concat('</span></div>');
		
		if(sideOneKey && sideOneUnit && sideOneId){
			statisticHtml = drawStatisticRow(statisticHtml,sideOneKey,sideOneUnit,sideOneId);
		}
		
		if(sideTwoKey && sideTwoUnit && sideTwoId){
			statisticHtml = drawStatisticRow(statisticHtml,sideTwoKey,sideTwoUnit,sideTwoId);
		}
		
		if(sideThreeKey && sideThreeUnit && sideThreeId){
			statisticHtml = drawStatisticRow(statisticHtml,sideThreeKey,sideThreeUnit,sideThreeId);
		}
		
		if(sideFourKey && sideFourUnit && sideFourId){
			statisticHtml = drawStatisticRow(statisticHtml,sideFourKey,sideFourUnit,sideFourId);
		}
		
		if(sideFiveKey && sideFiveUnit && sideFiveId){
			statisticHtml = drawStatisticRow(statisticHtml,sideFiveKey,sideFiveUnit,sideFiveId);
		}
		
		if(sideSixKey && sideSixUnit && sideSixId){
			statisticHtml = drawStatisticRow(statisticHtml,sideSixKey,sideSixUnit,sideSixId);
		}
		
		return statisticHtml;
	}
	/**
	 * 构建统计数据中每一行的内容html
	 * 可以显示统计对象，统计单位，和统计数字（目前统计数字统一为0，外面使用动态增加的方式进行展示）
	 */
	function drawStatisticRow(statisticHtml,key,unit,id){
		statisticHtml = statisticHtml.concat('<div class="col-md-12 col-sm-12 p-t-15 p-b-15 p-l-0 p-r-0">');
		statisticHtml = statisticHtml.concat('<div class="col-md-6 col-sm-6 p-l-0 p-r-0" style="max-height:50px;overflow:hidden;">');
		statisticHtml = statisticHtml.concat('<h4 class="semi-bold text-center text-black pull-right p-r-15">'+key+'</h4>');
		statisticHtml = statisticHtml.concat('</div>');
		statisticHtml = statisticHtml.concat('<div class="col-md-6 col-sm-6 p-l-0 p-r-0" style="max-height:50px;overflow:hidden;">');
		statisticHtml = statisticHtml.concat('<p class="no-margin no-padding">'+unit+'</p>');
		statisticHtml = statisticHtml.concat('<h3 id='+id+' class="bold text-success no-margin no-padding green">0</h3>');
		statisticHtml = statisticHtml.concat('</div></div>');
		return statisticHtml;
	}
	
	/**
	 * 构建entity 词云展示的外部框架，包括颜色，标题等
	 * 词云的构建在外部进行
	 */
	function drawEntityPanel(id,title,color){
		var entityPanelHtml = '';
		entityPanelHtml = entityPanelHtml.concat('<div class="col-md-12">');
		entityPanelHtml = entityPanelHtml.concat('<div class="col-md-12 tiles '+color+' m-b-8">');
		entityPanelHtml = entityPanelHtml.concat('<div class="p-t-5 p-b-5 p-l-5 text-left">');
		entityPanelHtml = entityPanelHtml.concat('<span class="text-white f-s-15 ">'+title+'</span>');
		entityPanelHtml = entityPanelHtml.concat('</div>');
		entityPanelHtml = entityPanelHtml.concat('<div id="'+id+'" class="p-t-10 p-b-10" data-height="135px" style="height:135px;margin: 0px auto;">');
		entityPanelHtml = entityPanelHtml.concat('</div>');
		entityPanelHtml = entityPanelHtml.concat('</div>');
		entityPanelHtml = entityPanelHtml.concat('</div>');
		return entityPanelHtml;
	}
	
	/**
	 * 构建兴趣词云
	 */
	function drawInterestCloud(id,hashtagData,backgroudColor){
		if(backgroudColor){
			$("#"+id).parents(".grid-body").css( "background-color",backgroudColor );
		}
		var cloudDataList = [];
		var hashtagDataSplit = hashtagData.split(",");
		hashtagDataSplit.map(function(d){
			var cloudData = {};
			cloudData["word"]=d;
			cloudData["dc"]=1;
			cloudDataList.push(cloudData);
		});
		createCloud("#"+id,cloudDataList,"grey","#0AA699");
	}
	
	/**
	 * 构建互动好友词云
	 */
	function drawMentionCloud(id,mentionData,backgroudColor){
		if(backgroudColor){
			$("#"+id).parents(".grid-body").css( "background-color",backgroudColor );
		}
		var cloudDataList = [];
		mentionData.map(function(d){
			var cloudData = {};
			cloudData["word"]=d["mention"];
			cloudData["dc"]=d["count"];
			cloudDataList.push(cloudData);
		});
		createCloud("#"+id,cloudDataList,"grey","#0AA699");
	}
	
	/**
	 * 构建参与话题词云
	 */
	function drawHashtagCloud(id,hashtagData,backgroudColor){
		if(backgroudColor){
			$("#"+id).parents(".grid-body").css( "background-color",backgroudColor );
		}
		var cloudDataList = [];
		hashtagData.map(function(d){
			var cloudData = {};
			cloudData["word"]=d["hashtag"];
			cloudData["dc"]=d["count"];
			cloudDataList.push(cloudData);
		});
		createCloud("#"+id,cloudDataList,"grey","#0AA699");
	}
	
	/**
	 * 构建语义短语词云
	 */
	function drawPhraseCloud(id,phraseData,backgroudColor){
		if(backgroudColor){
			$("#"+id).parents(".grid-body").css( "background-color",backgroudColor );
		}
		var cloudDataList = [];
		phraseData.map(function(d){
			var cloudData = {};
			cloudData["word"]=d["phrase"];
			cloudData["dc"]=d["count"];
			cloudDataList.push(cloudData);
		});
		createCloud("#"+id,cloudDataList,"grey","#0AA699");
	}
	
	/**
	 * 根据传入的entity type 构建entity词云
	 */
	function drawEntityCloud(id,entityData,type){
		var cloudDataList = [];
		entityData.map(function(d){
			var cloudData = {};
			if(type==d["type"]){
				cloudData["word"]=d["value"];
				cloudData["dc"]=d["count"];
				cloudDataList.push(cloudData);
			}
		});
		createCloud("#"+id,cloudDataList,"#ffffff","#055650");
	}
	
	/**
	 * 构建情绪指数内容的html
	 */
	function drawSentimentPanel(parentSelection,sentimentExp,positive,negative,sentimentChartId){
		var color = "positive-color";
		if(sentimentExp<0){
			color = "negative-color";
		}
		var sentimentPanelHtml = '';
		//start 情感数据
		sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-12 tiles white no-margin no-padding ">');
		sentimentPanelHtml = sentimentPanelHtml.concat('<div class="tiles-body">');
		
		sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-12 col-sm-12 p-t-10 p-b-10 p-l-0 p-r-0">');
		sentimentPanelHtml = sentimentPanelHtml.concat('<span class="bold text-left text-black no-margin p-t-10 p-b-20 f-s-20">');
		sentimentPanelHtml = sentimentPanelHtml.concat('<i class="fa fa-smile-o fa-s-1 text-error m-r-5"></i>情绪指数');
		sentimentPanelHtml = sentimentPanelHtml.concat('</span></div>');
		
			//start 情感数据 coumn6
			sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-6 col-sm-6 no-padding">');
			
			sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-12 col-sm-12 p-t-25 p-b-25 p-l-0 p-r-0">');
			sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-7 col-sm-7 p-t-0 p-l-0 p-r-0" style="max-height: 250px; overflow: hidden;">');
			sentimentPanelHtml = sentimentPanelHtml.concat('<h4 class="semi-bold text-right p-r-35 text-black">情绪指数</h4>');
			sentimentPanelHtml = sentimentPanelHtml.concat('<p class="no-margin text-right p-r-35">[-1,1]</p>');
			sentimentPanelHtml = sentimentPanelHtml.concat('<p class="no-margin text-right p-r-35">负值代表负面情绪</p>');
			sentimentPanelHtml = sentimentPanelHtml.concat('<p class="no-margin text-right p-r-35">正值代表正面情绪</p>');
			sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
			sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-5 col-sm-5 p-t-5 p-l-0 p-r-0" style="max-height: 250px; overflow: hidden;">');
			sentimentPanelHtml = sentimentPanelHtml.concat('<h3 id="sentiExp" class="bold text-success no-margin no-padding '+color+' f-s-30">0</h3>');
			sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
			sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
			
//			sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-12 col-sm-12 p-t-15 p-b-15 p-l-0 p-r-0">');
//			sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-7 col-sm-7 p-l-0 p-r-0" style="max-height: 50px; overflow: hidden;">');
//			sentimentPanelHtml = sentimentPanelHtml.concat('<h4 class="semi-bold text-center text-black">正面情感</h4>');
//			sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
//			sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-5 col-sm-5 p-l-0 p-r-0" style="max-height: 50px; overflow: hidden;">');
//			sentimentPanelHtml = sentimentPanelHtml.concat('<p class="no-margin no-padding">总数</p>');
//			sentimentPanelHtml = sentimentPanelHtml.concat('<h3 id="posCt" class="bold text-success no-margin no-padding green">'+positive+'</h3>');
//			sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
//			sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
//			
//			sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-12 col-sm-12 p-t-15 p-b-15 p-l-0 p-r-0">');
//			sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-7 col-sm-7 p-l-0 p-r-0" style="max-height: 50px; overflow: hidden;">');
//			sentimentPanelHtml = sentimentPanelHtml.concat('<h4 class="semi-bold text-center text-black">负面情感</h4>');
//			sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
//			sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-5 col-sm-5 p-l-0 p-r-0" style="max-height: 50px; overflow: hidden;">');
//			sentimentPanelHtml = sentimentPanelHtml.concat('<p class="no-margin no-padding">总数</p>');
//			sentimentPanelHtml = sentimentPanelHtml.concat('<h3 id="negCt" class="bold text-success no-margin no-padding green">'+negative+'</h3>');
//			sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
//			sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
			
			sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
			//end 情感数据 coumn6
		
			//start 情感饼状图 coumn6
			sentimentPanelHtml = sentimentPanelHtml.concat('<div id="sentimentPie" class="col-md-6 col-sm-6 no-padding" style="height: 180px;">');
			sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
			//end 情感饼状图 coumn6
		
		sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
		sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
		//end 情感数据
		
		//start 情感曲线
		sentimentPanelHtml = sentimentPanelHtml.concat('<div class="col-md-12 tiles white  no-padding narrow-margin m-b-8">');
		sentimentPanelHtml = sentimentPanelHtml.concat('<div id="sentimentChart" class="rickshaw_graph"></div>');
		sentimentPanelHtml = sentimentPanelHtml.concat('</div>');
		//end 情感曲线
		
//		return sentimentPanelHtml;
		$(parentSelection).append(sentimentPanelHtml);
		//动态数字效果
		
		$('#sentiExp').animateNumbers(sentimentExp.toFixed(2),"",1000);
//		$('#posCt').animateNumbers(positive,",",1000);
//		$('#negCt').animateNumbers(negative,",",1000);
	}
	
	/**
	 * 构建情绪分布线性图
	 */
	function drawSentimentChart(id,height,sentimentTrackData){
		var sentimentChartData = [];
		//load positive data for show chart
		var posData = sentimentTrackData["positive"];
		var posChartSeries = {};
		posChartSeries["color"]="#60BFB6";
		posChartSeries["name"]="Positive";
		var posSeriesData = [];
		posData.map(function(posTrack){
			var posSeriesDataItem = {};
			posSeriesDataItem["x"] = posTrack[0];
			posSeriesDataItem["y"] = posTrack[1];
			posSeriesData.push(posSeriesDataItem);
		});
		posChartSeries["data"] = posSeriesData;
		sentimentChartData.push(posChartSeries);
		
		//load negative data for show chart
		var negData = sentimentTrackData["negative"];
		var negChartSeries = {};
		negChartSeries["color"]="#F35958";
		negChartSeries["name"]="Negative";
		var negSeriesData = [];
		negData.map(function(posTrack){
			var negSeriesDataItem = {};
			negSeriesDataItem["x"] = posTrack[0];
			negSeriesDataItem["y"] = posTrack[1];
			negSeriesData.push(negSeriesDataItem);
		});
		negChartSeries["data"] = negSeriesData;
		sentimentChartData.push(negChartSeries);
		
		//show sentiemnt chart
		createBottomAreaGraph("#"+id,height,sentimentChartData)
	}
	
	/**
	 * 构建情绪分布饼状图
	 */
	function drawSentimentPie(id,data){
		var sentimentDataList = [];
		
		var posData = {};
		posData["name"]="正面情感微博数";
		posData["y"]=data["positive"];
		posData["color"]="#0AA699";
		sentimentDataList.push(posData);
		
		var posData = {};
		posData["name"]="负面情感微博数";
		posData["y"]=data["negative"];
		posData["color"]="#F35958";
		sentimentDataList.push(posData);
		
		var posData = {};
		posData["name"]="中性情感微博数";
		posData["y"]=data["neutral"];
		posData["color"]="#808080";
		sentimentDataList.push(posData);
		
		var height = $("#"+id).height();
		createPie("#"+id,sentimentDataList,height,false);
	}
	
	/**
	 * 构建最热微博html
	 */
	function drawHotTweets(parentSelection,tweetsData){
		var hotTweetsPanelHtml = "";
		hotTweetsPanelHtml = hotTweetsPanelHtml.concat('<div class="row tiles-container narrow-margin m-b-8 visible-xlg">');
		hotTweetsPanelHtml = hotTweetsPanelHtml.concat('<div class="tiles green p-t-15 p-b-15 p-l-25 ">');
		hotTweetsPanelHtml = hotTweetsPanelHtml.concat('<h5 class="text-white semi-bold" style="font-size: 15px;">最热微博</h5>');
		hotTweetsPanelHtml = hotTweetsPanelHtml.concat('</div>');
		hotTweetsPanelHtml = hotTweetsPanelHtml.concat('<div class="tiles white ">');
		
		tweetsData.map(function(tweet){
			hotTweetsPanelHtml = hotTweetsPanelHtml.concat(drawTweetsHtml(tweet));
		});
		
		hotTweetsPanelHtml = hotTweetsPanelHtml.concat('</div>');
		hotTweetsPanelHtml = hotTweetsPanelHtml.concat('</div>');
		
		$(parentSelection).append(hotTweetsPanelHtml);
	}
	/**
	 * 构建某一条热门微博的html
	 */
	function drawTweetsHtml(tweet){
		var pubDate = new Date(parseInt(tweet.publicTime));
	    var pubTime =  pubDate.Format("yyyy-MM-dd hh:mm:ss");
		var hotTweetHtml = "";
		hotTweetHtml = hotTweetHtml.concat('<div class="p-t-15 p-b-10 b-b b-grey">');
		hotTweetHtml = hotTweetHtml.concat('<div class="post overlap-left-10">');
		
		hotTweetHtml = hotTweetHtml.concat('<div class="user-profile-pic-wrapper">');
		hotTweetHtml = hotTweetHtml.concat('<div class="user-profile-pic-2x white-border">');
		hotTweetHtml = hotTweetHtml.concat('<img width="40" height="40" src="'+tweet.peopleHead+'" data-src="'+tweet.peopleHead+'" alt="'+tweet.peopleName+'">');
		hotTweetHtml = hotTweetHtml.concat('</div>');
		hotTweetHtml = hotTweetHtml.concat('</div>');
		
		hotTweetHtml = hotTweetHtml.concat('<div class="info-wrapper small-width inline">');
		hotTweetHtml = hotTweetHtml.concat('<div class="info text-black ">');
		hotTweetHtml = hotTweetHtml.concat('<p>'+tweet.content+'</p>');
		hotTweetHtml = hotTweetHtml.concat('<p class="muted small-text pull-right"><a target="_blank" href="'+tweet.url+'">'+pubTime+'</a></p>');
		hotTweetHtml = hotTweetHtml.concat('</div>');
		hotTweetHtml = hotTweetHtml.concat('<div class="clearfix"></div>');
		hotTweetHtml = hotTweetHtml.concat('</div>');
		
		hotTweetHtml = hotTweetHtml.concat('<div class="pull-right">');
		hotTweetHtml = hotTweetHtml.concat('<div class="tiles white p-t-0 p-l-5 p-b-10 p-r-5 ">');
		hotTweetHtml = hotTweetHtml.concat('<i class="fa fa-retweet fa-lg" title="转发数：'+tweet.retweetCount+'">&nbsp;&nbsp;'+tweet.retweetCount+'</i>');
		hotTweetHtml = hotTweetHtml.concat('</div>');
		hotTweetHtml = hotTweetHtml.concat('<div class="tiles white p-t-0 p-l-5 p-b-10 p-r-5 ">');
		hotTweetHtml = hotTweetHtml.concat('<i class="fa fa-comment-o fa-lg" title="评论数：'+tweet.commentCount+'">&nbsp;&nbsp;'+tweet.commentCount+'</i>');
		hotTweetHtml = hotTweetHtml.concat('</div>');
		hotTweetHtml = hotTweetHtml.concat('<div class="tiles white p-t-0 p-l-5 p-b-0 p-r-5 ">');
		hotTweetHtml = hotTweetHtml.concat('<i class="fa fa-heart-o fa-lg" title="点赞数：'+tweet.likeCount+'">&nbsp;&nbsp;'+tweet.likeCount+'</i>');
		hotTweetHtml = hotTweetHtml.concat('</div>');
		hotTweetHtml = hotTweetHtml.concat('</div>');
		hotTweetHtml = hotTweetHtml.concat('<div class="clearfix"></div>');
		
		hotTweetHtml = hotTweetHtml.concat('</div>');
		hotTweetHtml = hotTweetHtml.concat('</div>');
		
		return hotTweetHtml;
	}
	/**
	 * 够将热门图片html
	 */
	function drawHotImages(parentSelection,imagesData){
		
		if(!imagesData || imagesData.length==0){
			return;
		}
		
		var hotImagesPanelHtml = '';
		hotImagesPanelHtml = hotImagesPanelHtml.concat('<div class="col-md-12 col-sm-12 tiles white no-margin p-t-10 p-l-10 p-b-10 p-r-10">');
		hotImagesPanelHtml = hotImagesPanelHtml.concat('<span class="bold text-left text-black no-margin p-t-10 p-b-10 p-l-15 f-s-20">');
		hotImagesPanelHtml = hotImagesPanelHtml.concat('<i class="fa fa-picture-o fa-s-1 text-error m-r-5"></i>最热图片');
		hotImagesPanelHtml = hotImagesPanelHtml.concat('</span>');
		hotImagesPanelHtml = hotImagesPanelHtml.concat('</div>');
		
		hotImagesPanelHtml = hotImagesPanelHtml.concat('<div class="col-md-12 col-sm-12  narrow-margin m-b-8 no-padding">');
		hotImagesPanelHtml = hotImagesPanelHtml.concat('<div class="gallery">');
		hotImagesPanelHtml = hotImagesPanelHtml.concat('<ul id="carousel" class="elastislide-list">');
		imagesData.map(function(image){
			hotImagesPanelHtml = hotImagesPanelHtml.concat('<li data-preview="'+image.image+'">');
			hotImagesPanelHtml = hotImagesPanelHtml.concat('<a href="#"><img src="'+image.image+'" alt="" height="94px" width="94px"/></a>');
			hotImagesPanelHtml = hotImagesPanelHtml.concat('</li>');
		});
		hotImagesPanelHtml = hotImagesPanelHtml.concat('</ul>');
		hotImagesPanelHtml = hotImagesPanelHtml.concat('<div class="image-preview" align="center">');
		hotImagesPanelHtml = hotImagesPanelHtml.concat('<img id="preview" src="'+imagesData[0].image+'" />');
		hotImagesPanelHtml = hotImagesPanelHtml.concat('</div>');
		
		
		hotImagesPanelHtml = hotImagesPanelHtml.concat('</div>');
		hotImagesPanelHtml = hotImagesPanelHtml.concat('</div>');
		$(parentSelection).append(hotImagesPanelHtml);
		var current = 0,
		$preview = $( '#preview' ),
		$carouselEl = $( '#carousel' ),
		$carouselItems = $carouselEl.children(),
		carousel = $carouselEl.elastislide( {
			current : current,
			minItems : 4,
			onClick : function( el, pos, evt ) {

				changeImage( el, pos );
				evt.preventDefault();

			},
			onReady : function() {

				changeImage( $carouselItems.eq( current ), current );
				
			}
		} );

		function changeImage( el, pos ) {
	 		$preview.attr( 'src', el.data( 'preview' ) );
	 		$carouselItems.removeClass( 'current-img' );
	 		el.addClass( 'current-img' );
	 		carousel.setCurrent( pos );
	 	}
	}

	/**
	 * 构建时间轴html
	 */
	function drawTimeLine(parentSelection,timelineData,people){
		if(!timelineData || timelineData.length==0){
			return;
		}
		var timelineHtml = '';
		timelineHtml = timelineHtml.concat('<div id="timelineCol" class="col-md-12 tiles white p-l-0 p-r-10 no-margin">');
		
		timelineHtml = timelineHtml.concat('<div class="col-md-12 tiles white p-t-20 p-b-5 p-l-30 p-r-10 no-margin">');
		timelineHtml = timelineHtml.concat('<span class="title bold text-black no-margin f-s-20"><i class="fa fa-sort-amount-asc fa-s-1 text-error m-r-5"></i>时间轴</span>');
		timelineHtml = timelineHtml.concat('</div>');
		
		timelineHtml = timelineHtml.concat('<ul class="cbp_tmtimeline">');
		//add first line
		timelineHtml = timelineHtml.concat('<li>');
		//time
		timelineHtml = timelineHtml.concat('<time class="cbp_tmtime" datetime="">');
		timelineHtml = timelineHtml.concat('</time>');
		//head
		timelineHtml = timelineHtml.concat('<div class="cbp_tmhead animated bounceIn">');
		timelineHtml = timelineHtml.concat('<div class="user-profile">');
		timelineHtml = timelineHtml.concat('<img width="40" height="40" src="'+people.head+'" data-src="'+people.head+'" alt="'+people.name+'">');
		timelineHtml = timelineHtml.concat('</div>');
		timelineHtml = timelineHtml.concat('</div>');
		//content
		timelineHtml = timelineHtml.concat('<div class="cbp_tmlabel" style="min-height:50px">');
		timelineHtml = timelineHtml.concat('</div>');
		
		timelineHtml = timelineHtml.concat('</li>');
		
		timelineData.map(function(timelineTweet){
			var timelineItemHtml = drawTimeLineItem(timelineTweet);
			timelineHtml = timelineHtml.concat(timelineItemHtml);
		});
		timelineHtml = timelineHtml.concat('</ul>');
		timelineHtml = timelineHtml.concat('</div>');
		$(parentSelection).append(timelineHtml);
		
	}
	
	function drawTimeLineItem(timelineTweet){
		var pubDate = new Date(parseInt(timelineTweet.pub_time));
	    var pubTime =  pubDate.Format("yyyy-MM-dd hh:mm:ss");
	    var postTypeMessage = '原创微博';
	    var postTypeStyle = 'alert-info';
	    if(timelineTweet["retweet_id"] && timelineTweet["retweet_id"]!=''){
	    	 postTypeMessage = '转发微博';
	    	 postTypeStyle = 'alert-success';
	    }
	    
		var timelineItemHtml = '';
		timelineItemHtml = timelineItemHtml.concat('<li>');
		//time
		timelineItemHtml = timelineItemHtml.concat('<time class="cbp_tmtime" datetime="'+pubTime+'">');
		timelineItemHtml = timelineItemHtml.concat('<div class="post-type '+postTypeStyle+'">'+postTypeMessage+'</div>');
		timelineItemHtml = timelineItemHtml.concat('<span class="pubtime">'+pubTime+'</span>');
		timelineItemHtml = timelineItemHtml.concat('</time>');
		//head
		timelineItemHtml = timelineItemHtml.concat('<div class="cbp_tmicon primary animated bounceIn">');
//		timelineItemHtml = timelineItemHtml.concat('<div class="user-profile">');
//		timelineItemHtml = timelineItemHtml.concat('<img width="35" height="35" src="'+timelineTweet.peopleHead+'" data-src="'+timelineTweet.peopleHead+'" alt="'+timelineTweet.peopleName+'">');
//		timelineItemHtml = timelineItemHtml.concat('</div>');
		timelineItemHtml = timelineItemHtml.concat('</div>');
		//content
		timelineItemHtml = timelineItemHtml.concat('<div class="cbp_tmlabel m-b-20" style="min-height:80px">');
		timelineItemHtml = timelineItemHtml.concat('<div class="no-padding cbp_tmcontents">');
		var tempTimelineHtml = '';
		tempTimelineHtml = tempTimelineHtml.concat(drawTimeLineEntity(timelineTweet["entity_person"],timelineTweet["entity_brand"],timelineTweet["entity_loc"],timelineTweet["entity_org"]));
		
		tempTimelineHtml = tempTimelineHtml.concat(drawTimeLineMention(timelineTweet["mention"],"label-mention"));
		
		tempTimelineHtml = tempTimelineHtml.concat(drawTimeLineHashtags(timelineTweet["hashtag"]));
		
		if(tempTimelineHtml==''){
			return '';
		}else{
			timelineItemHtml = timelineItemHtml.concat(tempTimelineHtml);
		}
		
//		timelineItemHtml = timelineItemHtml.concat('<p class="m-t-5 dark-text">'+timelineTweet.content+'</p>');
		timelineItemHtml = timelineItemHtml.concat('</div>');
		timelineItemHtml = timelineItemHtml.concat('</div>');
		
		timelineItemHtml = timelineItemHtml.concat('</li>');
		
		return timelineItemHtml;
	}
	function drawTimeLineHashtags(hashtags){
		var timelineHashtagHtml = '';
		if(hashtags && hashtags!=''){
			timelineHashtagHtml = timelineHashtagHtml.concat('<div class="p-t-10 p-l-20 p-r-20 p-b-10 xs-p-r-10 xs-p-l-10 xs-p-t-5 cbp_tmitem">');
			timelineHashtagHtml = timelineHashtagHtml.concat('<p class="no-margin dark-text" style="line-height: 30px;">参与了 ');
			var hashtagsSplit = hashtags.split(",");
			hashtagsSplit.map(function(hashtagLabel){
				timelineHashtagHtml = timelineHashtagHtml.concat(' <span class="hashtags transparent"> '+hashtagLabel+' </span> ');
			});
			timelineHashtagHtml = timelineHashtagHtml.concat('</p>');
			timelineHashtagHtml = timelineHashtagHtml.concat('</div>');
		}
		return timelineHashtagHtml;
	}
	function drawTimeLineMention(mentions,colorStyle){
		var timelineItemMentionHtml = '';
		if(mentions && mentions!=''){
			timelineItemMentionHtml = timelineItemMentionHtml.concat('<div class="p-t-10 p-l-20 p-r-20 p-b-10 xs-p-r-10 xs-p-l-10 xs-p-t-5 cbp_tmitem">');
			timelineItemMentionHtml = timelineItemMentionHtml.concat('<p class="no-margin dark-text" style="line-height: 30px;">@了 ');
			var mentionsSplit = mentions.split(",");
			mentionsSplit.map(function(mentionLabel){
				timelineItemMentionHtml = timelineItemMentionHtml.concat(' <span class="label '+colorStyle+'" style="font-size: 15px;">'+mentionLabel+'</span> ');
			});
			timelineItemMentionHtml = timelineItemMentionHtml.concat('</p>');
			timelineItemMentionHtml = timelineItemMentionHtml.concat('</div>');
		}
		return timelineItemMentionHtml;
	}
	function drawTimeLineEntity(entityPerson,entityBrand,entityLoc,entityOrg){
		var timelineEntityHtml = '';
		if((entityPerson && entityPerson!='') 
			|| (entityBrand && entityBrand!='')
			|| (entityLoc && entityLoc!='')
			|| (entityOrg && entityOrg!='')){
			timelineEntityHtml = timelineEntityHtml.concat('<div class="p-t-10 p-l-20 p-r-20 p-b-10 xs-p-r-10 xs-p-l-10 xs-p-t-5 cbp_tmitem">');
			timelineEntityHtml = timelineEntityHtml.concat('<p class="no-margin dark-text" style="line-height: 30px;">提到了 ');
			timelineEntityHtml = timelineEntityHtml.concat(drawTimeLineEntityItemHtml(entityPerson,"label-entity-person"));
			timelineEntityHtml = timelineEntityHtml.concat(drawTimeLineEntityItemHtml(entityBrand,"label-entity-brand"));
			timelineEntityHtml = timelineEntityHtml.concat(drawTimeLineEntityItemHtml(entityLoc,"label-entity-loc"));
			timelineEntityHtml = timelineEntityHtml.concat(drawTimeLineEntityItemHtml(entityOrg,"label-entity-org"));
			timelineEntityHtml = timelineEntityHtml.concat('</p>');
			timelineEntityHtml = timelineEntityHtml.concat('</div>');
		}
		return timelineEntityHtml;
	}
	function drawTimeLineEntityItemHtml(entity,colorStyle){
		var timelineEntityHtml = '';
		if(entity && entity!=''){
			var entitySplit = entity.split(",");
			entitySplit.map(function(entityLabel){
				timelineEntityHtml = timelineEntityHtml.concat(' <span class="label '+colorStyle+'" style="border-radius: 10px;font-size: 15px;">'+entityLabel+'</span> ');
			});
		}
		return timelineEntityHtml;
	}
	
	
	
	
	
	/************************************************【draw simple grid methods】 start****************************************************/
	/**
	 * build a simple grid for show the statistic data
	 */
	function drawStatisticGrid(id, title , content,column, contentHeight){
		var gridHtml='';
		//build grid
		//add grid container
		gridHtml=gridHtml.concat('<div class="col-md-'+column+' grid simple " >');
		//build content
		gridHtml=gridHtml.concat('<div id="'+id+'" class="grid-body" style="min-height:'+contentHeight+'px;">');
		gridHtml=gridHtml.concat(content);
		gridHtml=gridHtml.concat('</div>');
		//end build grid
		gridHtml=gridHtml.concat('</div>');
		return gridHtml;
	}
	/**
	 * build a normal grid that contains title and content
	 */
	function drawNormalGrid(id, title , content,column, contentHeight){
		var gridHtml='';
		//build grid
		//add grid container
		gridHtml=gridHtml.concat('<div class="col-md-'+column+'">');
		gridHtml=gridHtml.concat('<div class="grid simple ">');
		//build title
		gridHtml=buildGridTitle(gridHtml,title);
		//build content
		gridHtml=buildGridContent(gridHtml,id,content,contentHeight);
		//end build grid
		gridHtml=gridHtml.concat('</div>');
		gridHtml=gridHtml.concat('</div>');
		return gridHtml;
	}
	
	/**
	 * build a grid that title is under the content
	 */
	function drawTitleUnderGrid(id, title , content,column, contentHeight){
		var gridHtml='';
		//build grid
		//add grid container
		gridHtml=gridHtml.concat('<div class="col-md-'+column+'">');
		gridHtml=gridHtml.concat('<div class="grid simple ">');
		//build content
		gridHtml=buildGridContent(gridHtml,id,content,contentHeight);
		//build title
		gridHtml=buildGridTitle(gridHtml,title);
		//end build grid
		gridHtml=gridHtml.concat('</div>');
		gridHtml=gridHtml.concat('</div>');
		return gridHtml;
	}
	
	function buildGridTitle(gridHtml,title){
		if(title && title!=''){
			//add title of grid
			gridHtml=gridHtml.concat('<div class="grid-title green"><h4>');
			gridHtml=gridHtml.concat(title);
			gridHtml=gridHtml.concat('</h4>');
			//add control tools(collapse,remove)
//			gridHtml=gridHtml.concat('<div class="tools">');
//			gridHtml=gridHtml.concat('<a href="javascript:;" class="collapse"></a>');
//			gridHtml=gridHtml.concat('<a href="javascript:;" class="remove"></a>');
//			gridHtml=gridHtml.concat('</div>');
			gridHtml=gridHtml.concat('</div>');
		}
		return gridHtml;
	}
	
	function buildGridContent(gridHtml,id,content,contentHeight){
		//build content
		gridHtml=gridHtml.concat('<div class="grid-body no-padding">');
		gridHtml=gridHtml.concat('<div class="row-fluid" style="min-height:'+contentHeight+'px;">');
		gridHtml=gridHtml.concat('<div id="'+id+'" class="scroller" data-height="'+contentHeight+'px" data-always-visible="1">');
		gridHtml=gridHtml.concat(content);
		gridHtml=gridHtml.concat('</div>');
		gridHtml=gridHtml.concat('</div>');
		gridHtml=gridHtml.concat('</div>');
		return gridHtml;
	}
	
	/************************************************【draw simple grid methods】  end ****************************************************/
	
	/************************************************【draw pie chart methods】  end ****************************************************/
	/**
	 * 画出word cloud
	 */
	function createCloud(selection,data,fontColor,hoverColor){
		// cache layout
		var layout=null,vis=null,svg=null,background=null;
		var h = parseInt($(selection).attr("data-height").replace(/px/, ""));
		var w = $(selection).innerWidth();
		 var dcRange = d3.extent(data, function(d) {
		      return d.dc;
		    });
		 if(!layout){
			 svg = d3.select(selection).append("svg");
			 background = svg.append("g");
			 vis = svg.append("g");
			   
			 layout = d3.layout.cloud()
		      .rotate(0)
		      .timeInterval(1000)
		      .text(function(d) { return d.word; })
		      .font("Impact")
		      .on("end", draw);
		 }
		 svg.attr("width", "100%").attr("height", h);
		 vis.attr("transform", "translate(" + [w >> 1, h >> 1] + ")");
		 var fontScale = d3.scale.sqrt().range([15, 30]).domain(dcRange);
		 var fontScaleWithStandard = w/w;
		 layout
		 	.size([w, h])
		 	.padding(5)
		 	.fontSize(function(d) { return fontScaleWithStandard*fontScale(d.dc); })
		 	.words(data).start();
		 
		 function draw(data, bounds) {
			  scale = bounds ? Math.min(
			      w / Math.abs(bounds[1].x - w / 2),
			      w / Math.abs(bounds[0].x - w / 2),
			      h / Math.abs(bounds[1].y - h / 2),
			      h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
			  words = data;
			  var text = vis.selectAll("text")
			      .data(words);
			  text.transition()
			      .duration(1000)
			      .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
			      .style("font-size", function(d) { return d.size + "px"; });
			  text.enter().append("text")
			      .attr("text-anchor", "middle")
			      .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
			      .style("font-size", function(d) { return d.size + "px"; })
			      .on("click", function(d) {
			        //load(d.text);
			      })
			      .style("opacity", 1e-6)
			      .transition()
			      .duration(1000)
			      .style("opacity", 1);
			  text.style("font-family", function(d) { return d.font; })
			      .style("fill", fontColor)
			      .text(function(d) { return d.text; });
			  var exitGroup = background.append("g")
			      .attr("transform", vis.attr("transform"));
			  var exitGroupNode = exitGroup.node();
			  text.exit().each(function() {
			    exitGroupNode.appendChild(this);
			  });
			  
			  text.on("mouseover", function(){
				d3.select(this)
				.style("stroke", hoverColor)
				.style("stroke-width", "0")
				.style("fill", hoverColor);
			  }).on("mouseout", function(){
				d3.select(this)
				.style("stroke", "")
				.style("stroke-width", "1")
				.style("fill", fontColor);
			  }).on("click",function(d){
				  wordEditHandle(d);
			  });
			  exitGroup.transition()
			      .duration(1000)
			      .style("opacity", 1e-6)
			      .remove();
			  vis.transition()
			      .delay(1000)
			      .duration(750)
			      .attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
			}
	}
	/**
	 * 构建底部区域图
	 */
	function createBottomAreaGraph(selection,height,seriesData){
		var graph = new Rickshaw.Graph( {
			element: document.querySelector(selection),
			height: height,
			renderer: 'area',
			series: seriesData
		} );
		var hoverDetail = new Rickshaw.Graph.HoverDetail( {
			graph: graph
		});
		graph.update();
	}
	
	/**
	 * 构建饼状图
	 */
	function createPie(selection,data,height,isShowNum){
		var boxHeight = height;
		var boxWidth = $(selection).width();
		var tooltipMessage = '{series.name}: <b>{point.percentage:.1f}%</b>';
		if(isShowNum==true){
			tooltipMessage = '{series.name}: <b>{point.percentage:.1f}%({point.y})</b>';
		}
		
		 $(selection).highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false,
		            height:boxHeight,
					width: boxWidth
		        },
		        colors: ['#b3ecf2', 
				         '#27a4f2',
				         '#d9d271',
				         '#f26e50',
				         '#d93232',
				         '#ccd2dc',
				         '#ccd2dc'],
		        title: {
		            text: ''
		        },
		        tooltip: {
		    	    pointFormat: tooltipMessage
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: false,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                    
		                }
		            }
		        },
		        navigator : {enabled : false },
				credits : {enabled : false },
		        series: [{
		            type: 'pie',
		            data: data
		        }]
		    });
	}
	
	/************************************************【draw pie chart methods】  end ****************************************************/
	
	function formatNumber(num, precision, separator) {
	    var parts;
	    // 判断是否为数字
	    if (!isNaN(parseFloat(num)) && isFinite(num)) {
	        // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
	        // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
	        // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
	        // 的值变成了 12312312.123456713
	        num = Number(num);
	        // 处理小数点位数
	        num = (precision ? num.toFixed(precision) : num).toString();
	        // 分离数字的小数部分和整数部分
	        parts = num.split('.');
	        // 整数部分加[separator]分隔, 借用一个著名的正则表达式
	        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

	        return parts.join('.');
	    }
	    return NaN;
	}
	
	/************************ 根据图片长宽比修成图片位置 ************************/
	function fillImage(img,maxHeight){
		var filled = img.data("filled");
		if(filled){
			return;
		}
		if(!img.attr("src") || img.attr("src")==""){
			return;
		}
		var img_w = img[0].width;
		var img_h = img[0].height;
		if(img_w == 0 || img_h==0){
			var newImg = new Image();
		    newImg.onload = function() {
		    	var height = newImg.height;
		    	var width = newImg.width;
		    	changeImgStyle(img,width,height,maxHeight);
		    };
		    newImg.src = img.attr("src");
		    return;
		}
		changeImgStyle(img,img_w,img_h,maxHeight);
		img.data("filled",true);
	}
	
	function changeImgStyle(img,img_w,img_h,maxHeight){
        var containerWidth = $(img).parent("div").width();
        var containerHeight = $(img).parent("div").height();
        if(containerHeight>maxHeight){
        	containerHeight = maxHeight;
        }
        var diff = 0;
        var scale = 1.0*img_w/img_h;
        if(scale > 1.0*containerWidth / containerHeight){
        	// should fill image with width
            img.css("width","100%").css("height","auto");
            img_h = containerWidth / scale;
            diff = img_h - containerHeight;
            img.css("margin-top",-(diff/2));
        }
        else{
            //landscape
            img.css("height","100%").css("width","auto");
        };
	}
	/************************end 根据图片长宽比修成图片位置 end************************/
	
	Date.prototype.Format = function(fmt) 
	{ //author: meizz 
	  var o = { 
	    "M+" : this.getMonth()+1,                 //月份 
	    "d+" : this.getDate(),                    //日 
	    "h+" : this.getHours(),                   //小时 
	    "m+" : this.getMinutes(),                 //分 
	    "s+" : this.getSeconds(),                 //秒 
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
	    "S"  : this.getMilliseconds()             //毫秒 
	  }; 
	  if(/(y+)/.test(fmt)) 
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	  for(var k in o) 
	    if(new RegExp("("+ k +")").test(fmt)) 
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
	  return fmt; 
	}
});