package com.whi8per.sense.deeplearn.web.mvc.deeplearn;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.lakeside.core.utils.StringUtils;
import com.lakeside.web.beans.config.ConfigSetting;
import com.whi8per.sense.deeplearn.data.dao.DPImgDao;
import com.whi8per.sense.deeplearn.data.dao.DPImgGroupDao;
import com.whi8per.sense.deeplearn.data.dao.JDBCTemplateDao;
import com.whi8per.sense.deeplearn.data.entity.DPImg;
import com.whi8per.sense.deeplearn.data.entity.DPImgGroup;
import com.whi8per.sense.deeplearn.web.mvc.builder.DeepLearnBuilder;
import com.whi8per.sense.deeplearn.web.mvc.builder.SqlBuilder;

/**
 * deeplearn senze main service
 * 
 * @author wxm
 * 
 */
@Service
public class DeeplearnService {

	@Autowired
	private JDBCTemplateDao dao;

	private ConfigSetting config;

	@Autowired
	private DPImgGroupDao imgGroupDao;

	@Autowired
	private DPImgDao imgDao;

	//private String BASE_URL = "http://dpic.nextcenter.org/";
	private String    BASE_URL = "http://172.29.32.33:6066/";
	private int       imgPageSize = 56;

	@Autowired
	private void init(ConfigSetting config) {
		this.config = config;
		DeeplearnResult.PageSize = getConfigInt("people.page.size",6);
		
	}

	private int getConfigInt(String key, int defaultVal) {
		String val = config.getConfig(key);
		if (StringUtils.isNotEmpty(val)) {
			return Integer.valueOf(val);
		}
		return defaultVal;
	}

	/**
	 * @param request
	 * @return
	 */
	public DeeplearnResult search(HttpServletRequest request) {
		SqlBuilder builder = new SqlBuilder(request, config);
		int start = builder.getParamInt("start", 0);
		String tag = builder.getParamString(DeepLearnBuilder.DEEPLEARN_TAG);

		// if the search tag is null, return all the results in the dbase;
		String totalSql = builder.buildSearchTagTotalSql(tag);
		List<Map<String, Object>> list = dao.query(totalSql); // return the number of results;
		int count = getCount(list);
		List<Map<String, Object>> data = Lists.newArrayList();
		if (count > start) {
			String sql = builder.buildSearchTagSql(tag, start,DeeplearnResult.PageSize);
			data = dao.query(sql);
		}

		List<Map<String, Object>> newData = Lists.newArrayList();
		newData = filterNoisy(data,tag);  // filtering some names like "zan" (in Chinese) not to show;

		DeeplearnResult pr = new DeeplearnResult(newData, count);
		pr.setStart(start);
		return pr;
	}

	/**
	 * filter some names in the positive and negative names list of each attribute;
	 * @param data
	 * @param tag
	 * @return  
	 * return List<Map<String, Object>> after filtered;
	 */
	public List<Map<String, Object>> filterNoisy(List<Map<String, Object>> data,String tag) {
		// filtering; 
		for (int i = 0; i < data.size(); i++) {
			Map<String, Object> map = data.get(i);
			String strTag1Names = this.filter(map.get("tag1").toString());
			String strTag2Names = this.filter(map.get("tag2").toString());

			map.put("tag1", strink(strTag1Names, tag)); // gflag=1 ----- tag1;
			map.put("tag2", strink(strTag2Names, tag)); // gflag=1 ----- tag1;
			data.set(i, map);
		}
		
		return data;
	}
	
	/**
	 * the detail of filtering;
	 * @param inputString
	 * @return
	 */
	public String filter(String inputString){
		String filterTags[] = { "abigfave", "2006","2007","anawesomeshot","diamondclassphotographer", "theperfectphotographer","aplusphoto" }; // need to be filtered;
		for (int j = 0; j < filterTags.length; j++) {
			if (inputString.indexOf(filterTags[j]) != -1) {
				String repStr = filterTags[j] + ", ";  // replace the "filterTag, ";
				inputString = inputString.replace(repStr, "");
				inputString = inputString.replace(filterTags[j], "");
				inputString = inputString.trim();
				char cChar = inputString.charAt(inputString.length() - 1);
				if (cChar == ',') {
					inputString = inputString.substring(0,inputString.length() - 1);
				}
			}
		}
		return inputString;
	}

	private int getCount(List<Map<String, Object>> data) {
		return Integer.valueOf(StringUtils.valueOf(data.get(0).get("num")));
	}

	public List<Map<String, Object>> getImageList(String gid, Integer page,Integer imgperPage,Integer attr) {
		List<Map<String, Object>> imgList = Lists.newArrayList();
		List<DPImgGroup> imgGrouplist = imgGroupDao.queryImgGroupByGroupIdFlag(Long.valueOf(gid), attr);
		
	    int startIndex = imgperPage*(page-1);
	    int endIndex = imgGrouplist.size() < imgperPage*page ? imgGrouplist.size() : imgperPage*page;
		
	    for(int i=startIndex;i<endIndex;i++){
	    	DPImgGroup  imgGroup = imgGrouplist.get(i);
	    	Map<String, Object> map = new HashMap<String, Object>();
			long imgId = imgGroup.getImgId();
			DPImg dpImg = imgDao.queryTag(imgId);
			String imgUrl = BASE_URL + dpImg.getimgurl();
			map.put("imgurl", imgUrl);
			imgList.add(map);
	    }
		
//		for (DPImgGroup imgGroup : imgGrouplist) {
//			Map<String, Object> map = new HashMap<String, Object>();
//			long imgId = imgGroup.getImgId();
//			DPImg dpImg = imgDao.queryTag(imgId);
//			String imgUrl = BASE_URL + dpImg.getimgurl();
//			map.put("imgurl", imgUrl);
//			// map.put("imgurl",
//			// "http://172.29.33.31:8000/deeplearn/actor/0001_2124494179.jpg");
//			imgList.add(map);
//		}
		return imgList;
	}
	
	public String strink(String content,String searchTag){
		if(StringUtils.isEmpty(searchTag)){
			return content;
		}
		Pattern compile = Pattern.compile("\\b"+searchTag+"\\b",Pattern.CASE_INSENSITIVE);  // match the whole searchTag;
		content = compile.matcher(content).replaceAll("<span class=\"badge badge-info\">"+searchTag+"</span>");
		return content;
	}

}
