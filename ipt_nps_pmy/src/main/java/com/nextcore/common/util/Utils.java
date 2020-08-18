package com.nextcore.common.util;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayOutputStream;
import java.nio.charset.Charset;
import java.nio.charset.CharsetEncoder;
import java.nio.charset.StandardCharsets;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


/**
 * Utils
 *
 * @author 9010661
 */
//@SuppressWarnings({ "unchecked", "rawtypes" })
public class Utils {

    public static String USER_SESSION_KEY = "USER_INFO";

    public static String SUCCESS = "success";

    public static String FAIL = "fail";

    // Page variable
    public static int viewCount_10 	= 10;
    public static int viewCount_15 	= 15;
    public static int viewCount_20 	= 20;
    public static int blockCount 	= 10;
    public static int viewCount_6 	= 6;
    public static int viewCount_9 	= 9;



    public static synchronized String getUUID() {
        return UUID.randomUUID().toString();
    }


    /*단순히 금액을 표시할경우 세자리마다 ','를 찍는다.*/
    public static String makeValueAsCurrency(String value) {
        if (value == null || value.trim().equals(""))
            value = "0";

        DecimalFormat df = new DecimalFormat("#,###");

        return df.format(Long.parseLong(value.trim()));
    }

    /**
     * Array의 Empty 를 확인
     *
     * @param objs
     * @return
     */
    public static boolean isEmptyArray(Object[] objs) {
        return (objs == null || objs.length == 0);
    }

    /**
     * List 의 Empty를 확인
     *
     * @param list
     * @return
     */
    public static boolean isEmptyList(Collection list) {
        return (list == null || list.isEmpty());
    }

    /**
     * String의 Empty를 확인
     *
     * @param strs
     * @return
     */
    public static boolean isEmpty(String... strs) {
        for (int i = 0; i < strs.length; i++) {
            if (strs[i] == null || "".equals(strs[i]))
                return true;
        }
        return false;
    }

    /**
     * 데이터를 HTML 데이터 형식으로 변환
     *
     * @param plnstr
     * @return
     */
    public static String replaceSecOutput(String plnstr) {
        if (isEmpty(plnstr))
            return plnstr;
        else
            return plnstr.replace("&", "&amp;amp;").replace("<", "&amp;lt;")
                    .replace(">", "&amp;gt;").replace("#", "&amp;#35;")
                    .replace("\\", "&amp;quot;").replace("'", "&amp;#39;");
    }

    /**
     * Map 의 Empty 가 아닌지 확인
     *
     * @param map
     * @return
     */
    public static boolean isNotEmptyMap(Map map) {
        return !isEmptyMap(map);
    }

    /**
     * Map 의 Empty 를 확인
     *
     * @param map
     * @return
     */
    public static boolean isEmptyMap(Map map) {
        return (map == null || map.isEmpty());
    }

    /**
     * List 데이터가 Empty가 아닌지 확인
     *
     * @param list
     * @return
     */
    public static boolean isNotEmptyList(Collection list) {
        return !isEmptyList(list);
    }

    /**
     * String 데이터 들이 Empty 가 아닌지 확인
     *
     * @param strs
     * @return
     */
    public static boolean isNotEmpty(String... strs) {
        return !isEmpty(strs);
    }


    /**
     * 문자열로 변환
     *
     * @param celValue
     * @return
     */
    public static String toString(Object celValue) {
        if (celValue == null)
            return null;
        if (celValue instanceof byte[])
            return new String((byte[]) celValue);
        return String.valueOf(celValue);
    }


    /**
     * Parameter에 들어온 문자중 (value) 두번째 parameter(token)에 해당하는 문자를 걸러낸다.
     *
     * @param    value String
     * token string
     */
    public static String[] split(String value, String token) {
        String[] ret = null;
        StringTokenizer st = null;
        int len = 0;

        //value = (value==null?"":value.trim());
        value = (value == null ? " " : value);
        st = new StringTokenizer(value, token);
        len = st.countTokens();
        ret = new String[len];

        for (int i = 0; i < len; i++)
            ret[i] = st.nextToken().trim();
        return ret;
    }

