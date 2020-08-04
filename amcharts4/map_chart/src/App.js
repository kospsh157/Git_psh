import React, {useLayoutEffect, useRef} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";


import am4geodata_southKoreaHigh from "@amcharts/amcharts4-geodata/southKoreaHigh";
// npm install @amcharts/amcharts4-geodata   를 해야 임포트 할 수 있음.

function App(props){
  const chart = useRef(null);
  useLayoutEffect(()=>{

    const map =  am4core.create("chartdiv", am4maps.MapChart); 
    // 지도 종류 설정 
    map.geodata = am4geodata_southKoreaHigh;

    // 지도 영역(국가, 상태 등)은 맵폴리곤시리즈객체로 표시됩니다
    map.projection = new am4maps.projections.Miller();
    const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

    

    // 폴리곤 속성의 템플릿을 이용해 부가기능을 사용 할 수 있다.
    const polygonTemplate = polygonSeries.mapPolygons.template;
    // 마우스 포인터가 있는 지역명 툴팁 표시
    polygonTemplate.tooltipText="{name}"
    // 폴리곤 색칠하기
    polygonTemplate.fill = am4core.color("#74B266");
    // 폴리곤 hover 상태 사용 가능
    const hs = polygonTemplate.states.create("hover");
    // 호버된 곳 지역 다른 색깔로 칠하기
    hs.properties.fill = am4core.color("#367B25");


    
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.events.on("hit", function(ev) {
      map.zoomToMapObject(ev.target);

    });

    
    // Create image series
    const imageSeries = map.series.push(new am4maps.MapImageSeries());

    // Create a circle image in image series template so it gets replicated to all new images
    const imageSeriesTemplate = imageSeries.mapImages.template;

    var circle = imageSeriesTemplate.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#B27799");
    circle.stroke = am4core.color("#FFFFFF");
    circle.strokeWidth = 2;
    circle.nonScaling = true;
    circle.tooltipText = "{title}";

    //위도/경도 찍기
    // Set property fields
    imageSeriesTemplate.propertyFields.latitude = "latitude";
    imageSeriesTemplate.propertyFields.longitude = "longitude";

    // Add data for the three cities
    imageSeries.data = [{
      "latitude": 37,
      "longitude": 126,
      "title": "Seoul"
    }, 
  ];
    
    
    
    const label = map.chartContainer.createChild(am4core.Label);
    label.text = "WorldHigh";



    chart.current = map;

    return () => {
      map.dispose();
    };
  })
    
  return (
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  );

}



export default App;
