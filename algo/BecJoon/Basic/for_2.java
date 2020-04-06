import java.util.Scanner;

public class for_2 { // 백준 10950번 문제
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        // n개를 입력 받으면 다음 n개의 입력구문 생성
        // n개의 입력을 받아야 하므로 배열을 생성해서 담는다.
        int[] i_array = new int[n * 2];

        /*
         * //int 타입 배열 선언 int[] i_array; int i_array[];
         * 
         * //배열 생성후 초기화하면 배열의 주소가 할당된다. int[] i_array = new int[8]; //초기값 0 String[]
         * s_array = new String[8]; //초기값 ""
         * 
         * //배열 선언만 해놓고 나중에 초기화를 시킬수도 있다. int[] i_array; i_array = new array[8];
         * 
         * 
         */
        // 배열을 n값의 2배로 생성하고 방 하나하나에 입력값을 대입한다.
        for (int i = 0; i < 2 * n; i++) {
            i_array[i] = sc.nextInt();
        }
        // 배열을 짝수번째방 + 홀수번째방 해서 출력하면
        for (int i = 0; i < 2 * n; i++) {
            // 여기서 출력은 n번만 나와야 하고 더 중요한점은 배열의 방끝이 2n-1 이므로, i는 n까지 올 수 없다.
            // 이 배열의 n번방은 없다. 따라서 null 오류가 뜨므로, i == n 일때 반복문을 종료해줘야한다.
            if (i == n) {
                break;
            }
            System.out.println(i_array[2 * i] + i_array[2 * i + 1]);
        }
    }
}