    /**
     * Parameter에 들어온 문자중 (value) 두번째 parameter(token)에 해당하는 문자를 걸러낸다.
     *
     * @param    value String
     * token string
     */
    public static List<String> splitArray(String value, String token) {
        List<String> ret = new ArrayList<String>();
        StringTokenizer st = null;
        int len = 0;

        //value = (value==null?"":value.trim());
        value = (value == null ? " " : value);
        st = new StringTokenizer(value, token);
        len = st.countTokens();

        for (int i = 0; i < len; i++) {
            ret.add(st.nextToken().trim());
        }

        return ret;
    }

    public static String delTokenconcat(String value, String token) {
        String buffer = "";
        String[] ret = split(value, token);

        for (int i = 0; i < ret.length; i++)
            buffer += ret[i];

        return buffer;
    }

    public static String replaceTokenconcat(String value, String token, String replace) {
        String buffer = "";
        String[] ret = split(value, token);

        for (int i = 0; i < ret.length; i++)
            buffer += ret[i] + replace;

        return buffer;
    }

    public static String Tokenconcat(String[] value, String token) {
        String buffer = "";
        int idx = 0;

        for (int i = 0; i < value.length; i++) {
            if (value[i].trim().equals(""))
                continue;

            if (idx == 0)
                buffer = value[i];
            else
                buffer = buffer + token + value[i];

            idx++;
        }
        return buffer;
    }

    public static String nvl(String str, String nullStr) {
        if (str == null || str.trim().length() == 0)
            return nullStr;
        else
            return str;
    }

    public static int MonthlyLastDate(int my1, int mm1) {
        int mYear1, mMonth1;
        mYear1 = my1;
        mMonth1 = mm1;

        if (mMonth1 == 1 || mMonth1 == 3 || mMonth1 == 5 || mMonth1 == 7 || mMonth1 == 8 || mMonth1 == 10 || mMonth1 == 12) {
            return 31;
        } else if (mMonth1 == 2) {
            if ((mYear1 % 4) == 0 && ((mYear1 % 100) != 0 || (mYear1 % 400) == 0)) {
                return 29;
            } else {
                return 28;
            }
        } else {
            return 30;
        }
    }

    private static String escape(char ch) {
        StringBuffer sb = new StringBuffer();
        /**
         * 기존 한글 check로직에문제발생함.
         * 2010.12.22 한글관련해서 hex로 한글체크함
         */
        /*
        String ncStr = "=;:`,?~!#$%^&(){}[]\\'*+-./0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz ";
        if (ch > 0x7f) {
            sb.append("%u" + Integer.toHexString((int) ch).toUpperCase());
        }
        else if (ncStr.indexOf((int) ch) == -1) {
            sb.append('%');
            if (ch < 0xf) {
                sb.append('0');
            }
            sb.append(Integer.toHexString((int) ch).toUpperCase());
        }
        else {
            sb.append(ch);
        }
        */

        if (ch >= 0xAc00 & ch <= 0xD7A3)
            sb.append("%u" + Integer.toHexString(ch).toUpperCase());
        else
            sb.append(ch);

        return sb.toString();
    }

    private static String toNumericCode(char extendedChar) {
        String unicodeString = escape(extendedChar);
        StringBuffer sb = new StringBuffer();
        if (unicodeString.indexOf("%u") >= 0) {
            // non-ASCII code -> Numeric character reference or character entity
            // reference
            unicodeString = "&#" + Integer.parseInt(unicodeString.substring(2), 16) + ";";
        }
        sb.append(unicodeString);
        return sb.toString();
    }

    public static String convertStringToBrowserStyle(String string) {
        if (string == null) {
            return null;
        }
        Charset charset = StandardCharsets.UTF_8;
        CharsetEncoder encoder = charset.newEncoder();
        StringBuffer sb = new StringBuffer();
        char ch;
        for (int i = 0; i < string.length(); i++) {
            ch = string.charAt(i);
            if (encoder.canEncode(ch)) {
                //sb.append(ch);
                sb.append(toNumericCode(ch));
            } else {
                //sb.append(toNumericCode(ch));
                sb.append(ch);
            }
        }
        return sb.toString();
    }

