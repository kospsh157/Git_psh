import java.util.Scanner;

public class if_5 {
    public static void main(String[] args) {
        // 입력 시간 00 00 주어지면
        // 출력은 -45분을 해서 한다.
        // 필요없는 0은 제외한다.

        // 두 가지 방법
        // 첫 번째는 시간을 모두 분으로 환산해서 계산한 다음 출력시에만 다시 시간으로 변환한다.

        Scanner sc = new Scanner(System.in);
        int hour = sc.nextInt();
        int min = sc.nextInt();
        // 00 15와 같이 00 시간 뒤로 마이너스될경우 시간을 임의로 23시간 더해줘야한다.
        int totalMin = 0;
        if (hour == 0 && min < 45) {
            totalMin = 24 * 60;
        }
        totalMin += (hour * 60);
        totalMin += (min - 45);
        int outputHour = totalMin / 60;
        int outputMin = totalMin % 60;

        System.out.println(outputHour + " " + outputMin);

        // 시간와 분단위로 다르게 나눠서 생각하는 방법
        // 시간과 분 값을 입력받는 것 까진 같다
        int a = sc.nextInt();
        int b = sc.nextInt();
        // 45 분 보다 적으면 시간도 -1 해줘야한다.
        if (b < 45) {
            // 시간이 00시이면 -1 할 때 -1이 아니라 23시가 되어야한다.
            // 시간이 00시가 아니라면, 그냥 -1 하면된다.
            if (a == 0) {
                a = 23;
            } else {
                a -= 1;
            }
            // 그리고 나서 현재 분과 45사이의 얼마나 차이값이 있는지 알고 그 만큼 분을 빼줘야한다.
            int sub = 45 - b;
            int realMin = 60 - sub;
            System.out.println(a + " " + realMin);
        } else {
            // 현재 분이 45가 넘는 다면 시간은 그대로 출력 분은 그냥 45를 빼서 출력하면된다.
            System.out.printf(a + " %d", b - 45);
        }
    }
}