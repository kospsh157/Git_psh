import React, {useState} from 'react'
import {NaverMap, Marker} from 'react-naver-maps'

const naverMaps = window.naver.maps;
const jeju = new naverMaps.LatLng(33.3590628, 126.534361);
const domDiv = document.querySelector("root")


 
export default function App2(){
    const [data, setData] = useState([]);
    //let mapDiv = document.querySelector("map")
    // 마커 리스트
    let markerList = [];
    let maps
    // 정보창 리스트
    let infoWindowList = [];

  
    
    let handerIndex = 0;
    

    

    return(
      <NaverMap 
      id='maps-examples-marker'
      style={{
        width: '100%',
        height: '400px',
      }}
      
      defaultCenter={new naverMaps.LatLng(37.3595704, 127.105399)}
      defaultZoom={10}
      clickable={true}
      onClick={(e)=>{
        
        setData(...data, e.coord)
        console.log(data)
        markerList.push(data)
        console.log(markerList)
       
       
      
      }}
    >
      <Marker 
        position={data}
        animation={naverMaps.Animation.BOUNCE}
        clickable={true}
        onClick={() => {
          alert('여기는 네이버 입니다.')
        }}
      />
    </NaverMap>
    )
}
