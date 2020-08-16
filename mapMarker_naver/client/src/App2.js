import React, {useState, useRef} from 'react'
import {NaverMap, Marker, GroundOverlay} from 'react-naver-maps'

const naverMaps = window.naver.maps;
const jeju = new naverMaps.LatLng(33.3590628, 126.534361);
const domDiv = document.querySelector("root")


 
export default function App2(){
    const [data, setData] = useState(new naverMaps.LatLng(33.3590628, 126.534361));
    const naverMapDom = useRef();
    const markerDom  = useRef();
    //let mapDiv = document.querySelector("map")
    // 마커 리스트
    let markerList = [];
    let maps
    // 정보창 리스트
    let infoWindowList = [];
    let handerIndex = 0;
   
    

    

    return(
      <NaverMap 
      ref = {naverMapDom}
      id='root'
      style={{
        width: '100%',
        height: '400px',
      }}
      
      defaultCenter={new naverMaps.LatLng(37.3595704, 127.105399)}
      defaultZoom={10}
      clickable={true}
      onClick={(e)=>{
        
        setData(e.coord)
        // 내가 클릭히면 상탯값에 좌표가 찍히고 마커는 보존되어야 한다.
        
        
        
      }}

    



    >
    
    <Marker
      ref = {markerDom}
      position={data}
      //sanimation={naverMaps.Animation.BOUNCE}
      clickable={true}

      onClick={(e) => {
          
          let address
          naverMaps.Service.reverseGeocode({
            coords: new naverMaps.LatLng(e.coord),
            }, function(status, response) {
                  if (status !== naverMaps.Service.Status.OK) {
                    return alert('Something wrong!');
                  }  
                  
                let result = response.v2 // 검색 결과의 컨테이너
                let items = result.results // 검색 결과의 배열
                address = result.address // 검색 결과로 만든 주소
                  
                 
                let infoWindow = new naverMaps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:10px;">"'+ address.jibunAddress +'"</b></div>'
                });
                console.log(e.coord)
                let x = e.coord._let
                let y =  e.coord._lng;
                infoWindow.open(naverMapDom.current, {x, y});

                alert(address.jibunAddress);

            });



      }} 
    />
      
          


    </NaverMap>



    
    )
}