    public static String getDay(String format) {
        String sTodayTime = null;
        SimpleDateFormat df = new SimpleDateFormat(format);
        sTodayTime = df.format(new Date());

        return sTodayTime;
    }


    public static String getYoil() {
        int year, month, day;
        String sToday = null;
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
        sToday = df.format(new Date());
        int result = 0;
        String ret = null;

        year = Integer.parseInt(sToday.substring(0, 4));
        month = Integer.parseInt(sToday.substring(4, 6));
        day = Integer.parseInt(sToday.substring(6, 8));

        result = (((day + (13 * ((month + 9) % 12 + 1) - 1) / 5
                + year % 100
                + year % 100 / 5
                + year / 400
                - 2 * (year / 100)) % 7 + 7) % 7 + 1);

        switch (result) {
            case 1:
                ret = "월요일";
                break;
            case 2:
                ret = "화요일";
                break;
            case 3:
                ret = "수요일";
                break;
            case 4:
                ret = "목요일";
                break;
            case 5:
                ret = "금요일";
                break;
            case 6:
                ret = "토요일";
                break;
            case 7:
                ret = "일요일";
                break;
        }

        return ret;
    }


    public static String delCdataTag(String XMLString) {
        while (true) {
            if (XMLString.indexOf("<![CDATA[") != -1) {
                XMLString = XMLString.substring(0, XMLString.indexOf("<![CDATA[")) + XMLString.substring(XMLString.indexOf("<![CDATA[") + 9);
            } else if (XMLString.indexOf("]]>") != -1) {
                XMLString = XMLString.substring(0, XMLString.indexOf("]]>")) + XMLString.substring(XMLString.indexOf("]]>") + 3);
            } else {
                break;
            }
        }

        return XMLString;
    }

    public static String getPage(int total, String cpage, int viewCount) {
        String retStr = "<div class='paging'>";
        cpage = cpage == null ? "1" : cpage;

        if (total > viewCount) {
            // 페이지 나누기....
            int total_page = (int) (Math.ceil((double) total / (double) viewCount)); // 총 페이지 수
            int page_start = (int) ((Math.ceil(Double.parseDouble(cpage) / (double) Utils.blockCount) - 1.0) * Utils.blockCount + 1); // 시작 페이지
            int page_end = page_start + Utils.blockCount - 1;

            if (page_end > total_page) {
                page_end = total_page; // 마지막페이지가 총페이지보다 크면 총페이지수를 마지막페이지로..
            }


            if (Integer.parseInt(cpage) > 1) {
                retStr += "<li><a href=\"javascript:doPagingClick('1')\"><img src='/resources/images/bbs/bbs_prevend.gif' alt='처음으로'></a></li> "; // 첫페이지
            } else {
                //retStr += "<span class='mgr'><a href=\"#\"><img src='/resources/admin/images/btn_pageFirst.gif' alt='처음으로'></a></span> "; // 첫페이지
            }


            if (page_start > Utils.blockCount) {
                int h = page_start - 1;
                retStr += "<li><a href=\"javascript:doPagingClick('" + h + "')\"><img src='/resources/images/bbs/bbs_prev.gif' alt='이전'></a></li>";
            }

            if (total_page != 0) {
                //retStr += "&nbsp;";
            }

            for (int i = page_start; i <= page_end; i++) {

                if (i == Integer.parseInt(cpage))
                    retStr += "<li class='selected'>" + i + "</li>"; // 현재페이지
                else
                    retStr += "<li><a href=\"javascript:doPagingClick('" + i + "')\">" + i + "</a></li>";
            }

            // => 표시
            if (page_end < total_page) {
                int k = page_end + 1;
                retStr += "<li><a href=\"javascript:doPagingClick('" + k + "')\"><img src='/resources/images/bbs/bbs_next.gif' alt='다음'></a></li>";
            } else {
                //retStr += "<span class=\"page_div\">|</span> <span class=\"page_bt\">다음</span> "; // 다음10개
            }


            if (Integer.parseInt(cpage) < total_page) {
                retStr += "<li><a href=\"javascript:doPagingClick('" + total_page + "')\"><img src='/resources/images/bbs/bbs_nextend.gif' alt='끝으로'></a></li>"; // 마지막페이지
            } else {
                //retStr += "<span class=\"page_arrow\">▶</span>"; // 마지막페이지
            }


            retStr += "</div>";
        } else
            retStr = "";

        return retStr;
    }

