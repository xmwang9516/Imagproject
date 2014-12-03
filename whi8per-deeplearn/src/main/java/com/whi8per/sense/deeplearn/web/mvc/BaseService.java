package com.whi8per.sense.deeplearn.web.mvc;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.reflect.Method;

public class BaseService {

	/**
     * 将一个 JavaBean 对象转化为一个  Map
     * @param bean 要转化的JavaBean 对象
     * @return 转化出来的  Map 对象
     * @throws IntrospectionException 如果分析类属性失败
     * @throws IllegalAccessException 如果实例化 JavaBean 失败
     * @throws InvocationTargetException 如果调用属性的 setter 方法失败
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map convertBean(Object bean){
        Class type = bean.getClass();
        Map returnMap = new HashMap();
        BeanInfo beanInfo;
		try {
			beanInfo = Introspector.getBeanInfo(type);
			 PropertyDescriptor[] propertyDescriptors =  beanInfo.getPropertyDescriptors();
		        for (int i = 0; i< propertyDescriptors.length; i++) {
		            PropertyDescriptor descriptor = propertyDescriptors[i];
		            String propertyName = descriptor.getName();
		            if(propertyName.equals("notes")){
		            	continue;
		            }
		            if (!propertyName.equals("class")) {
		                Method readMethod = descriptor.getReadMethod();
		                Object result = readMethod.invoke(bean, new Object[0]);
		                if (result != null) {
		                    returnMap.put(propertyName, result);
		                } else {
		                    returnMap.put(propertyName, "");
		                }
		            }
		        }
		} catch (IntrospectionException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
        return returnMap;
    }
    
    public static List<Map> convertBeanList(Object objectList){
    	if(objectList instanceof List){
    		List beanList = (List)objectList;
	    	List<Map> result = new ArrayList<Map>();
	    	for(Object bean:beanList){
	    		Map convertBean = convertBean(bean);
	    		result.add(convertBean);
	    	}
	    	return result;
    	}else {
			return null;
		}
    }
    
    public static Map getMap(Object model) {
    	try {
	        Field[] field = model.getClass().getDeclaredFields();        //获取实体类的所有属性，返回Field数组  
	        for(int j=0 ; j<field.length ; j++){     //遍历所有属性
	            String name = field[j].getName();    //获取属性的名字
	             System.out.println("attribute name:"+name);                
	            String type = field[j].getGenericType().toString();    //获取属性的类型
	            if(type.equals("class java.lang.String")){   //如果type是类类型，则前面包含"class "，后面跟类名
	                Method m = model.getClass().getMethod("get" + name.substring(0,1).toUpperCase() + name.substring(1) );
	                String value = (String) m.invoke(model);    //调用getter方法获取属性值
	                if(value != null){
	                    System.out.println("attribute value:"+value);
	                }
	            }
	            if(type.equals("class java.lang.Integer")){     
	                Method m = model.getClass().getMethod("get" + name.substring(0,1).toUpperCase() + name.substring(1) );
	                Integer value = (Integer) m.invoke(model);
	                if(value != null){
	                    System.out.println("attribute value:"+value);
	                }
	            }
	            if(type.equals("class java.lang.Short")){     
	                Method m = model.getClass().getMethod("get" + name.substring(0,1).toUpperCase() + name.substring(1) );
	                Short value = (Short) m.invoke(model);
	                if(value != null){
	                    System.out.println("attribute value:"+value);                    }
	            }       
	            if(type.equals("class java.lang.Double")){     
	                Method m = model.getClass().getMethod("get" + name.substring(0,1).toUpperCase() + name.substring(1) );
	                Double value = (Double) m.invoke(model);
	                if(value != null){                    
	                    System.out.println("attribute value:"+value);  
	                }
	            }                  
	            if(type.equals("class java.lang.Boolean")){
	                Method m = model.getClass().getMethod("get"+name);    
	                Boolean value = (Boolean) m.invoke(model);
	                if(value != null){                      
	                    System.out.println("attribute value:"+value);
	                }
	            }
	            if(type.equals("class java.util.Date")){
	                Method m = model.getClass().getMethod("get"+name);                    
	                Date value = (Date) m.invoke(model);
	                if(value != null){
	                    System.out.println("attribute value:"+value.toLocaleString());
	                }
	            }                
	        }
    	} catch (Exception e) {
			e.printStackTrace();
		}
		return null; 
	}
}