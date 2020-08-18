/*
 * Copyright (c) 2019 NEXTCORE, Ltd. All Rights Reserved.
 */
package com.nextcore.common.util;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.nextcore.common.CommonConstants.RETVAL;


/**
 * File Name : SessionUtil.java
 * <p>
 * Description : session util
 *
 * @since 2019. 2. 26.
 *
 *        <pre>
 * History
 * Date             Name                Description
 * 2019. 2. 26.     dev_77        최초 작성
 *        </pre>
 */
public class SessionUtil {


    private final static String SESSION_BEAN_NAME = "SESSION_BEAN";


    /**
     * Session 생성
     *
     * @param request
     * @param user
     * @return
     */
    public static boolean createSession(HttpServletRequest request, Object user) {
        boolean retVal = RETVAL.BOOL.FAIL;

        HttpSession session = request.getSession();
        session.setAttribute("SESSION_BEAN_NAME", SESSION_BEAN_NAME);
        session.setAttribute(SESSION_BEAN_NAME, user);

        retVal = RETVAL.BOOL.SUCCESS;
        return retVal;
    }


    /**
     * Session 체크
     *
     * @param request
     * @return
     */
    public static boolean isEnableSeession(HttpServletRequest request) {
        return getSessionBean(request) != null ? RETVAL.BOOL.SUCCESS : RETVAL.BOOL.FAIL;
    }


    /**
     * Get Session Object
     *
     * @param request
     * @return
     */
    public static Object getSessionBean(HttpServletRequest request) {
        Object sessionBean = null;

        HttpSession session = request.getSession();
        Object obj = session.getAttribute(SESSION_BEAN_NAME);

        if(obj != null) {
            sessionBean = session.getAttribute(SESSION_BEAN_NAME);
        }

        return sessionBean;
    }


}
