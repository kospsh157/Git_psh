import React,{useState, useEffect} from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker  } from 'react-naver-maps';


// 네이버 지도에서 좌표
// new navermaps.LatLng(36.734249797, 127.410516004)
 
  function NaverMapAPI() {
    const navermaps = window.naver.maps;
    return (
      <NaverMap
      
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '30%', // 네이버지도 가로 길이
          height: '50vh' // 네이버지도 세로 길이
        }}
        defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
        defaultZoom={10} // 지도 초기 확대
      >
         
        <Marker
          key={1}
          position={new navermaps.LatLng(37.551229, 126.988205)}
          animation={navermaps.Animation.BOUNCE}
          onClick={() => {alert('여기는 N서울타워입니다.');}}
        />

 
      </NaverMap>
    );
  }

  export default function App() {
    return (
      <RenderAfterNavermapsLoaded
        ncpClientId={'97uime5b4b'} // 자신의 네이버 계정에서 발급받은 Client ID
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <NaverMapAPI />
      </RenderAfterNavermapsLoaded>
    );
  }
