package com.whi8per.sense.deeplearn.data.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.whi8per.sense.deeplearn.data.entity.DPImg;
import com.whi8per.sense.deeplearn.data.source.DeepLearnBaseDao;


/**
 * @author wxm
 *
 */
@Repository
public class DPImgDao extends DeepLearnBaseDao<DPImg, Long>{
	
	/**
	 * return the img url with the input imgId;
	 * @param imgId
	 * @return
	 */
	public DPImg queryTag(Long imgId){
		return super.get(imgId);
	}
	
	public List<DPImg> getAll(){
		return super.getAll();
	}
}