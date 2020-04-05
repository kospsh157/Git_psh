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
    }
}