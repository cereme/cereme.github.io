---
title: 간단한 json storage 만들기 with S3, Lambda, API Gateway
date: 2019-06-07 16:09:32
category: backend
thumbnail: { thumbnailSrc }
draft: false
description: AWS S3, Lambda, API Gateway를 사용해서 간단한 json 저장소를 만들어보자
---

DB를 사용할 수 없는 상황에서, 간단한 json 값을 저장할 수 있는 key-value store를 AWS S3, Lambda, API Gateway를 사용하여 만들어봤습니다.

## 안읽어도 되는 배경설명

[사물함 호랑이](https://lockertiger.com) 서비스에서 DB Scale down을 하느라 Downtime이 발생할 수밖에 없는 구조를 채택했습니다.

그래서 maintenance 상태를 DB에서 저장하고 API로 프론트엔드에 알려주려고 했습니다.

~~~javascript
router.post('/maintain/start', function(req, res){
    meta.update({isMaintaining: true}
    , where:{/* ... */})
    .then(()=>{
            //...
        });
});

router.post('/maintain/', function(req, res){
    meta.find(/* ... */,
        {attributes:['isMaintaining']})
    .then(()=>{
        // ...
    });
});
~~~

DB서버가 내려갔는데 DB에 저장하고 읽어오면... 분명히 피곤할 때 짰었을거에요 ㅎㅎ;

## 목적

보통 간단한 정보(json, key-value)를 저장하기 위해서 Redis, memcached를 씁니다.

어차피 AWS를 쓰면 [Elasticache](https://aws.amazon.com/ko/elasticache/)로 간단하게 Redis나 memcached를 관리형으로 사용 할 수 있지만, 처음 쓰시는 분은 러닝커브도 좀 있고 **정말 정말** 간단한 일에는 어울리지 않죠. (좋은 서비스이긴 합니다.)

 * 값의 변경이 잦지 않고
 * key-value 구조이고
 * 주로 읽기만 많이 하고
 * 간단하고 빠르게 구축해야 하는

상황에서 다음과 같은 방법을 사용해봤습니다!

## 구조

### 값을 변경할 때

1. API Gateway에 Request
2. API Gateway가 Lambda 함수에 값 전달&호출
3. Lambda 함수가 S3에 값을 Write

### 값을 읽을 때

1. Public Access를 켜놓은 S3 Bucket의 객체 URL에 그냥 접근

## S3 세팅하기

*퍼블릭 액세스를 허용하지 않고, Lambda에서 Read 함수를 만들어서 API Gateway에서 처리하는 방법도 있습니다. 다만 글의 길이 상 생략합니다.*

1. 버킷을 만든다. (만들면서 퍼블릭 액세스 차단을 비활성화 합시다.)
   
2. 액세스 제어 목록에서 Public Read를 활성화 한다.
 ![image](https://user-images.githubusercontent.com/19284878/59113312-c32f0000-897f-11e9-9adc-a520ccefceec.png)
3. 다른 Frontend에서 불러올거니까 CORS 설정도 해야한다. S3 버킷의 권한 > CORS 탭에서 다음과 같이 CORS 구성을 작성하자.
~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>Authorization</AllowedHeader>
</CORSRule>
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>POST</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>Authorization</AllowedHeader>
</CORSRule>
</CORSConfiguration>
~~~
4. 이제 S3 준비는 끝났습니다.

## Lambda 세팅하기

1. 함수를 생성합니다.
2. 근데 권한을 줄려는데, 정책 템플릿에 보면 S3에 Write할 수 있는 템플릿이 없네요. IAM 콘솔 링크로 가서 역할을 생성합시다.
   ![image](https://user-images.githubusercontent.com/19284878/59113655-6b44c900-8980-11e9-9943-e8e877443487.png)

3. Lambda 선택하고 다음을 누릅니다
   ![image](https://user-images.githubusercontent.com/19284878/59113772-a8a95680-8980-11e9-9f0c-6f45adfe5cc6.png)

4. 우리는 S3에 값을 써야하기 때문에 S3FullAccess가 필요합니다.
   ![image](https://user-images.githubusercontent.com/19284878/59113862-dc847c00-8980-11e9-8d3b-33b2fd6152a9.png)

5. 역할 이름, 설명 등을 쓰시고 역할을 생성합니다.

6. 다시 람다 페이지로 돌아와서, 권한에서 "기존 역할 사용"을 선택하고 아까 만든 역할을 선택한 후 함수를 생성합니다.
   ![image](https://user-images.githubusercontent.com/19284878/59114049-47ce4e00-8981-11e9-82ae-d619d2d8f5f6.png)
   올바른 권한으로 잘 만들어진 모습입니다.

7. 함수를 작성해봅시다. 코드에서는 javascript의 aws-sdk를 사용했지만 python의 boto3를 사용하셔도 좋습니다. 

    ~~~javascript
    exports.handler = async (event) => {
        const AWS = require('aws-sdk');
        const S3 = new AWS.S3();

        const response = await S3.putObject( {
            Bucket: '<your-bucket>',
            Key: 'foo.json',
            ACL: 'public-read',
            Body: JSON.stringify({
                isMaintaining: event.isMaintaining,
            })
        }).promise();
        return response;
    }
    ~~~

    Bucket에 json을 업로드 하기 위해서 bucket 이름, key와 value를 putObject 함수에 넘겨줬습니다.

    그리고 업로드한 객체가 public readable 하도록 ACL에 'public-read'를 지정했습니다.

    더 자세한 putObject 함수에 대해서는 [https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property) 를 참조해보세요.

8. 함수를 저장합니다.

## API Gateway 세팅하기

만들어놓은 Lambda 함수를 호출하기 위해서는 Trigger가 필요합니다. 

백엔드에서 호출하려면 REST API가 제일 간단하니, AWS의 API Gateway를 통해서 우리가 만들어놓은 Lambda 함수를 불러봅시다.

1. API를 새로 만듭니다.
   ![image](https://user-images.githubusercontent.com/19284878/59114840-03dc4880-8983-11e9-9d1b-b60f38f29e86.png)

2. 작업 버튼을 눌러 리소스를 하나 만들어줍니다.

   ![image](https://user-images.githubusercontent.com/19284878/59114943-35edaa80-8983-11e9-829b-2b370385d189.png)

3. 만든 리소스에 대해 메소드를 만들어줍니다. Lambda 함수 입력란에 아까 만들어놓은 함수의 이름을 입력해서 선택하고, 저장합니다.

    ![image](https://user-images.githubusercontent.com/19284878/59115024-5e75a480-8983-11e9-83d2-2e59b3b54ce9.png)

4. API 배포를 하지 않으면 API가 동작하지 않습니다. API 배포를 눌러서 API를 배포합니다.

    ![image](https://user-images.githubusercontent.com/19284878/59115394-2c187700-8984-11e9-90ba-4c4d7d8e063c.png)

5. 사용할 수 있는 API url이 나옵니다.

    ![image](https://user-images.githubusercontent.com/19284878/59115753-e6a87980-8984-11e9-901d-2e4208f5a932.png)

이제 백엔드에서 json body와 함께 POST하기만 하면 됩니다.

읽을 때는 ```https://s3.ap-northeast-2.amazonaws.com/<your-bucket>/foo.json```에 GET 해오면 되구요.

사실 S3 + Lambda + API Gateway는 엄청 강력한 툴입니다만, 이렇게 간단한 용도로 빠르게 쓰기에도 상당히 괜찮다는 생각이 듭니다.

도움이 되셨으면 좋겠으며, 피드백 환영합니다! :)