    public static byte[] changeHex2Byte(String hex)
            throws IllegalArgumentException {
        if ((hex == null) || (hex.length() <= 0) || (hex.length() % 2 != 0)) {
            throw new IllegalArgumentException();
        }
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        for (int i = 0; i < hex.length(); i += 2) {
            int b = Integer.parseInt(hex.substring(i, i + 2), 16);
            baos.write(b);
        }
        return baos.toByteArray();
    }

    //20101103 YHLEE ADD
    public static String byteArray2hexString(byte[] array) {
        String s = byteArray2hexString(array, 0, array.length);
        return s;
    }

    public static String byteArray2hexString(byte[] array, int offset) {
        return byteArray2hexString(array, offset, array.length - offset);
    }

    public static String byteArray2hexString(byte[] array, int offset, int length) {
        StringBuffer hexString = new StringBuffer();
        for (int i = offset; i < offset + length; i++) {
            String tmp = Integer.toHexString(array[i] & 0xff).toUpperCase();
            if (tmp.length() == 1)
                hexString.append("0" + tmp);
            else
                hexString.append(tmp);
        }
        return hexString.toString();
    }


    public static String rename(String exp) {
        long currentTime = System.currentTimeMillis();
        SimpleDateFormat simDf = new SimpleDateFormat("yyyyMMddHHmmss");
        int randomNumber = (int) (Math.random() * 100000);

        String uniqueFileName = "" + randomNumber + simDf.format(new Date(currentTime)) + "." + exp;

        return uniqueFileName;
    }

