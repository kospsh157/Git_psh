package com.nextcore.portal.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration // addhander()의 broadcast.do의 url이 getHandelr에 매핑이된다.
@EnableWebSocket // -> withSockJS()가 실행됨
@EnableWebMvc//이걸 붙여야 configureDefaultServletHandling()이 실행되고 Controller로 들어가기전에 먼저 url handling함
public class SocketHandler extends WebMvcConfigurerAdapter implements WebSocketConfigurer{

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		// TODO Auto-generated method stub
		registry.addHandler(echoHandler(), "/echo").withSockJS();
		
		registry.addHandler(echoHandler(), "/socketjs/echo").withSockJS();
	}
	
	@Bean
    public WebSocketHandler echoHandler() {
        return new WebSocketHandler();
    }
	
	public void configureDefaultServletHandling( DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

	
}
