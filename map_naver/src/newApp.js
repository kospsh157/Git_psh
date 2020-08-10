import React from 'react';
import './App.css';
import {RenderAfterNavermapsLoaded, NaverMap, Marker} from 'react-naver-maps';
import Geocode from 'react-geocode';


function NaverMapAPI() {

  //좌표 - > 주소로 변환
  Geocode.setApiKey("토큰 넣는곳!")
  Geocode.setLanguage('ko')
  const navermaps = window.naver.maps;
  
   const format =(lat,lng)=>{ 
      Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        alert(address+',위도:'+lat+',경도:'+lng)
        },
        )
   }

    const list =[{
        'key':1,
        'lat':37.554722,
        'lng':126.970833,
        'position':new navermaps.LatLng(37.554722,126.970833),
        'animation':2
    },
        {
            'key':2,
            'position':new navermaps.LatLng(38.789789, 127.789546),
            'lat':38.789789,
            'lng':127.789546,
            'animation':2
        },
        {
            'key':3,
            'position':new navermaps.LatLng(36.554722,126.970833),
            'lat':36.554722,
            'lng':126.970833,
            'animation':2
        },
        {
            'key':4,
            'position':new navermaps.LatLng(36.554722,127.970833),
            'lat':36.554722,
            'lng':127.970833,
            'animation':2
        },
        {
            'key':5,
            'position':new navermaps.LatLng(35.654722,127.970833),
            'lat':35.654722,
            'lng':127.970833,
            'animation':2
        }

    ]; 
    

  
  return (

 
    <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
      style={{
        width: '100%', // 네이버지도 가로 길이
        height: '85vh' // 네이버지도 세로 길이
      }}
      defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
      defaultZoom={7} // 지도 초기 확대 배율
      >
          {list.map((item)=>(
              <Marker 
              key={item.key} 
              position={item.position} 
              animation={item.animation}
              onClick={(e)=>{format(item.lat,item.lng,e)}} 
              />
              ))
            }
      </NaverMap>
  );
}
function App() {
  return (
      //실행될때 naver map 모듈을 비동기적으로 요청
    <RenderAfterNavermapsLoaded
      ncpClientId={"토큰 넣는곳!"} // 자신의 네이버 계정에서 발급받은 Client ID
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMapAPI />
    </RenderAfterNavermapsLoaded>
  );
}

export default App;









