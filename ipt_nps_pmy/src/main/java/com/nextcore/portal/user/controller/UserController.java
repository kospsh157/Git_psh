package com.nextcore.portal.user.controller;

import com.nextcore.common.util.LogUtil;
import com.nextcore.portal.common.util.StringUtil;
import com.nextcore.portal.user.domain.UserVO;
import com.nextcore.portal.user.service.UserService;
import com.nextcore.portal.websocket.WebSocketHandler;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.nextcore.portal.common.util.TimeUtil;

import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.javassist.compiler.SyntaxError;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author phd
 * @project portal
 * @date 2019-06-14
 * @time 오후 4:09
 */
@Controller
@RequestMapping(value = "/nc")
public class UserController
{
    private static Logger logger = LogUtil.getLogger();

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/user")
    public ModelAndView getUser()
    {
        LogUtil.startLog( logger, "user" );
        System.err.println("   user user user ");
        UserVO admin = userService.getUserAdmin();
        System.err.println(admin.toString());
        ModelAndView mav = new ModelAndView(  );
        mav.addObject( "User", admin );
        mav.setViewName( "portal/user" );
        LogUtil.endLog( logger, "user");
        return mav;
    }
    
    @RequestMapping(value = "/type0.do")
    public void getType0(UserVO vo, HttpServletRequest request,  HttpServletResponse response) throws Exception 
    {
        LogUtil.startLog( logger, "type0" );
        System.err.println("   type0.do ");
        List<LinkedHashMap<String, String>> list = new ArrayList<LinkedHashMap<String,String>>();
        List<LinkedHashMap<String, String>> dataList = new ArrayList<LinkedHashMap<String, String>>();
        list = userService.getType0( vo );
        
        List<String> timeList = new ArrayList<String>();
    	int timeType = 10;
//    	if(!"".equals(vo.getPerfType()) && vo.getPerfType() != null){
//    		timeType = Integer.parseInt(vo.getPerfType());
//    	}
		timeList = TimeUtil.createTimeMinute("", "", timeType);
		dataList = TimeUtil.nullTimeZero(timeList, list);
        System.out.println("##############################################################");
		System.err.println(list);
		System.err.println(dataList);
        String result = StringUtil.ajaxNullCheck( dataList );
        Writer out = response.getWriter();
        out.write(result);
        out.flush();
        LogUtil.endLog( logger, "user");
    }
    
    @RequestMapping(value = "/type1.do")
    public void getType1(UserVO vo, HttpServletRequest request,  HttpServletResponse response) throws Exception 
    {
        LogUtil.startLog( logger, "type1" );
        System.err.println("   type1.do ");
        List<LinkedHashMap<String, String>> list = new ArrayList<LinkedHashMap<String,String>>();
        List<LinkedHashMap<String, String>> dataList = new ArrayList<LinkedHashMap<String, String>>();
        list = userService.getType1( vo );
        
        List<String> timeList = new ArrayList<String>();
    	int timeType = 10;
//    	if(!"".equals(vo.getPerfType()) && vo.getPerfType() != null){
//    		timeType = Integer.parseInt(vo.getPerfType());
//    	}
		timeList = TimeUtil.createTimeMinute("", "", timeType);
		dataList = TimeUtil.nullTimeZero(timeList, list);
        
        String result = StringUtil.ajaxNullCheck( dataList );
        Writer out = response.getWriter();
        out.write(result);
        out.flush();
        

        LogUtil.endLog( logger, "user");
    }
    
    @RequestMapping(value = "/type2.do")
    public void getType2(UserVO vo, HttpServletRequest request,  HttpServletResponse response) throws Exception 
    {
        LogUtil.startLog( logger, "type2" );
        System.err.println("   type2.do ");
        List<LinkedHashMap<String, String>> list = new ArrayList<LinkedHashMap<String,String>>();
        List<LinkedHashMap<String, String>> dataList = new ArrayList<LinkedHashMap<String, String>>();
        list = userService.getType2( vo );
        
        List<String> timeList = new ArrayList<String>();
    	int timeType = 10;
//    	if(!"".equals(vo.getPerfType()) && vo.getPerfType() != null){
//    		timeType = Integer.parseInt(vo.getPerfType());
//    	}
		timeList = TimeUtil.createTimeMinute("", "", timeType);
		dataList = TimeUtil.nullTimeZero(timeList, list);
		System.out.println("##############################################################");
		System.err.println(list);
		System.err.println(dataList);
//        System.err.println();
        String result = StringUtil.ajaxNullCheck( dataList );
        Writer out = response.getWriter();
        out.write(result);
        out.flush();
        
        
        LogUtil.endLog( logger, "user");
    }
    
