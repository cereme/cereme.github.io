---
title: React native iOS 실제 iPhone 디바이스에서 실행하기
date: 2019-07-11 16:09:12
category: appdev
thumbnail: { thumbnailSrc }
draft: false
description: React native iOS 실제 iPhone 디바이스에서 실행하기
---

Mac 장비만 있다면 react-native run-ios로 시뮬레이터 실행은 간단히 해볼 수 있습니다. 하지만 실제 iOS 디바이스에서 실행하기 위해서는 절차가 좀 필요합니다.

1. Apple Developer Program 가입

https://developer.apple.com 에서 자신의 Apple ID를 등록하고 KRW 129,000의 애플 개발자 프로그램을 구매해야합니다. ㅠ

![스크린샷 2019-07-11 오전 11 14 59](https://user-images.githubusercontent.com/19284878/61028246-313d6b80-a3f3-11e9-93cb-3099493931a0.png)

이 때 결제수단 명의와 Apple ID 명의가 다르면 결제 후 48시간이 지나도 처리가 안되는데, Apple 고객센터에 전화하면 상담사님이 친절하게 확인 후 등록절차를 진행해줍니다.

2.  XCode에 Apple ID 등록

![image](https://user-images.githubusercontent.com/19284878/61028342-6e096280-a3f3-11e9-8ad0-b4c2e0da1341.png)

![image](https://user-images.githubusercontent.com/19284878/61028466-b6288500-a3f3-11e9-8617-63a13d99c344.png)

그리고 Download Manual Profiles를 클릭해줍니다.

3. Device register

![스크린샷 2019-07-11 오후 3 59 41](https://user-images.githubusercontent.com/19284878/61028940-ecb2cf80-a3f4-11e9-9223-426b17deaab0.png)

아이폰을 USB로 연결하고, Device를 연결한 아이폰으로 선택해줍니다.

![image](https://user-images.githubusercontent.com/19284878/61028911-d60c7880-a3f4-11e9-8b81-1e8423c42c6a.png)

Target의 General 탭의 Signing 섹션을 보면, 위처럼 보입니다. Register Device를 클릭해주면 해당 개발자계정에 아이폰이 등록되게됩니다.

![image](https://user-images.githubusercontent.com/19284878/61029133-4ca97600-a3f5-11e9-8ebd-56817ad9dcf0.png)

개발자 사이트를 들어가서 devices를 확인해보면 이렇게 보입니다.

![image](https://user-images.githubusercontent.com/19284878/61029309-bc1f6580-a3f5-11e9-843e-23c3b7535a1c.png)

XCode에서 General 탭이 위처럼 보이면 준비는 끝입니다!

4. ios-deploy 설치

```  npm install -g ios-deploy ```

5. react-native cli로 실행

```react-native run-ios --device '<아이폰이름>' --configuration Release```

XCode 및 Apple 생태계가 처음이라 애를 좀 먹었습니다 ㅠㅠ