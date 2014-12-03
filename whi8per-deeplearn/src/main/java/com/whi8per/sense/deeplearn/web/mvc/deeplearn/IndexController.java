package com.whi8per.sense.deeplearn.web.mvc.deeplearn;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lakeside.web.BaseController;

/**
 * 
 * this controller is used to control the home page when user no type any url
 * 
 *
 */
@Controller
public class IndexController extends BaseController  {
	
	@RequestMapping("/")
	public String home(Model model){
		return "deeplearn/deeplearn";
	}
	
	@RequestMapping("/login")
	public String login(){
		return forward("/user/login");
	}

	@RequestMapping("/logout")
	public String logout(){
		return forward("/user/login");
	}
	
	@RequestMapping("/unauthorized")
	public String unauthorized(){
		return "unauthorized";
	}
}
