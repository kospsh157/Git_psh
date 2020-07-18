//p173

// 입력으로 숫자 배열과, 타켓 숫자 하나가 주어지고
// 배열에서 임의 2개를 골라 더하면 target숫자가 되는 인덱스를 반환하면된다.
// 임의 2개는 반드시 한 쌍만 존재한다. 또한 배열의 원소에는 중복된 숫자가 들어갈 수 없다.

let twoSum = function(nums, target) { 
    let n = nums.length
    
    let map = new Map()
    for(let i=0; i<n; i++){
        map.set(nums[i], i)
    } 
    
    for(let i=0; i<n; i++){
        let temp = target-nums[i]
        if(map.has(temp) && i !== map.get(temp)){
            let arr = [i,map.get(temp)]
            return arr
        }
    }
}
// indexOf()는 최악의 경우 for문으로 다 돈것과 같다. 한마디로, 느리다.
// 배열에 중복된 숫자가 없다는게 중요하다. 그래야 map의 키로써 사용이 가능하다.
// has()함수를 사용해 target에서 nums의 원소들을 뺀 값이 키에 있는지 확인하는 것으로 약간 더 빠르게 구할 수 있다.
// has()함수는 O(1) 시간복잡도를 가지고 있다.

// 최적의 답안
var twoSum = function(nums, target) {
    let map = new Map()
    for (let i = 0; i < nums.length; i++){
        let r = target - nums[i]
        if (map.has(r)) {
            return [map.get(r), i]
        }
        map.set(nums[i], i)
    }
};

