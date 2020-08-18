/*
 * Copyright (c) 2019 NEXTCORE, Ltd. All Rights Reserved.
 */
package com.nextcore.common.interceptor;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.event.EventConstants;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.nextcore.common.util.LogUtil;
import com.nextcore.common.util.SessionUtil;


/**
 * File Name : DefaultInterceptor.java
 * <p>
 * Description : 인증을 확인하고 사용자 권한에 따른 접근 URL을 검사한다.
 *
 * @since 2019. 2. 26.
 *
 *        <pre>
 * History
 * Date             Name                Description
 * 2019. 2. 26.     정인구        최초 작성
 *        </pre>
 */
public class DefaultInterceptor extends HandlerInterceptorAdapter {


    private static Logger logger = LogUtil.getLogger();


    /**
     * 세션정보체크 :
     * 세션정보를 체크하여 세션이 없는경우 세션이 필요한 페이지인지? 필요하지 않은 페이지 인지? 구분하여
     * login페이지로 이동시한다.
     *
     * @param request HTTP Request
     * @param response HTTP Response
     * @param handler
     * @return null 이면 비로그인
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    	String reqUrl = request.getServletPath();
        System.err.println("reqUrl :  test    "+ reqUrl);
        if(reqUrl.equals("/index.do")){
        	response.sendRedirect(request.getContextPath() + "/nc/login.do");
            return false;
        }else if(reqUrl.equals("/login.do")){
        	response.sendRedirect(request.getContextPath() + "/nc/login.do");
            return false;
        }
//        if (reqUrl.equals("/v1/login_exec") || reqUrl.equals("/v1/logout_exec")){
//            return super.preHandle(request, response, handler);
//        }
//        
//        HttpSession session = request.getSession(false);
//        
//        if(session == null ) {
//        	response.sendRedirect(request.getContextPath() + "/login.do");
//            return false;
//        }
        return super.preHandle(request, response, handler);
    }


}
