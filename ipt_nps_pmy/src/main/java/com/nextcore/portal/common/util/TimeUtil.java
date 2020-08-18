package com.nextcore.portal.common.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;

public class TimeUtil {
//	public static void main(String[] args) throws ParseException {
//		final String DATE_PATTERN = "yyyy-MM-dd HH:mm";
//		String inputStartDate = "2017-02-28 00:00";
//		String inputEndDate = "2017-03-05 00:00";
//		SimpleDateFormat sdf = new SimpleDateFormat(DATE_PATTERN);
//		Date startDate = sdf.parse(inputStartDate);
//		Date endDate = sdf.parse(inputEndDate);
//		ArrayList<String> dates = new ArrayList<String>();
//		Date currentDate = startDate;
//		while (currentDate.compareTo(endDate) <= 0) {
//			dates.add(sdf.format(currentDate));
//			Calendar c = Calendar.getInstance();
//			c.setTime(currentDate);
//			c.add(Calendar.MINUTE, 1);
//			currentDate = c.getTime();
//		}
//		for (String date : dates) {
//			System.out.println(date);
//		}
//	}
	public static List<LinkedHashMap<String,String>> nullTimeZero(List<String> timeList, List<LinkedHashMap<String, String>> graphList){
		List<LinkedHashMap<String,String>> dataList = new ArrayList<LinkedHashMap<String, String>>();
		List<String> keyList = new ArrayList<String>();
		
		LinkedHashMap<String, String> keyHm = new LinkedHashMap<String, String>();
		LinkedHashMap<String, String> hm = new LinkedHashMap<String, String>();
		if(graphList.size() > 0){
			hm = graphList.get(0);
		}
		
		Set set = hm.keySet();
        Iterator iterator = set.iterator();
        while(iterator.hasNext()){
            String mKey = String.valueOf(iterator.next());
            if(!"COLDATES".equals(mKey)){
            	keyList.add(mKey);
            }
        }
		boolean flag = true;
		LinkedHashMap<String, String> dateHm = new LinkedHashMap<String, String>();
		int cnt = 0;
		if(timeList.size() > 0){
			for(int i=0; i<timeList.size(); i++){
				if(graphList.size() > 0){
					flag = true;
					for(int j=0; j<graphList.size(); j++){
						if(timeList.get(i).equals(graphList.get(j).get("COLDATES"))){
							dataList.add(graphList.get(j));
//							System.out.println("  Hm true   :"+graphList.get(j));
							flag = false;
							break;
						}
					}
					if(i>0 && flag){
						dateHm = new LinkedHashMap<String, String>();
						for(int k=0; k<keyList.size(); k++){
							if("COLOR".equals(keyList.get(k))){
								dateHm.put("COLOR", graphList.get(0).get("COLOR"));
							}else{
								dateHm.put(keyList.get(k), "0");
							}
						}
//						dateHm = keyHm;
						dateHm.put("COLDATES", timeList.get(i));
//						System.err.println(" key Hm   :"+ keyHm);
//						System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@   "+ timeList.get(i));
//						System.err.println(" date Hm   :"+ dateHm);
						dataList.add(dateHm);
//						System.err.println("  Hm false   :"+ dateHm);
					}
				}
				
			}
		}
//		for(int d=0; d<dataList.size(); d++){
//			System.out.println("######################## data List #######################      "+dataList.get(d));
//		}
		
		return dataList;
	}
	public static List<String> createTimeMinute(String start, String end, int timeType) throws ParseException{
		// default -3 Hour
				System.out.println(" ############ start    :     "+ start);
				System.out.println(" ############ end    :     "+ end);
				
				final String DATE_PATTERN = "yyyy-MM-dd HH:mm";
				String inputStartDate = "";
				String inputEndDate = "";
				Date date = new Date();
				int diffStart = 0;
				int diffTime = 3;
				if(timeType == 5){
					diffTime = 15;
					date.setMinutes(date.getMinutes()-(date.getMinutes()%5));
				}else if(timeType == 10){
					diffTime = 24;
					date.setMinutes(date.getMinutes()-(date.getMinutes()%10));
//					diffStart = 30-(date.getMinutes()%30);
				}else if(timeType == 30){
					diffTime = 30;
					date.setMinutes(date.getMinutes()-(date.getMinutes()%30));
//					diffStart = 30-(date.getMinutes()%30);
				}else if(timeType == 60){
					diffTime = 60;
					date.setMinutes(date.getMinutes()-(date.getMinutes()%60));
//					diffStart = 60-(date.getMinutes()%60);
				}else if(timeType == 1440){
					diffTime = 4320;
					date.setMinutes(date.getMinutes()-(date.getMinutes()%1440) );
				}
				SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm"); 
				Calendar cal = Calendar.getInstance();
				cal.setTime(date);
				if(start.length() == 0){
					diffStart = timeType-(date.getMinutes()%timeType);
					cal.setTime(date);
					cal.add(Calendar.MINUTE, diffStart);
					cal.add(Calendar.HOUR, -diffTime);
					
					inputStartDate = sd.format(cal.getTime()); 
				}else{
//					date.parse(start);
					date = sd.parse(start);
					diffStart = timeType-(date.getMinutes()%timeType);
					System.err.println(" diffStart  :  " + diffStart);
					System.err.println(" start value start22 ::  "+ (date.getMinutes()%5));
					cal.setTime(date);
					cal.add(Calendar.MINUTE, diffStart);
					inputStartDate = sd.format(cal.getTime()); 
					System.err.println(" inputStartDate  :  "+ inputStartDate);
				}
				
				if(end.length() == 0){
					
					diffStart = timeType-(date.getMinutes()%timeType);
					System.err.println(" diffStart  :  " + diffStart);
					System.err.println(" start value start22 ::  "+ (date.getMinutes()%5));
					cal.setTime(date);
					cal.add(Calendar.MINUTE, diffStart);
					cal.add(Calendar.MINUTE, -10);
					inputEndDate = sd.format(cal.getTime()); 
				}else{
					if("real".equals(end)){
						cal.setTime(date);
						cal.add(Calendar.MINUTE, -0);
						inputEndDate = sd.format(cal.getTime()); 
					}else if("real-1min".equals(end)){
						cal.setTime(date);
						cal.add(Calendar.MINUTE, -1);
						inputEndDate = sd.format(cal.getTime()); 
					}else{
						inputEndDate = end;
					}
				}
				SimpleDateFormat sdf = new SimpleDateFormat(DATE_PATTERN);
				Date startDate = sdf.parse(inputStartDate);
				Date endDate = sdf.parse(inputEndDate);
				List<String> dates = new ArrayList<String>();
				Date currentDate = startDate;
//				int i = 0;
				while (currentDate.compareTo(endDate) <= 0) {
//					if(i%timeType == 0){
//						System.err.println("############################### time");
//						System.err.println(sdf.format(currentDate));
						dates.add(sdf.format(currentDate));
						Calendar c = Calendar.getInstance();
						c.setTime(currentDate);
						c.add(Calendar.MINUTE, timeType);
						currentDate = c.getTime();
//					}
//					i++;
				}
		return dates;
	}
}
