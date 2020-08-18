package com.nextcore.portal.websocket;//package kr.co.nextcore.portal.websocket;
//
//import java.net.URI;
//import java.net.URISyntaxException;
//
//import org.java_websocket.client.WebSocketClient;
//import org.java_websocket.drafts.Draft_17;
//import org.java_websocket.handshake.ServerHandshake;
//
//import net.sf.json.JSONObject;
//
//public class MonWsClient extends WebSocketClient
//{
//	
//	private String mStrMsg	= null;
//
//	public MonWsClient(String strUri, String strTarget, String strMsg) throws URISyntaxException
//	{
//		super(new URI(strUri), new Draft_17());
//
//		JSONObject joData = new JSONObject();
//		joData.put("target", strTarget);
//		joData.put("message", strMsg);
//		mStrMsg = joData.toString();
//	}
//
//	@Override
//	public void onOpen(ServerHandshake handshakedata)
//	{
//		if(mStrMsg != null)
//		{
//			this.send(mStrMsg);
//			mStrMsg = null;
//		}
//		this.close();
//	}
//
//	@Override
//	public void onClose(int intCode, String strReason, boolean boolRemote)
//	{
//		System.out.println(" -ExitCode:" + intCode + ", 사유: " + strReason);
//	}
//
//	@Override
//	public void onError(Exception ex)
//	{
//		System.err.println("*MonWsClient.onError()");
//		System.err.println(" -예외사항:" + ex);
//	}
//
//	public static void main(String[] args) throws URISyntaxException
//	{      
//		String strUri = "ws://127.0.0.1:8079/echo/websocket";
//		WebSocketClient client = new MonWsClient(strUri, "moramcnt", "afafafafafafafafaf 입니다.");
//		client.connect();
//	}
//
//	@Override
//	public void onMessage(String arg0) {
//		// TODO Auto-generated method stub
//		System.out.println(arg0);
//	}
//}