package com.nextcore.portal.user.service;

import com.nextcore.portal.user.domain.UserVO;
import com.nextcore.portal.user.mapper.UserMapper;

import net.sf.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author phd
 * @project portal
 * @date 2019-06-14
 * @time 오후 4:09
 */
@Service
public class UserService
{
    @Autowired
    private UserMapper userMapper;


    public UserVO getUserAdmin()
    {
        return userMapper.getUserAdmin();
//        return null;
    }


	public List<LinkedHashMap<String, String>> getType0(UserVO vo) {
		// TODO Auto-generated method stub
		return userMapper.getType0(vo);
	}


	public List<LinkedHashMap<String, String>> getType1(UserVO vo) {
		// TODO Auto-generated method stub
		return userMapper.getType1(vo);
	}


	public List<LinkedHashMap<String, String>> getType2(UserVO vo) {
		// TODO Auto-generated method stub
		return userMapper.getType2(vo);
	}


	public List<LinkedHashMap<String, String>> getType3(UserVO vo) {
		// TODO Auto-generated method stub
		return userMapper.getType3(vo);
	}


	public List<LinkedHashMap<String, String>> getTrapList(UserVO vo) {
		// TODO Auto-generated method stub
		return userMapper.getTrapList(vo);
	}


	public void setWebsocket(String message) {
		// TODO Auto-generated method stub
		userMapper.setWebsocket(message);
	}


	public List<LinkedHashMap<String, String>> getDevice(String dkey) {
		// TODO Auto-generated method stub
		return userMapper.getDevice(dkey);
	}


	public void setDevice(Map<String, Object> map) {
		// TODO Auto-generated method stub
		userMapper.setDevice(map);
	}


	public int updateFaultAck(List<Map<String, Object>> mapList) {
		// TODO Auto-generated method stub
		
		// update 처리 건수 확인용 변수
		int totalCount = 0;
		int cnt = 0;
		for ( Map<String, Object> map : mapList )
		{
			// map 에 저장된 faultType에 따라 해당 알람 테이블에서 ack 값을 update 한다.
			cnt = userMapper.updateFaultAck(map);
			totalCount += cnt;
		}
		
		return totalCount;
	}


	public List<HashMap<String, Object>> dataList(JSONObject param) {
		// TODO Auto-generated method stub
		return userMapper.dataList(param);
	}


	public List<HashMap<String, Object>> sampleData() {
		// TODO Auto-generated method stu
		
		List<HashMap<String, Object>> result = userMapper.sampleData();
		System.out.println("result"+result);
		return result;
	}


	public List<HashMap<String, Object>> selectSessionListLastWeek(Map<String, String> params) {
		// TODO Auto-generated method stub
		return userMapper.selectSessionListLastWeek(params);
	}


	public List<HashMap<String, Object>> sampleData1() {
		// TODO Auto-generated method stub
		return userMapper.sampleData1();
	}


	public List<HashMap<String, Object>> culMultiGraph() {
		// TODO Auto-generated method stub
		return userMapper.culMultiGraph();
	}


	public List<HashMap<String, Object>> getDevice() {
		// TODO Auto-generated method stub
		return userMapper.getDevice1();
	}


	public List<HashMap<String, Object>> getPort(JSONObject param) {
		// TODO Auto-generated method stub
		return userMapper.getPort(param);
	}


	public List<HashMap<String, Object>> getSlot(int dkey) {
		// TODO Auto-generated method stub
		return userMapper.getSlot(dkey);
	}
	

}
