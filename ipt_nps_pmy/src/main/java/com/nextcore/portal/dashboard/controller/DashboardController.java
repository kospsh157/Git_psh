package com.nextcore.portal.dashboard.controller;

import com.nextcore.common.util.LogUtil;
import com.nextcore.common.util.Utils;
import com.nextcore.portal.user.service.UserService;
import com.nextcore.portal.websocket.WebSocketHandler;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.io.Writer;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author phd
 * @project portal
 * @date 2019-06-16
 * @time 오전 10:35
 */
@Controller
public class DashboardController
{
    private static Logger logger = LogUtil.getLogger();


    @Autowired
    private UserService userService;
    
    /**
     * Dashboard : 샘플 데이터
     *
     * @return
     * @throws Exception 
     */
   /* @RequestMapping(value = "/nc/dashboard/dataList1.do")
    public void dataList(HttpServletResponse response,HttpServletRequest request) throws Exception
    {
       try {
          HashMap<String, String> hm = new HashMap<String, String>();
          hm.put("Falevel", request.getParameter("Falevel"));
          
          List<LinkedHashMap<String, Object>>  list = userService.dataList();
    
          JSONArray jList = JSONArray.fromObject(list);
          Writer out = response.getWriter();
          out.write(String.valueOf(jList));
          out.flush();
          out.close(); 
        } catch (Exception e) {
           logger.error("ERROR : 실시간 장애리스트_고장 레벨별 모달 에러 : " + e.getMessage());
         }
    }*/

    @ResponseBody
	@RequestMapping(value = "/dashboard/getDevice.do")
	public List<HashMap<String, Object>> getDevice(HttpServletRequest request) throws Exception {
	
		try {
			
			/*검색 기간 데이터*/
			List<HashMap<String, Object>> getDevice = userService.getDevice();
			
			return getDevice;
		} catch (Exception ex) {
			return null;
		}
	}
    
    @ResponseBody
  	@RequestMapping(value = "/dashboard/getSlot.do")
  	public List<HashMap<String, Object>> getSlot(HttpServletRequest request, @RequestParam String DKEY) throws Exception {
  	
  		try {
  			
  			int dkey = Integer.parseInt(DKEY);
  			System.out.println("port"+DKEY);
  			
  			/*검색 기간 데이터*/
  			List<HashMap<String, Object>> getSlot = userService.getSlot(dkey);
  			System.out.println("getSlot"+getSlot);
  			
  			return getSlot;
  		} catch (Exception ex) {
  			return null;
  		}
  	}
    
    @ResponseBody
  	@RequestMapping(value = "/dashboard/getPort.do")
  	public List<HashMap<String, Object>> getPort(HttpServletRequest request, @RequestParam String jsonData  ) throws Exception {
  	
  		try {
  			
  			
  			JSONObject param = JSONObject.fromObject(jsonData);
			/*검색 서비스명*/
			System.out.println("param"+param);
			
  			/*검색 기간 데이터*/
  			List<HashMap<String, Object>> getPort = userService.getPort(param);
  			System.out.println("getPort"+getPort);
  			
  			return getPort;
  		} catch (Exception ex) {
  			return null;
  		}
  	}
    
    
	@ResponseBody
	@RequestMapping(value = "/dashboard/dataList.do")
	public List<HashMap<String, Object>> sampleData1(HttpServletRequest request, @RequestParam String jsonData) throws Exception {
	
		try {
			JSONObject param = JSONObject.fromObject(jsonData);
			/*검색 서비스명*/
			System.out.println("param"+param);
			
			List<HashMap<String, Object>> session_List = userService.dataList(param);
			
			
			System.out.println("returnMap"+session_List);
			return session_List;
		} catch (Exception ex) {
			return null;
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "/dashboard/culMultiGraph.do")
	public List<HashMap<String, Object>> culMultiGraph(HttpServletRequest request, @RequestParam String jsonData) throws Exception {
	
		try {
			
			
			/*검색 서비스명*/
			
		
			/*검색 기간 데이터*/
			List<HashMap<String, Object>> culMultiGraph = userService.culMultiGraph();
			
			return culMultiGraph;
		} catch (Exception ex) {
			return null;
		}
	}
    

    /* 2019-06-16 WebSocket 테스트 */
    @RequestMapping(value = "/nc/dashboard/websocket.npop")
    private ModelAndView faultOpenWindow( String message, HttpServletResponse response) throws Exception
    {
        System.err.println("erioejriejriowejfiovwearjgkoejoigjeriogjeiorgjerio");
        System.err.println(message);
        WebSocketHandler handler = WebSocketHandler.getInstance();
//    	JSONObject jb = JSONObject.fromObject("test");
        handler.sendToClientMessage( message );
        // response code 형식으로
        String msg = "";
        ModelAndView mv = new ModelAndView();
        mv.setViewName("v1//dashboard/socket/webSocket");

        return mv;
    }
    
    @RequestMapping(value = "/")
    private ModelAndView defaultPage( String message, HttpServletResponse response) throws Exception
    {
        System.err.println("erioejriejriowejfiovwearjgkoejoigjeriogjeiorgjerio");

        ModelAndView mv = new ModelAndView();
        mv.setViewName("portal/login");

        return mv;
    }
    
    @RequestMapping(value = "/nc/index.do")
    private ModelAndView login( String message, HttpServletResponse response) throws Exception
    {
//        System.err.println("erioejriejriowejfiovwearjgkoejoigjeriogjeiorgjerio");

        ModelAndView mv = new ModelAndView();
        mv.setViewName("portal/login");

        return mv;
    }
    
    @RequestMapping(value = "/nc/login.do")
    private ModelAndView login2( String message, HttpServletResponse response) throws Exception
    {
//        System.err.println("erioejriejriowejfiovwearjgkoejoigjeriogjeiorgjerio");

        ModelAndView mv = new ModelAndView();
        mv.setViewName("portal/login");

        return mv;
    }
    	
    @RequestMapping(value = "/nc/dashboard.do")
    private ModelAndView dashboard( String message, HttpServletResponse response) throws Exception
    {
//        System.err.println("erioejriejriowejfiovwearjgkoejoigjeriogjeiorgjerio");

        ModelAndView mv = new ModelAndView();
        mv.setViewName("portal/dashboard/dashboard");

        return mv;
    }

    
   
}
