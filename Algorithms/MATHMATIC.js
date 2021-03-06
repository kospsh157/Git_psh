/*
< 순열과 조합 이항계수 >
경우의 수를 계산할때 크게 2가지 패턴이 있다.
1. 순서가 있는 경우 : 순열 nPr : 서로 다른 n개중 r개를 뽑아서 나열하는 경우의 수
2. 순서가 없는 경우 : 조합 nCr : 서로 다른 n개중 r개를 그냥 순서없이 막 뽑는 경우의 수

nPr = n! / (n-r)!
nCr = n! / (n-r)! * r! 

외워두면 좋은 공식 
1. nCr = nCn-r 
r의 값이 작을 수록 계산하기 편하기 때문에 최대한 공식을 이용해 r의 값을 줄이자


2. 4P3 같이 n-r이 = 1인 경우 순열은  4 * 3 * 2  이 된다. 
4P3 = 4부터 시작해서 3개의 요소를 차례대로 곱한 것  4 * 3 * 2 이다


3. 다음은 그냥 외우자 
0! = 1
nP0 = 1  n개 중에서 순서를 생각해 하나도 뽑지 않는 경우의 수는 1개이다.
nC0 = 1  n개 중에서 하나도 뽑지 않는 경우의 수는 1개이다.

4. 조합 n개 중에서 r개를 뽑는 경우의 수는 이항계수공식과 같다.
이항계수 (n k) 는 nCk와도 같다. 
이항계수 (n k) = (n n-k) 도 성립하기 때문에 조합도 nCk = nCn-k 도 성립한다. 위에 언급했던 공식임

다음과 같은 점화식을 이용하면 계산의 부담을 줄일 수 있다.
(n k) = ((n-1) (k-1)) + ((n-1 k)) 
이걸 조합으로 풀어서 수식으로 바꾸면 

n-1Ck-1 + n-1Ck = nCk 이다. ( 여기서 부터 외우면 됨)
(n-1)! / ((n-1)-(k-1))! * (k-1)!    +   (n-1)! / ((n-1)-k)! * (k-1)    =    n! / (n-k)! * k!








*/




