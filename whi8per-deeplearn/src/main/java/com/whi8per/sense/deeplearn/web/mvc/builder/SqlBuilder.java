package com.whi8per.sense.deeplearn.web.mvc.builder;

import javax.servlet.http.HttpServletRequest;

import com.lakeside.core.utils.StringUtils;
import com.lakeside.web.beans.config.ConfigSetting;


/**
 * Sql builder 
 * 
 * @author zhufb
 *
 */

public class SqlBuilder extends DeepLearnBuilder {

	
	public SqlBuilder(HttpServletRequest request, ConfigSetting config) {
		super(request, config);
	}
	
	public String buildSearchTagSql(String tag,int start,int pagesize){
		StringBuilder sb = new StringBuilder();
		sb.append(" select group_id gid, pos_flag gflag1, neg_flag gflag2, concat(name_first,', ',name_second,', ',name_third,', ',name_four,', ',name_five,', ',name_six,', ',name_seven,', ',name_eight,', ',name_nine,', ',name_ten) tag1 ,concat(name_elev,', ',name_twev,', ',name_thirteen,', ', name_fourteen,', ', name_fifteen,', ',name_sixteen,', ',name_seventeen,', ',name_eighteen,', ',name_ninteen,', ',name_twenty) tag2");
		sb.append(" from dp_all_group_topnames  "); // modify the table name, with 20 names in each row, 10 pos names and 10 neg names;
		sb.append(" where 1 = 1 ");
		
		if(StringUtils.isNotEmpty(tag)){
			sb.append(" and name_first ='"+tag+"' or name_second ='"+tag+"' or name_third ='"+tag+"'   or name_four ='"+tag+"' or name_five ='"+tag+"' or name_six ='"+tag+"' or name_seven ='"+tag+"'  or name_eight ='"+tag+"' or name_nine ='"+tag+"' or name_ten ='"+tag+"'  ");
			sb.append(" or name_elev ='"+tag+"' or name_twev ='"+tag+"' or name_thirteen ='"+tag+"'   or name_fourteen ='"+tag+"' or name_fifteen ='"+tag+"' or name_sixteen ='"+tag+"' or name_seventeen ='"+tag+"'  or name_eighteen ='"+tag+"' or name_ninteen ='"+tag+"' or name_twenty ='"+tag+"'  ");
		}
		sb.append(" ORDER BY `group_id` ASC  ");
		
		sb.append(" limit ").append(start).append(",").append(pagesize);
		return sb.toString();
	}
	
	
	/**
	 * build attribute query sql 
	 * 
	 * @return
	 */
	public String buildSearchAllSql(String tag,int start,int pagesize){
		StringBuilder sb = new StringBuilder();
		sb.append(" select group_id gid, flag gflag, concat(name_first,', ',name_second,', ',name_third,', ',name_four,', ',name_five,', ',name_six,', ',name_seven,', ',name_eight,', ',name_nine,', ',name_ten) tag ");
		//test;
		//sb.append(" select group_id gid, flag gflag,  ");
		//sb.append(" case when  name_first not like 'airspace' then concat(name_first, ',', name_second) else concat('namefirst', ',', name_second) tag ");	
//		sb.append(" SELECT group_id gid, flag gflag, ");
//		sb.append("CONCAT(  ");
//		sb.append("CASE name_first WHEN 'abigfave' or 'airspace' THEN ' ' ELSE name_first, END ");
//		sb.append(" ',',name_second,',',name_third ");
//      sb.append(" ) as tag ");
		
		sb.append(" from dp_group  ");
		//sb.append(" where flag = 1 ");
		sb.append(" where 1 = 1 ");
		//sb.append(" and name_first not like 'abigfave' ");
		if(StringUtils.isNotEmpty(tag)){
			sb.append(" and name_first ='"+tag+"' or name_second ='"+tag+"' or name_third ='"+tag+"'   or name_four ='"+tag+"' or name_five ='"+tag+"' or name_six ='"+tag+"' or name_seven ='"+tag+"'  or name_eight ='"+tag+"' or name_nine ='"+tag+"' or name_ten ='"+tag+"'  ");
		}
		sb.append(" ORDER BY `group_id` ASC  ");
		sb.append(" limit ").append(start).append(",").append(pagesize);
		
		return sb.toString();
	}
	
	public String buildSearchTagTotalSql(String tag){
		StringBuilder sb = new StringBuilder();
		sb.append(" select count(1) num");
		sb.append(" from dp_all_group_topnames "); // modify the table name, with 20 names in each row, 10 pos names and 10 neg names; convience for search and show each group;
		//sb.append(" where flag=1 ");
		sb.append(" where 1=1 ");
		
		if(StringUtils.isNotEmpty(tag)){
			sb.append(" and name_first ='"+tag+"' or name_second ='"+tag+"' or name_third ='"+tag+"'  or name_four ='"+tag+"' or name_five ='"+tag+"' or name_six ='"+tag+"' or name_seven ='"+tag+"'  or name_eight ='"+tag+"' or name_nine ='"+tag+"' or name_ten ='"+tag+"' ");
			sb.append(" or name_elev ='"+tag+"' or name_twev ='"+tag+"' or name_thirteen ='"+tag+"'   or name_fourteen ='"+tag+"' or name_fifteen ='"+tag+"' or name_sixteen ='"+tag+"' or name_seventeen ='"+tag+"'  or name_eighteen ='"+tag+"' or name_ninteen ='"+tag+"' or name_twenty ='"+tag+"'  ");
		}
		sb.append(" ORDER BY `group_id` ASC  ");
		
		return sb.toString(); 
	}

	
}
