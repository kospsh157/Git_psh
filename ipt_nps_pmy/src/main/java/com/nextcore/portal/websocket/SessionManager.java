package com.nextcore.portal.websocket;

import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.List;

public class SessionManager {
	private static SessionManager thisObj = null;
	private static boolean boolAlready_init = false;
	private List <WebSocketSession> queue; 
	
	public synchronized static SessionManager getInstance(){
		if ( thisObj == null ){
			try {
				thisObj = new SessionManager();
				if(boolAlready_init == false)
					thisObj.init();
			} catch(Exception e) {
				e.printStackTrace();
			}	
		}
		
		return thisObj;  
	}
	
	private void init()
	{
		boolAlready_init = true;
		queue = new ArrayList<WebSocketSession>();
	}
	
	public void clear()
	{
		queue.clear();
		queue = new ArrayList<WebSocketSession>();
	}
	
	public synchronized void add( WebSocketSession session )
	{
		try{
			queue.add(session);
		}catch(NullPointerException e){
			e.printStackTrace();
			System.out.println("WebSocketSession Class add Exception Error = "+e);
		}catch(Exception e){
			e.printStackTrace();
			System.out.println("WebSocketSession Class add Exception Error = "+e);
		}
	}
	
	public synchronized void remove( WebSocketSession session )
	{
		try{
			queue.remove(session);
		}catch(NullPointerException e){
			e.printStackTrace();
			System.out.println("WebSocketSession Class remove Exception Error = "+e);
		}catch(Exception e){
			e.printStackTrace();
			System.out.println("WebSocketSession Class remove Exception Error = "+e);
		}
	}
	
	public List <WebSocketSession> getSessionList()
	{
		return queue;
	}
}
