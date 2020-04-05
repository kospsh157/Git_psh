import java.util.Scanner;

class if_2 {
    public static void main(final String[] args) {
        final Scanner sc = new Scanner(System.in);
        final int score = sc.nextInt();

        if (score >= 90) {
            System.out.println("A");
        } else if (score >= 80 && score <= 89) {
            System.out.println("B");
        } else if (score >= 70 && score <= 79) {
            System.out.println("C");
        } else if (score >= 60 && score <= 69) {
            System.out.println("D");
        } else {
            System.out.println("F");
        }
    }
}