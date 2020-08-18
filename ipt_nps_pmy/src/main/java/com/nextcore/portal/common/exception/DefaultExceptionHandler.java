package com.nextcore.portal.common.exception;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.sun.corba.se.impl.presentation.rmi.ExceptionHandler;

import java.lang.annotation.Annotation;

/**
 * DefaultExceptionHandler 예외처리
 * 
 * @author 
 */
public abstract class DefaultExceptionHandler implements ExceptionHandler
{

    protected Log log = LogFactory.getLog(this.getClass());


    public void occur(Exception exception, String packageName) {
        log.debug(" DefaultExceptionHandler run...............");
        exception.printStackTrace();
    }
}
