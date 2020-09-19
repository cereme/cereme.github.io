---
title: 시간을 다룰때는 Timezone을 생각하자
date: 2020-03-06 16:09:11
category: backend
thumbnail: { thumbnailSrc }
draft: false
description: moment.js, javascript timezone, UTC
---

2019년 03월 06일, 학생회 사물함 배정 솔루션 "사물함호랑이"를 처음으로 실사용했다.
사이드 프로젝트였고, 다른 프로젝트때문에 시간이 없어 테스트를 거의 못했다.

그래서 나온 실수 2가지 중 2번째다.
상당히 치명적인 버그였다.
저녁 일찍 먹고 컴퓨터 앞에 앉아있지 않았으면 좀 큰일났을 뻔 했다...

문제의 코드는 다음과 같다. (Express.js)
~~~javascript
let openTime = new Date((await meta.findById(1)).openTime);
let nowTime = new Date();
if(nowTime > openTime){
~~~

여기서 Sequelize.js에서 가져온 openTime은 클라이언트에서 입력한 시간이다. 한국 대상 서비스이기때문에 KST 기준으로 입력을 받았다.

테스트코드 없이 날코딩했기때문에 테스트는 로컬에서 수동으로 진행됐고, 로컬의 시간은 KST였다.

근데, 서비스를 하는 환경은 AWS EC2였고, 당연히 시간 설정은 UTC였다.

그래서 실제 시간이 openTime보다 지나도, 서버에서는 nowTime이 KST-9:00 였기때문에 오픈을 못한 참사가 벌어졌다.

서비스에서 사용하는 모든 시간정보는 UTC로 저장하는 것이 편하다, 라는걸 알고 있었는데 '대충하는 사이드프로젝트니까~' 이런 마인드를 가졌던게 화근이다.

일단 서비스를 지속해야하기 때문에 UTC를 KST로 변환하는 코드를 작성해서 적용했다.

~~~javascript
var moment = require('moment');
let nowTime_KST = new Date(new moment().utcOffset('+09:00').toISOString(true).replace('+09:00','Z'));
~~~

이전에 [Project Flagger](https://flagger.space) 알파테스트를 했을 때 "작성한 글 시간 보여주기" 기능에서 인지했던 부분이었는데, 이번에는 심지어 시간이 정말 핵심 비즈니스로직에 관여된 프로젝트에서 캐치하지 못하고 이런 만행을 저지른게 정말 슬프다.

자신의 무능에 엄격하라. 라는 문구를 듣고 처음 실천해보는 실수 포스팅이다. 이제 시간 관련해서 이런 실수는 안했으면 좋겠다.