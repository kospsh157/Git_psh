package com.nextcore.portal.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class WebSocketHandler extends TextWebSocketHandler {
    // 접속하는 사용자에 대한 세션을 보관하기 위해 정의
    private SessionManager clients;
    
    private static WebSocketHandler thisObj = null;
	private static boolean boolAlready_init = false;

	
    public WebSocketHandler() {
        super();
        clients = SessionManager.getInstance(); 
    }
    
    public synchronized static WebSocketHandler getInstance(){
		if ( thisObj == null ){
			try {
				thisObj = new WebSocketHandler();
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
	}
	
	
	public synchronized void sendToClientMessage(String message) throws Exception
	{
		System.out.println("Send Noti Data ::::::::: " + message+"::::::::::::::::"+clients.getSessionList().size());
		
		for (WebSocketSession client : clients.getSessionList()) {  
			synchronized(client){
				System.out.println(" 2222222222223123123123123123123123123123123   Send Noti Data : " + message); 
	            client.sendMessage(new TextMessage(message));
			}
        }
	}
	
  
    // 클라이언트와 서버가 연결에 성공했을 때 실행되는 메소드
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        System.out.println("Session Connected");
         
        // 메시지 발송을 위해 세션목록에 추가한다.
        clients.add(session);
    }
  
    // 클라이언트가 서버로 메시지를 전송했을 때 실행되는 메소드
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payloadMessage = message.getPayload();
         
        for (WebSocketSession client : clients.getSessionList()) {
            client.sendMessage(new TextMessage("ECHO : " + payloadMessage));
        }
    }
  
    // 클라이언트와 서버가 연결을 끊었을 때 실행되는 메소드
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        System.out.println("Closed");
        // 메시지 발송 제외를 위해 세션목록에서 삭제한다.
        clients.remove(session);
    }
    
    @Override
	public boolean supportsPartialMessages() {
	    return false;
	}
}
