// 스위치에서 goto문 잘 쓰기 
/*
    C#에서 스위치문을 쓸 때
    1. 만약 첫 번째 캐이스문에서 break하고 나와야하는데
    2. 그 다음 캐이스문도 하고 break하고 싶다면 
    3. 그냥 할려면 코드 중복을 만들거나, 함수로 따로 만들어서 호출해야한다.
    4. 둘다 좋은 방법이 아니다.
    5. 이 때 goto 방법을 쓰면! 좋다! 

*/

switch (status){
    case ERequest.New : // 어떤 새로운 요청이 들어왔을 때
        id = queueRequest(request);
        goto case ERequest.Pending;
    case ERequest.Pending:
        if(isComplete(id)){  // 해당 api가 작동이 끝났으면 Complete로 goto 
            goto case ERequest.Complete;
        }
        break;   // 아직 계산중이라면, 그냥 여기서 스위치문 종료
    case ERequest.Complete :
        break;
    default : 
        throw new ArgumentOutOfRangeExcepttion(
            $"unhandled ERequest:{status}"
        );
}