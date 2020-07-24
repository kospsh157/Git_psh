/*
    람다식은 익명함수를 만들어서 써야할때 간단하게 익명함수를 생성하기 위한 식이다. 
    주로 메소드에서 파라미터에 익명함수를 넣어서 써야할 때 사용된다.

    


*/
// 람다식 사용안할때는 직접 생성자함수로 클래스를 생성하고 그 안에 메소드를 써줘야했다.
// 자바는 클래스 밖에 메서드를 만들 수 없으므로, 익명함수를 만들때 클래스도 만들어야했다.

@FunctionalInterface
interface Say{
    int someting(int a,int b);
}

class Person{
    public void hi(Say line) {
	int number = line.someting(3,4);
	System.out.println("Number is "+number);
    }
}

Person rin = new Person();
rin.hi(new Say() {
    public int someting(int a, int b) {
	System.out.println("My Name is Coding-Factory");
	System.out.println("Nice to meet you");
	System.out.println("parameter number is "+a+","+b);
	return 7;
    }
});


// 람다식을 이용하면 익명 클래스를 만들지 않고 바로 익명함수를 만들수 있다.
Person rin = new Person();
rin.hi((a,b) ->{
	System.out.println("This is Coding-Factory!");
	System.out.println("Tank you Lamda");
	System.out.println("parameter number is "+a+","+b);
    return 7;
});


// 람다식을 이용한 스레드 구현
// 기존 방식
new Thread(new Runnable() {
    @Override
    public void run() { 
       System.out.println("Welcome Heejin blog"); 
    }
 }).start();

 // 람다식 사용
new Thread(()->{
    System.out.println("Welcome  to my vscode");
}).start();
