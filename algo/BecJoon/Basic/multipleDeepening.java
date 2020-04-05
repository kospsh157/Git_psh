import java.util.Scanner;

class multipleDeepening {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int a = sc.nextInt();
        int b = sc.nextInt();

        // 세 자리 수에서 집의자리를 구하기
        // 세 자리 수에서 백의자리를 구하기
        // 100으로 나누고 그 몫은 백의자리이고 나머지에서 10을 나눈 몫은 10의 자리이다.
        int c = b / 100; // b의 100의 자리수
        int d = b % 100; //
        int e = d / 10; // b의 10의 자리수
        int f = a * e; // 첫 번째 출력인자
        int g = a * c; // 두 번째 출력인자
        int h = a * b; // 세 번째 출력인자

        // 변수가 너무 많다 졸 줄이자
        int digitOfb = b % 10;
        int tensOfb = (b % 100) / 10;
        int hundredsOfb = b / 100;
        // 첫 번째, 두 번째, 세 번째 출력값 구하기
        int firstOutput = a * digitOfb;
        int secondOutput = a * tensOfb;
        int thirdOutput = a * hundredsOfb;
        int fourthOutput = a * b;
        // 이제 출력하기
        System.out.println(firstOutput);
        System.out.println(secondOutput);
        System.out.println(thirdOutput);
        System.out.println(fourthOutput);
    }
}