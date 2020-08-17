import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

export const NaverAPIMap = (props) => {
  const NAVER_API_KEY = "97uime5b4b";

  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={NAVER_API_KEY} // 자신의 네이버 계정에서 발급받은 Client ID
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMap
        mapDivId={"root"} // default: react-naver-map
        style={{
          width: 800, // 네이버지도 가로 길이
          height: 800 // 네이버지도 세로 길이
        }}
        defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
        zoom={props.zoom}
      >
        {props.address !== null
          ? props.test.map((ele, idx) => {
              return (
                <Marker
                  // icon={""}
                  key={idx}
                  position={{ lat: ele.lat, lng: ele.lng }}
                  animation={2}
                  onClick={() => {
                    alert('hello');
                  }}
                />
              );
            })
          : null}
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
};

export default NaverAPIMap;