    public static String dateFormat(String date) {
        String retStr = "";

        if (date.getBytes().length == 8)
            retStr = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6);
        else if (date.getBytes().length == 14)
            retStr = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8) + " " + date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12);

        return retStr;
    }

    public static String format(String str, int len, char ctype) {
        String formattedstr = "";
        byte[] buff;
        int filllen = 0;

        if (str == null)
            str = "";

        if (str.getBytes().length > len) {
            buff = new byte[len];
            System.arraycopy(str.getBytes(), (str.getBytes().length - len), buff, 0, len);
            str = new String(buff);
            buff = null;
        }

        buff = str.getBytes();


        filllen = len - buff.length;
        formattedstr = "";
        if (ctype == '9') {// 숫자열인 경우
            for (int i = 0; i < filllen; i++) {
                formattedstr += "0";
            }

            formattedstr = formattedstr + str;
        } else { // 문자열인 경우
            for (int i = 0; i < filllen; i++) {
                formattedstr += " ";
            }
            formattedstr = str + formattedstr;
        }
        return formattedstr;
    }

    public static String addDate(String fromDate, String format,
                                 int addYear, int addMonth, int addDate,
                                 int addHour, int addMinute, int addSecond) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = null;
        try {
            date = sdf.parse(fromDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Calendar cal = new GregorianCalendar();
        cal.setTime(date);
        cal.add(Calendar.YEAR, +addYear);
        cal.add(Calendar.MONTH, +addMonth);
        cal.add(Calendar.DATE, +addDate);
        cal.add(Calendar.HOUR_OF_DAY, +addHour);
        cal.add(Calendar.MINUTE, +addMinute);
        cal.add(Calendar.SECOND, +addSecond);

        SimpleDateFormat sdf2 = new SimpleDateFormat(format);
        String toDate = sdf2.format(cal.getTime());

        return toDate;
    }

    public static String addDate(String format,
                                 int addYear, int addMonth, int addDate,
                                 int addHour, int addMinute, int addSecond) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = new Date();

        Calendar cal = new GregorianCalendar();
        cal.setTime(date);
        cal.add(Calendar.YEAR, +addYear);
        cal.add(Calendar.MONTH, +addMonth);
        cal.add(Calendar.DATE, +addDate);
        cal.add(Calendar.HOUR_OF_DAY, +addHour);
        cal.add(Calendar.MINUTE, +addMinute);
        cal.add(Calendar.SECOND, +addSecond);

        SimpleDateFormat sdf2 = new SimpleDateFormat(format);
        String toDate = sdf2.format(cal.getTime());

        return toDate;
    }

    public static String minusDate(String fromDate, String format,
                                   int addYear, int addMonth, int addDate,
                                   int addHour, int addMinute, int addSecond) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = null;
        try {
            date = sdf.parse(fromDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Calendar cal = new GregorianCalendar();
        cal.setTime(date);
        cal.add(Calendar.YEAR, -addYear);
        cal.add(Calendar.MONTH, -addMonth);
        cal.add(Calendar.DATE, -addDate);
        cal.add(Calendar.HOUR_OF_DAY, -addHour);
        cal.add(Calendar.MINUTE, -addMinute);
        cal.add(Calendar.SECOND, -addSecond);

        SimpleDateFormat sdf2 = new SimpleDateFormat(format);
        String toDate = sdf2.format(cal.getTime());

        return toDate;
    }

    public static String minusDate(String format,
                                   int addYear, int addMonth, int addDate,
                                   int addHour, int addMinute, int addSecond) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = new Date();

        Calendar cal = new GregorianCalendar();
        cal.setTime(date);
        cal.add(Calendar.YEAR, -addYear);
        cal.add(Calendar.MONTH, -addMonth);
        cal.add(Calendar.DATE, -addDate);
        cal.add(Calendar.HOUR_OF_DAY, -addHour);
        cal.add(Calendar.MINUTE, -addMinute);
        cal.add(Calendar.SECOND, -addSecond);

        SimpleDateFormat sdf2 = new SimpleDateFormat(format);
        String toDate = sdf2.format(cal.getTime());

        return toDate;
    }

    public static String temporaryPassword(int size) {

        StringBuffer buffer = new StringBuffer();

        Random random = new Random();

        String[] chars = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9".split(",");

        for (int i = 0; i < size; i++) {

            buffer.append(chars[random.nextInt(chars.length)]);

        }

        return buffer.toString();

    }


    /**
     * 공통 사용 Param method
     *
     * @param req
     * @param result
     * @return
     */

    public static Map<String, String> getParameters(HttpServletRequest req, Map<String, String> result) {
        if (result == null) result = new HashMap<String, String>();

        Enumeration<String> names = req.getParameterNames();
        String _name;

        while (names.hasMoreElements()) {
            _name = names.nextElement();
            result.put(_name, getTrimedValue(req, _name));
        }

        return result;
    }


    public static String getTrimedValue(HttpServletRequest req, String name) {
        String _value = req.getParameter(name);
        return (_value == null ? "" : _value.trim());
    }


    /**
     * Null date chage "0"
     * @param data -> return
     * @param key  -> chart_key x-data
     * @param lfield -> left ex) left change data ex) S_,R_
     * @param rfield -> Right ex) Right change data ex ) _peta , _giga , _mega ...
     * @return
     */
    public static HashMap<String, String> getNullData(HashMap<String, String> data, String key, String lfield, String rfield) {
        try {
            String[] keys = split(key, ",");

            String[] lfields = null;
            if (lfield != null)
                lfields = split(lfield, ",");
            String[] rfields = null;
            if (rfield != null)
                rfields = split(rfield, ",");


            for (String item : keys) {
                item    = delTokenconcat(item, "'");
                if (lfield != null) {
                    if (data.get(lfields[0] + "_" + item) != null) continue;

                    for (String field : lfields)
                        data.put(field + "_" + item, "0");
                } else {
                    if (rfield != null) {
                        if (data.get(item + "_" + rfields[0]) != null) continue;

                        for (String field : rfields)
                            data.put(item + "_" + field, "0");
                    }
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return data;
    }
}

