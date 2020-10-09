// axios로 데이터를 보낼 때 파일이나, 이미지나, 동영상의 경우 폼데이타에 담아서 보낸다.
// 따라서 폼데이타를 사용하는 방법도 알아야 한다.


const formData = new FormData();
formData.append('name', name);          // 첫번째 파라미터가 키값이 되고 두 번째 파라미터가 데이터이다.
                                        // 이렇게 담고 formData를 axios로 보내면 된다. 



                                        


