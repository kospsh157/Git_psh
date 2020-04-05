import java.util.Scanner;

public class if_4 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // line 다르게 두 번의 숫자 입력 들어옮.
        int x = sc.nextInt();
        int y = sc.nextInt();
        // 이렇게 해도 1 2 하든 1 enter 2 하든 같은 결과를 보여줌 >> nextInt는 뭘하든 숫자만 인식하고 종료됨

        if (x > 0 && y > 0) {
            System.out.println("1");
        } else if (x < 0 && y > 0) {
            System.out.println("2");
        } else if (x < 0 && y < 0) {
            System.out.println("3");
        } else if (x > 0 && y < 0) {
            System.out.println("4");
        }
    }
}