    @RequestMapping(value = "/type3.do")
    public void getType3(UserVO vo, HttpServletRequest request,  HttpServletResponse response) throws Exception 
    {
        LogUtil.startLog( logger, "type3" );
        System.err.println("   type3.do ");
        List<LinkedHashMap<String, String>> list = new ArrayList<LinkedHashMap<String,String>>();
        List<LinkedHashMap<String, String>> dataList = new ArrayList<LinkedHashMap<String, String>>();
        list = userService.getType3( vo );
        
        List<String> timeList = new ArrayList<String>();
    	int timeType = 10;
//    	if(!"".equals(vo.getPerfType()) && vo.getPerfType() != null){
//    		timeType = Integer.parseInt(vo.getPerfType());
//    	}
//		timeList = TimeUtil.createTimeMinute("", "real", timeType);
//		dataList = TimeUtil.nullTimeZero(timeList, list);
        
        String result = StringUtil.ajaxNullCheck( list );
        Writer out = response.getWriter();
        out.write(result);
        out.flush();
        

        LogUtil.endLog( logger, "user");
    }
    
    @RequestMapping(value = "/trapList.do")
    public void getTrapList(UserVO vo, HttpServletRequest request,  HttpServletResponse response) throws Exception 
    {
        LogUtil.startLog( logger, "type3" );
        System.err.println("   type3.do ");
        List<LinkedHashMap<String, String>> list = new ArrayList<LinkedHashMap<String,String>>();
        List<LinkedHashMap<String, String>> dataList = new ArrayList<LinkedHashMap<String, String>>();
        list = userService.getTrapList( vo );
        
        List<String> timeList = new ArrayList<String>();
    	int timeType = 10;
//    	if(!"".equals(vo.getPerfType()) && vo.getPerfType() != null){
//    		timeType = Integer.parseInt(vo.getPerfType());
//    	}
//		timeList = TimeUtil.createTimeMinute("", "real", timeType);
//		dataList = TimeUtil.nullTimeZero(timeList, list);
        
        String result = StringUtil.ajaxNullCheck( list );
        Writer out = response.getWriter();
        out.write(result);
        out.flush();
        

        LogUtil.endLog( logger, "user");
    }
    
    @RequestMapping(value = "/getDevice.do")
    private void getDevice( String dkey, HttpServletResponse response) throws Exception
    {
        List<LinkedHashMap<String, String>> list = new ArrayList<LinkedHashMap<String,String>>();
        list = userService.getDevice( dkey );
        String result = StringUtil.ajaxNullCheck( list );
        Writer out = response.getWriter();
        out.write(result);
        out.flush();

    }
    @RequestMapping(value = "/device/update.do")
    private ModelAndView openDevice( String dkey, HttpServletResponse response) throws Exception
    {
        List<LinkedHashMap<String, String>> list = new ArrayList<LinkedHashMap<String,String>>();
        list = userService.getDevice( dkey );
        System.err.println(list);
        ModelAndView mv = new ModelAndView();
        if(list.size() > 0){
        	mv.addObject("deviceDetail", list.get(0));
        }
        mv.setViewName("portal/dashboard/device");
//        String result = StringUtil.ajaxNullCheck( list );
//        Writer out = response.getWriter();
//        out.write(result);
//        out.flush();
        return mv;

    }
    
    @RequestMapping(value = "/setDevice.do")
    private void setDevice( @RequestBody String params, HttpServletResponse response) throws Exception
    {
        List<LinkedHashMap<String, String>> list = new ArrayList<LinkedHashMap<String,String>>();
        Map<String, Object> map = new HashMap<String,Object>();
        map = JSONObject.fromObject(params);
        
        userService.setDevice( map );
        map = new HashMap<String,Object>();
        String result = StringUtil.ajaxNullCheck( "{key : success}" );
        Writer out = response.getWriter();
        out.write(result);
        out.flush();

    }
    @RequestMapping(value = "/updateFaultAck.do")
    private void updateFaultAck( @RequestBody String params, HttpServletResponse response) throws Exception
    {
    	List<Map<String, Object>> mapList = new ArrayList<Map<String,Object>>();
		
		mapList = JSONArray.fromObject(params);
	
		// view에 전달할 결과 메시지
		String msg = "";
		
		// update 요청된 레코드 수
		int reqCnt = mapList.size();
		
		// update 처리된 레코드 수
		int resCnt = userService.updateFaultAck( mapList );
		
		
		if ( resCnt >= 0 && (resCnt == reqCnt) )
		{
			msg = "@@@ Ack update 성공! (요청 건수 : " + reqCnt + ", 성공 건수 : " + resCnt + ")";
//			System.out.println("msg : " + msg);
		}
		else
		{
			msg = "@@@ Ack update 실패! (요청 건수 : " + reqCnt + ", 성공 건수 : " + resCnt + ")";
//			System.out.println("msg : " + msg);
		}
		
		String resultStr = "{'msg': " + "'" + msg + "'" + "}";
		String strJson = StringUtil.ajaxNullCheck(resultStr);
		
		WebSocketHandler handler = WebSocketHandler.getInstance();
        userService.setWebsocket( strJson );
        handler.sendToClientMessage( strJson );
		
		

		Writer out = response.getWriter();
        out.write(strJson);
        out.flush();

    }
    
    /* 2019-06-16 WebSocket 테스트 */
    @RequestMapping(value = "/websocket.npop")
    private void faultOpenWindow( String message, HttpServletResponse response) throws Exception
    {
        System.err.println(message);
        WebSocketHandler handler = WebSocketHandler.getInstance();
        userService.setWebsocket( message );
        handler.sendToClientMessage( message );
    }

}
