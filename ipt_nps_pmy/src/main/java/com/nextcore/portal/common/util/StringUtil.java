package com.nextcore.portal.common.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.web.util.HtmlUtils;

/**
 * StringUtil
 * 
 * @author 
 */
public class StringUtil {


    private static String lastKey = String.valueOf(System.currentTimeMillis());

    /**
     * Null Check List
     * 
     * @param
     * @throws
     */
    public static String ajaxNullCheck(List<? extends Object> list) {
        String strResult = "";
        try {
            if (list == null || list.size() == 0)
                strResult = "[]";
            else {
                JSONArray slaArr = JSONArray.fromObject(list);
                strResult = slaArr.toString();
            }
        } catch (Exception ex) {
            strResult = "[]";
        }
        return strResult;
    }

    /**
     * Null Check Object
     * 
     * @param
     * @throws
     */
    public static String ajaxNullCheck(Object obj) {
        String strResult = "";
        try {
            if (obj == null || obj == "")
                strResult = "[]";
            else {
                JSONObject slaArr = JSONObject.fromObject(obj);
                strResult = slaArr.toString();
            }
        } catch (Exception ex) {
            strResult = "[]";
        }
        return strResult;
    }

    /**
     * Null Check Object
     * 
     * @param
     * @throws
     */
    public static String ajaxNullCheck(List<Map<String, Object>> list, int totalRow) {
        String strResult = "";
        int nIdx = 0;
        try {
            if (list == null || list.size() == 0)
                strResult = "[]";
            else {
                JSONArray jsonArr = new JSONArray();
                for (Map<String, Object> map : list) {
                    nIdx = 0;
                    JSONObject json_obj = new JSONObject();
                    for (Map.Entry<String, Object> entry : map.entrySet()) {
                        if (nIdx == 0) {
                            json_obj.put("RawTotalRow", totalRow);
                            nIdx++;
                        }
                        String key = entry.getKey();
                        Object value = entry.getValue();
                        json_obj.put(key, value);
                    }
                    jsonArr.add(json_obj);
                }
                strResult = jsonArr.toString();
            }
        } catch (Exception ex) {
            strResult = "[]";
        }
        return strResult;
    }
    
    /**
     * JsonCrossTabChange
     * 
     * @param
     * @throws
     */

}
