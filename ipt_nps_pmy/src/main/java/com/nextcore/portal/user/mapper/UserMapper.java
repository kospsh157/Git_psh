package com.nextcore.portal.user.mapper;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.nextcore.portal.user.domain.UserVO;

import net.sf.json.JSONObject;



/**
 * @author phd
 * @project portal
 * @date 2019-06-14
 * @time 오후 4:09
 */
public interface UserMapper
{

    public UserVO getUserAdmin();

	public List<LinkedHashMap<String, String>> getType0(UserVO vo);

	public List<LinkedHashMap<String, String>> getType1(UserVO vo);

	public List<LinkedHashMap<String, String>> getType2(UserVO vo);

	public List<LinkedHashMap<String, String>> getType3(UserVO vo);

	public List<LinkedHashMap<String, String>> getTrapList(UserVO vo);

	public void setWebsocket(String message);

	public List<LinkedHashMap<String, String>> getDevice(String dkey);

	public void setDevice(Map<String, Object> map);

	public int updateFaultAck(Map<String, Object> map);

	public List<HashMap<String, Object>> dataList(JSONObject param);

	public List<HashMap<String, Object>> sampleData();

	public List<HashMap<String, Object>> selectSessionListLastWeek(Map<String, String> params);

	public List<HashMap<String, Object>> sampleData1();

	public List<HashMap<String, Object>> culMultiGraph();

	public List<HashMap<String, Object>> getDevice1();


	public List<HashMap<String, Object>> getPort(JSONObject param);

	public List<HashMap<String, Object>> getSlot(int dkey);

}
