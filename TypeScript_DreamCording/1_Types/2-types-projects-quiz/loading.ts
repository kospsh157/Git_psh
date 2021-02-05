{
  /**
   * Print Loading State
   */
  type LoadingState = {
    state: 'loading';
  };

  type SuccessState = {
    state: 'success';
    response: {
      body: string;
    };
  };

  type FailState = {
    state: 'fail';
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;


  function printLoginState(loadState: ResourceLoadState): string{
    if(loadState.state==='loading'){
      return loadState.state;
      // 문제점 1: 이 함수의 기능을 제대로 파악하지 못했다. 
      // state에 따라 파라미터가 가지고 있는 다른 프로퍼티를 출력하라는 것이다. 
      // &&로 묶어서 body까지 조건을 걸어버리는 행위는 이 함수의 기능을 이해하지 못 할 것이다.
    }else if (loadState.state === 'success' && loadState.response.body === 'loaded'){
      return loadState.response.body;
    }else if (loadState.state === 'fail' && loadState.reason === 'no network'){
      return loadState.reason;
    }else{
      throw new Error("나도 몰라 에러 났어");
    }
  }
  

  // 출제자 정답 함수
  function printLoginState1(state: ResourceLoadState){
    switch(state.state){
      case 'loading':
        console.log('loading');
        break;
      case 'success':
        console.log(`${state.response.body}`);
        break;
      case 'fail':
        console.log(`${state.reason}`);
        break;
      default:
        throw new Error("알 수 없는 오류");
    }
  }

  printLoginState({ state: 'loading' }); // 👀 loading...
  printLoginState({ state: 'success', response: { body: 'loaded' } }); // 😃 loaded
  printLoginState({ state: 'fail', reason: 'no network' }); // 😱 no network
}
