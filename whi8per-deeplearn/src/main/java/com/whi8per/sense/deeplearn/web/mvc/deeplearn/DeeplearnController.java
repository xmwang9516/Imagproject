package com.whi8per.sense.deeplearn.web.mvc.deeplearn;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lakeside.web.BaseController;


@Controller
@RequestMapping("/deeplearn")
public class DeeplearnController extends BaseController{

	@Autowired
	private DeeplearnService deeplearnService;
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="",method = RequestMethod.POST)
	public String home(Model model,HttpServletRequest request){
		Map<String,Object> parameterMap = (Map<String,Object>)request.getParameterMap();
		Iterator<String> iterator = parameterMap.keySet().iterator();
		while(iterator.hasNext()){
			String key = iterator.next();
			Object value = parameterMap.get(key);
			if(value instanceof String[]){
				value = ((String[])value)[0];
			}
			model.addAttribute(key, value);
		}
		return "deeplearn/deeplearn";
	}

	/**
	 * search from ajax.
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/s")
	public @ResponseBody DeeplearnResult search(HttpServletRequest request){
		try {
			return deeplearnService.search(request);
		} finally {
//			// log search parameters
//			String userName = "";
//			UserPrincipal currentUser = this.getCurrentUser();
//			if(currentUser!=null)
//				userName = currentUser.getUserName();
//			String parameters = getPrintParameters(request);
//			log.info("user [{}] search with parameters:{}",userName,parameters);
		}
	}
		
	@RequestMapping("img_list.json")
	@ResponseBody
	public List<?> noteList(@RequestParam(value="gid",required = true) String gid,@RequestParam(value="page",required = false) Integer page,@RequestParam(value="imgperpage",required = false) Integer imgperPage,@RequestParam(value="attr",required = false) Integer attr){
		return deeplearnService.getImageList(gid,page,imgperPage,attr);
	}
	
}
