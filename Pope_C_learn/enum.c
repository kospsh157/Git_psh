/*
    열거형 쓰는 곳에 String / int 쓰는 것은 안좋은 행동이다. 


    씨에서는 열거형은 그냥 정수에 별명 붙이는 수준이다. 실수를 막아주지 않는다. 


    

*/

/*
 씨샵에서 열거형 쓰기 
 enum EDay {MONDAY, TUESDAY, WEDNESDAY}
 enum EMonth {JANUARY, FEBRUARY, MARCH}

 EDay humpDay = EDay.WEDNESDAY; 
 EMonth birthMonth = hump_day;  // 컴파일 오류



 씨에서 열거형 쓰기
 enum day { DAY_MONDAY, DAY_TUESDAY, DAY_WEDNESDAY}
 enum mont { MONTH_JANUARY, MONTH_FEBRUARY, MONTH_MARCH}
 
 enum day hump_day = DAY_WEDNESDAY;
 enum month birth_month = hump_day;  // 컴파일 오류 안남 이게 됨  >> 태어난 달이 수요일이 되버림 
(씨샵과 달리 타입을 강제하지 않는다.)

 
 */



