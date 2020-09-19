---
title: Chalice, serverless framework와 비교했을 때 장단점
date: 2020-02-26 15:09:74
category: backend
thumbnail: { thumbnailSrc }
draft: false
description: 이 글에서는 Chalice가 Serverless framework에 비해는 가지는 장단점에 대해 간단히 다룰 것입니다. 
---

이 글에서는 Chalice가 Serverless framework에 비해는 가지는 장단점에 대해 간단히 다룰 것입니다. 

# TL;DR

AWS의 S3, SNS, SQS, Cloudwatch Event의 간단한 event handler를 python 코드로 관리하실 분들에게 추천하는 프레임워크입니다.

---

Chalice([https://github.com/aws/chalice](https://github.com/aws/chalice))는 AWS(!)에서 제작한 Python을 위한 Serverless framework입니다. 

> You can think of it as Flask/Bottle for serverless APIs.

README에서도 확인하실 수 있듯이, serverless APIs의 Flask/Bottle과 같은 position을 생각하고 만들었다고 합니다.

그러면 한 번 얼마나 간단한 지 살펴볼까요?

~~~python
    from chalice import Chalice
    
    app = Chalice(app_name="helloworld")
    
    @app.route("/")
    def index():
        return {"hello": "world"}
~~~

위 코드를 `chalice deploy` 하면 자동으로 IAM Role, Lambda, API Gateway를 만들고 연결해줍니다! 

하지만 이런 API Gateway + Lambda로 serverless web service를 운영할 수 있게 해주는 기능은 다른 많은 프레임워크들에서도 지원을 합니다. 

Chalice의 진가는 다른 AWS 서비스와의 Intergration을 추가적인 복잡한 yaml 세팅 없이 python decorator로 설정할 수 있다는 점입니다.

S3의 event도 구독할 수 있고, 

~~~python
    from chalice import Chalice
    
    app = Chalice(app_name="helloworld")
    
    # Whenever an object is uploaded to 'mybucket'
    # this lambda function will be invoked.
    
    @app.on_s3_event(bucket='mybucket')
    def handler(event):
        print("Object uploaded for bucket: %s, key: %s"% (event.bucket, event.key))
~~~

Cloudwatch event도 생성해서 lambda와 자동으로 연결할 수 있습니다.

~~~python
    @app.schedule('cron(15 10 ? * 6L 2002-2005)')
    def cron_handler(event):
        pass
    
    @app.schedule('rate(5 minutes)')
    def rate_handler(event):
        pass
    
    @app.schedule(Rate(5, unit=Rate.MINUTES))
    def rate_obj_handler(event):
        pass
    
    @app.schedule(Cron(15, 10, '?', '*', '6L', '2002-2005'))
    def cron_obj_handler(event):
        pass

    app = chalice.Chalice(app_name='foo')
    
    @app.on_cw_event({"source": ["aws.codecommit"]})
    def on_code_commit_changes(event):
        print(event.to_dict())
~~~
SNS Topic과 SQS도 마찬가지로 간단하게 Chalice가 자동으로 Lambda와 간편하게 연결해줍니다.

이렇게 Flask-Like API는 Event-handler 관계를 Decorator-function관계로 알기 쉽게 표현할 수 있는 장점을 가지고 있습니다.

[Getting Started - Python Serverless Microframework for AWS 1.12.0 documentation](https://chalice.readthedocs.io/en/latest/)

기본적인 사용법은 위 문서에 잘 정리되어있으니 참고해주세요!

# 장점

1. 사용법이 매우 간단함

    이는 serverless 진영에서 대부분 내세우는 장점이지만 flask-like API를 채용했다는 장점이 있죠. 또 APIGateway + Lambda를 사용하는 use case에 있어서도 serverless framework의 YAML 작성보다는 Flask-like API가 훨씬 간편한 것 같습니다.

    ~~~yaml
        functions:
          search:
            handler: handler.search
            events:
              - http:
                  path: /search
                  method: get
                  cors: true
                  request:
                    parameters:
                      querystrings:
                        query: true
                        page: true
    ~~~
    전 이거 좀 끔찍한거같아요...

2. AWS 리소스와 쉽게 연결할 수 있음

    역시 serverless framework에서 S3 event에 연결하는 코드를 봐보면 Chalice의 간결함이 느껴집니다.
    ~~~yaml
        functions:
          users:
            handler: users.handler
            events:
              - s3:
                  bucket: photos
                  event: s3:ObjectCreated:*
                  rules:
                    - prefix: uploads/
                    - suffix: .jpg
    ~~~
    사실 Chalice에서도 decorator에 저 정보를 채워넣어야 하긴 하지만, YAML을 작성하는 것과 python decotrator에다가 값을 넣는 것은 편의성의 차이가 크다고 생각합니다.

# 단점

1. Python만 지원함 

2. AWS의 모든 기능이 지원되는건 아님

    애초에 간단하게 쓸 목적으로 쓰던거라 아직 불편함을 느끼지 못하긴 했지만, 공식 문서에서 얼마든지 coverage가 떨어질 가능성을 언급했습니다.

3. AWS만 지원함

    serverless framework는 여러 cloud vendor를 지원합니다. multi-cloud 환경을 염두에 두고있다면 Chalice는 적합하지 않을 것 같네요.

# 취향

1. local package 패키징 방식
    - serverless framework
        ~~~yaml
            plugins:
              - serverless-python-requirements
            
            package:
             include:
               - your_local_package/**
        ~~~
        `serverless-python-requirements` 플러그인을 사용해서 저런 식으로 Lambda에 로컬 패키지를 올릴 수 있습니다.

    - Chalice

        `vendor/` 디렉토리 밑에 패키지를 놔두면 Lambda에 올릴 때 한 단계 위 디렉토리로 옮겨줍니다.
        ~~~
            your-chalice-project/
            ├── .chalice
            │   └── config.json
            ├── vendor
            │   └── your-local-package
            │       ├── __init__.py
            │       └── foo.py
            ├── app.py
            └── requirements.txt
        ~~~
        이런 식으로 로컬에서 개발하고 `chalice deploy` 로 배포하시면 Lambda function은 다음과 같은 디렉토리 구조로 구성이 됩니다.
        ~~~
            your-chalice-function/
            ├── your-local-package
            │   ├──  __init__.py
            │   └──  foo.py
            ├── app.py
            └── requirements.txt
        ~~~
        저는 이렇게 개발하면 개발환경에서 로컬 패키지에 대한 자동완성이 동작하지 않기 때문에 불편해서 별로 좋아하지 않는 부분인데, serverless에서 로컬 패키지를 패키징하는 방식이 plugin을 추가로 깔고 세팅에 잡다하게 추가해야하는 방식인걸 감안하면 Chalice쪽이 훨씬 더 간단하게 처리하는 걸 수도 있겠네요.