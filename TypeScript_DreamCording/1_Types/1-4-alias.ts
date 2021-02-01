{
    // TypeScript의 꽃 타입 엘리어스
    /*
        새로운 타입을 내가 정의 할 수 있다.
    */

    // type 키워드로 새로운 타입을 정의 할 수 있음. 
    type Text = string;
    const name: Text = 'ellie';
    const address: Text = 'korea';
    
    // 원시 타입 뿐만 아니라, 객체 형태로도 정의 할 수 있다.
    type Student = {
        name: string;
        age: number;
    }
    // 위에서 Student타입을 정의하고 다음과 같이 쓴다.
    const student: Student = {
        name: 'ellie',
        age: 12,
    }
    
    // String Literal Types
    // 직접 특정 문자열만 넣을 수 있는 타입
    type Name = 'name';
    let ellieName: Name;
    ellieName = 'dfdf'  // error
    ellieName = 'name'  // name 문자열만 저장 가능

    type Boal = true;
    const isCat: Boal = true;
    const isCat2: Boal = false; // error
    
}