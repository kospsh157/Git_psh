package Git_psh.java;

import java.util.Arrays;
import java.util.Scanner;
public class Main {
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        int num1 = sc.nextInt();
        int num2 = sc.nextInt();
        
        String bufferEnter = sc.nextLine();
        String str = sc.nextLine();
        
        String[] strArr = str.split(" ");
        
        System.out.println(strArr);


        int[] intArr = new int[num1];

        for(int i=0; i<strArr.length; i++){
            int tempInt = Integer.parseInt(strArr[i]);
            intArr[i] = tempInt;
        }
        
        System.out.println(intArr);

        Arrays.sort(intArr);


        System.out.println(intArr);


        int n = intArr.length;
        int answer = 0;
        for(int i=0; i<n; i++){
            if(intArr[i] == num2){
                answer = i;
            }
        }
        for(int i=0; i<answer+1; i++){
            if(i == answer){
                System.out.print(intArr[i]);
            }else{
                System.out.print(intArr[i] + " ");
            }
            
        }   
    }
}