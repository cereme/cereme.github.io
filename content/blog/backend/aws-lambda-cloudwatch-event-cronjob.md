---
title: AWS Lambda와 Cloudwatch의 Event를 통해 주기적으로 Lambda 함수 실행하기
date: 2020-09-19 16:09:18
category: backend
thumbnail: { thumbnailSrc }
draft: false
description: AWS Lambda Cronjob으로 실행하기
---


![image](/images/yoshi_slack.png)

이렇게 일주일에 한 번 업데이트되는 식단표를 슬랙에 공유하고 싶었다.

![image](/images/slack_menu.PNG)

물론 온라인으로 식단표를 공유하지 않는 식당은 이렇게 사진으로 찍어서 올리는 수밖에 없지만...

마침 옮기게 된 사무실 주변에 있는 국립국악원 구내식당은 온라인으로 식단표를 제공했다!

매주 월요일 아침마다 식단표를 긁어올 수 있게 AWS Lambda와 Cloudwatch를 구성해보자.

## Lambda 함수 만들기

![image](/images/slack_lambda.png)

Slack의 Incoming Webhook을 KMS Encrypt해서 저 블루프린트를 채우는 과정은 다음 글을 참고하면 좋다.

[(다시쓰는) AWS CloudWatch Alarm Writing to Slack Using Lambda by ngee](https://ngee.tistory.com/1449)

[Lambda로 Slack에 메세지 작성하기를 위한 key 생성 및 URL 암호화](https://ngee.tistory.com/1139)

그리고 우리는 Cloudwatch 로그를 전송할것이 아니므로, 관련 소스코드를 삭제한 후,

~~~javascript
def lambda_handler(event, context):
    base_url = 'http://www.gugak.go.kr'
    page_source = urlopen('http://www.gugak.go.kr/site/homepage/menu/food').read().decode('utf-8')
    
    img_url = re.compile(r'<img src=\"(.*)\" alt').search(page_source)[1]
    
    logger.info(base_url + img_url)

    slack_message = {
        'channel': SLACK_CHANNEL,
        "text" : "http://www.gugak.go.kr/site/homepage/menu/food",
        "attachments" : [
            {
                "image_url": base_url + img_url,
                "thumb_url": base_url + img_url
            }
        ]
        
    }

    req = Request(HOOK_URL, json.dumps(slack_message).encode('utf-8'))
    try:
        response = urlopen(req)
        response.read()
        logger.info("Message posted to %s", slack_message['channel'])
    except HTTPError as e:
        logger.error("Request failed: %d %s", e.code, e.reason)
    except URLError as e:
logger.error("Server connection failed: %s", e.reason)
~~~

이런식으로 짜준다.

![image](/images/slack_lambda_timeout.png)

인터넷 리소스에 접근하는 코드이기때문에 Lambda의 기본 타임아웃(3초)은 초과할 수 있다. 넉넉하게 Timeout을 늘려주자.

## Cloudwatch Event by cron expression

![image](/images/slack_cloudwatch.png)

Cloudwatch > 이벤트 > 규칙에 들어가서 "규칙생성" 버튼을 누른다.

![image](/images/slack_cloudwatch_cron.png)

**2019/03/18 수정**

**KST는 GMT+9니까, GMT-9를 입력해줘야죠... KST 09:00:00을 표현하고싶으면 GMT 00:00:00을 설정하는게 맞습니다...**

그리고 이렇게 cron expression을 입력하면 어떤 시점들이 트리거되는지 리스트로 보여준다. 밑에 "자세히 알아보십시오"를 누르면 식을 어떻게 작성해야되는지 나와있으니 참조하자.

![image](/images/slack_cloudwatch_lambda.png)

그리고 아까 Lambda에서 만들었던 함수를 연결시켜주면 된다.

## 끝!

slack message의 attachments에 image link를 넣어서 그런지 간헐적으로? 이미지가 보이지 않는다... (계속 하면 가끔 됐다 안됐다 랜덤으로 재현됨...)

lambda에서 사진 데이터를 다운로드 받은 후 S3에 올려서 Slack에 link를 넘겨주면 해결될 것 같긴 한데 아직 시도는 못해봤다.