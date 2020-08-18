/*
 * Copyright(c) 2019 NEXTCORE, Ltd. All Rights Reserved.
 */
package com.nextcore.common.util;


import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.event.EventConstants;


/**
 * File Name : LogUtil.java
 * <p>
 * Description : 공통 로그를 작성하기 위한 API 제공
 *
 * @since 2018. 7. 10.
 *
 *        <pre>
 * History
 * Date             Name                Description
 * 2018. 7. 10.     dev1                최초 작성
 *        </pre>
 */
public class LogUtil {


    public static Logger getLogger() {
        final Throwable t = new Throwable();
        t.fillInStackTrace();

        return LoggerFactory.getLogger(t.getStackTrace()[1].getClassName());
    }


    /**
     * 메소드 시작시에 반드시 호출
     *
     * @param logger
     * @param methodName
     */
    public static void startLog(Logger logger, String methodName) {
        logger.info("### LOG : " + methodName + " START");
    }


    /**
     * 메소드 종료시 반드시 호출
     *
     * @param logger
     * @param methodName
     */
    public static void endLog(Logger logger, String methodName) {
        logger.info("### LOG : " + methodName + " END");
    }


    /**
     * 예외처리 발생시 반드시 호출
     *
     * @param logger
     * @param e
     */
    public static void exceptionLog(Logger logger, Exception e) {
        logger.error("\n### LOG EXCEPTION\n##########################################################\n" + e.toString());
        logger.error(makeStackTrace(e) + "\n##########################################################");
    }


    /**
     * Print Log
     *
     * @param logger logger
     * @param level EventConstants
     * @param methodName method name
     * @param msg message
     */
    public static void printLog(Logger logger, int level, String methodName, String msg) {
        String log = "### LOG\tMethod Name : " + methodName + " / Message : " + msg;

        switch(level) {
            case EventConstants.TRACE_INT :
                logger.info(log);
                break;
            case EventConstants.DEBUG_INT :
                logger.debug(log);
                break;
            case EventConstants.INFO_INT :
                logger.info(log);
                break;
            case EventConstants.WARN_INT :
                logger.warn(log);
                break;
            case EventConstants.ERROR_INT :
                logger.error(log);
                break;
            default :
                logger.debug(log);
                break;
        }
    }


    /**
     * get String from exception stack trace
     *
     * @param t
     * @return
     */
    private static String makeStackTrace(Throwable t) {
        if(t == null) {
            return "";
        }

        try {
            ByteArrayOutputStream bout = new ByteArrayOutputStream();

            t.printStackTrace(new PrintStream(bout));
            bout.flush();

            String error = new String(bout.toByteArray());

            return error;
        } catch(Exception ex) {
            return "";
        }
    }


}
