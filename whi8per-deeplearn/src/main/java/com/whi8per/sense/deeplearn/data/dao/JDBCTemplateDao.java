package com.whi8per.sense.deeplearn.data.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.google.common.collect.Maps;
import com.whi8per.sense.deeplearn.data.source.DeepLearnBaseDao;

/**
 * @author zhufb
 */

@Repository
public class JDBCTemplateDao extends DeepLearnBaseDao{

	/**
	 * jdbc template dao
	 * 
	 * @param sqlz
	 * @return
	 */
	public List<Map<String,Object>> query(String sql){
		Map<String,Object> params = Maps.newHashMap();
		List<Map<String,Object>> list = super.jdbcTemplate.queryForList(sql, params);
		return list;
	}
}
