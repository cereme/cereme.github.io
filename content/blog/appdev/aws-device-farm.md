---
title: 원격으로 테스트디바이스 사용하기 - AWS Device Farm
date: 2019-07-09 16:09:55
category: appdev
thumbnail: { thumbnailSrc }
draft: false
description: 원격으로 테스트디바이스에서 자동, 수동 테스트를 할 수 있는 AWS Device Farm이라는 서비스가 있습니다.
---

React-native 개발하다가, device-specific한 UI 컴포넌트 버그가 있어서 재현을 해보려 했다.

하지만 팀원들이 갖고있는 디바이스를 모두 보니 Galaxy S8, V20이 전부...
(issue는 V20에서 발생했고, Galaxy S8에서는 발생하지 않았다)

답답한 마음에 아 이래서 디바이스가 좀 여러개 있는게 좋겠구나 생각해서 검색하던 도중 AWS Device Farm을 발견했다.

![Screenshot_2019-07-09 AWS Device Farm - Amazon Web Services](https://user-images.githubusercontent.com/19284878/60861100-2dbfae00-a254-11e9-800a-5ef9949fd0e9.png)

![Screenshot_2019-07-09 AWS Device Farm 요금 - Amazon Web Servicess](https://user-images.githubusercontent.com/19284878/60861341-159c5e80-a255-11e9-9792-d1f25e680f0d.png)

와! 시작해보자.

![Screenshot_2019-07-09 AWS Device Farm](https://user-images.githubusercontent.com/19284878/60860976-abcf8500-a253-11e9-9902-365f1de2f10f.png)
국뽕을 느낄 수있다. 두유노우 삼성?

다만 그렇게 디바이스 종류가 많지는 않다. 플래그십모델정도만 있는듯?

아이폰은 모든 모델이 다 있다.

![Screenshot_2019-07-09 AWS Device Farm(2)](https://user-images.githubusercontent.com/19284878/60861148-5b0c5c00-a254-11e9-8b39-37d3cdcf017d.png)
테스트할 앱을 오른쪽에서 Upload 하자.

![스크린샷 2019-07-09 오후 1 55 31](https://user-images.githubusercontent.com/19284878/60861175-74ada380-a254-11e9-86bb-574157df82ea.png)

업로드한 apk를 클릭해서 설치한다. 

실제 환경과 다르게 설치창이 뜨지는 않고 조용하게 알아서 설치된다. 기다리자.

![Screenshot_2019-07-09 AWS Device Farm(3)](https://user-images.githubusercontent.com/19284878/60861281-dbcb5800-a254-11e9-95b9-f201b831ae8a.png)

앱이 설치되었다. AVD 쓰듯이 사용해볼 수 있다. 다만 한국에 리전이 없어서 latency가 조금은 있는 편이다...

---
이걸로 테스트디바이스 구매를 완벽하게 대체할 수는 없겠지만...  특정 디바이스 이슈를 (구매 없이)재현해볼 수 있는 좋은 툴인 것 같다. 

여러 디바이스에서 Automated Test를 해볼 수 있는 기능이 메인인 것 같으니 다음에는 Automated test를 구성해봐야겠다.