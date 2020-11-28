---
title: 'about me'
date: 2020-09-19 16:21:13
type: about
---

# 배상윤(cereme, Sang yun Pae)

<div>
  산업기능요원 소집해제일 : 2023-09-22
  <img src="https://badgen.net/badge/%EC%97%AD%EC%A2%85/%ED%98%84%EC%97%AD/green/"/>
</div>

제품을 만들어내고 문제를 해결하는 것이 너무 즐거운 소프트웨어 개발자입니다.

제품 팀을 위해 어떤 형태로든 기여하는 것을 즐기는 팀플레이어입니다. 스타트업 Co-founder 경험이 있습니다!

제품을 만들기 위해 어떤 기술도 가리지 않고 적용하고 싶어하는 Fast learner입니다.

자바스크립트, 파이썬, 웹 생태계에 많은 관심과 애정을 가지고 있습니다.

현재 (주)헤렌에 재직중이며, 인스타팀에서 Python backend & DevOps 및 팀리드 포지션으로 일하고있습니다.

좋은 제품을 만들어나가는 팀에서 제 모든 능력을 발휘해 다같이 최고의 프로덕트를 완성해나가고 싶습니다.

|             |                                 |
| :---------: | ------------------------------- |
| **GitHub**  | <https://github.com/cereme>     |
|  **Blog**   | <https://cereme.dev>            |
| **Contact** | <ceremebsy@gmail.com>           |


# Experiences
## (주)헤렌 (2019.12 ~)
* Position : 인스타팀 팀리드(2020.05~), Backend & DevOps developer

### Projects
  * 인스타차트
    * 2020.05 부터 스프린트 및 스크럼 마스터를 맡았습니다.
    * 기술부채에 대해 팀원들과 논의하며 감당할 수 있을 때 처리할 수 있도록 매니징했습니다.
    * 주니어 개발자 채용을 위해 채용 과제를 만들고 기술 면접을 주도했습니다.
  * 인스타차트 웹사이트
    * Falcon framework로 인스타차트 웹사이트를 개발했습니다.
    * MySQL, AWS Neptune의 트랜잭션 동시성 이슈를 진단하고 수정했습니다.
  * 인스타차트 주문시스템
    * 설계와 개발을 주도했습니다. 기존 인스타겟 서비스 주문시스템의 단점을 보완하면서 Progressive-Zero-Downtime 마이그레이션이 가능하도록 설계했습니다.
    * 불안정한 네트워크 환경, 저사양의 온프레미스 인프라에서도 서비스의 신뢰성이 유지되고 Kubernetes로 관리되는 분산 비동기 작업자를 개발했습니다.
    * 서비스 및 인프라 지표를 전혀 확인할 수 없는 이전 시스템을 개선해 Prometheus와 Grafana로 비즈니스 지표 및 서비스 구성요소들의 상태를 확인할 수 있는 대시보드를 구축해 운영했습니다.
    * Python, Php, Celery, RabbitMQ, Kubernetes, Docker, Prometheus, Grafana, Chalice를 사용했습니다.
  * 인스타팀 인터널 시스템 운영 및 개선
    * 5개 이상의 내부 운영에 필요한 인터널 시스템을 신규 개발, 유지보수, 운영했습니다.
    * API Gateway, Elastic Beanstalk을 많은 AWS 리전에 동일하게 배포해야 하는 요구사항을 Terraform으로 작성해 해결했습니다.
    * Dockerize 되어있지 않은 내부 서비스를 Dockerize하고 Prometheus로 지표를 모니터링하여 안정성을 높였습니다.
  * 개발문화
    * 개발팀의 문서들이 hackmd, Confluence 등으로 파편화 되어있는 상황에서 Notion 도입을 제안하고 추진했습니다.

## Team Meta4 (2019.01 ~ 2019.12)
* Position : Co-Founder, CTO

### Projects
   * [중고래](https://joongorae.com) MVP (2019.09)
     * 중고 거래 사이트가 많이 생기는 것을 보고, 간단하게 여러 사이트들의 중고 거래 검색 결과를 통합해보면 좋겠다는 아이디어가 나와서 시작한 토이 프로젝트입니다.
     * AWS Lambda에 Python으로 작성한 크롤러를 올리고, React.js로 웹앱을 제작했습니다. 3일만에 완성했습니다.
     * React.js, Serverless.js(python)
   * [아보 *AVO (All Video On)*](https://play.google.com/store/apps/details?id=com.avoapp) ~~MVP~~ ( 2019.04~ )
     * 유튜브, 트위치, 아프리카 등 인터넷방송과 동영상 컨텐츠를 한 번에 간단하게 보고자 하는 니즈를 충족하기 위해 만든 통합 동영상 앱입니다.
     * React Native로 앱 개발 전체를 담당했으며, Ruby on Rails 및 AWS Lambda로 각 사이트의 웹 크롤러를 작성했습니다.
     * Firebase, UXCam, Mixpanel 등 다양한 UX Tool의 사용을 계획하고 적용했습니다.
     * react-native-webview에 javascript를 inject하여 앱 내에서 웹사이트와 다양한 상호작용을 개발했습니다.
     * Google play와 App store 합쳐서 약 1만5천의 다운로드를 기록했습니다.
     * React-Native, Ruby on Rails, AWS Lambda, Heroku
   * [사물함 호랑이](https://lockertiger.com) ( 2018.11~ 2019.3 ~ )
     * 대학교 학생회에서 오픈카톡, 페이스북 댓글, 네이버 카페 댓글 등 비효율적인 방법으로 학생들의 사물함 배정을 하는 불편함을 해소하기 위해 간단한 UI와 결제관리 기능을 도입해 만든 사물함 예약 플랫폼입니다.
     * 영화관 예약처럼 사물함 배치도를 보고 클릭해서 예약할 수 있는 웹앱을 만들었습니다.
     * 사물함 배정 정보를 이미지, 엑셀로 export하고, 보증금 결제 여부 등을 학생회가 쉽게 관리할 수 있는 관리자 웹앱을 만들었습니다.
     * 대학교 지역상권 마케팅과 연계하기 위해 동적으로 페이지 내에 광고를 배치할 수 있고, 광고 실적을 트래킹할 수 있는 광고 시스템 및 광고주 관리제 웹페이지를 만들었습니다. 실제로 한 학교에서 두 지역사업체가 의뢰하여 광고를 진행했습니다.
     * 사물함 신청 시에 몰리는 트래픽을 감당하기 위해 boto3로 학생회들의 시작 스케줄에 맞춰 ELB Target Group에 ec2 갯수를 조절하고, RDS MySQL 인스턴스를 Scale up/down 하는 스크립트를 작성하여 운영했습니다.
     * Express.js, Vue.js, AWS, Zeit now(현 Vercel)
   * Project Flagger Prototype( 2018.09 ~ 2019.01 )
     * Express.js, Vue.js, Bootstrap, Socket.io, Redis

# Core skills
**Bold: Fluent**, *Italic: just experienced*, Normal: confident more than *italic*, less then **Bold** :)
* Backend : **Falcon**, **Flask**, SQLAlchemy, Celery, Sanic, Django(DRF), Express.js, *gin-gonic*
* Web Frontend : **React.js**, **Vue.js(2.0)**, jQuery
* DevOps : Docker, Prometheus, Grafana, Elastic Beanstalk, *Kubernetes*, *ECS*, *boto3*, *Terraform*
* App dev : React Native(<0.60)
* Database : MySQL, PostgreSQL, AWS Neptune, Redis
* ML : *Keras*
* Windows dev : Win32API
* Other : **Web Crawling&Scraping**, Selenium, Puppeteer, *Fiddler*
* Adorable tools : Insomnia, Sentry

# Awards
 * 2018 정보보호 R&D 데이터 챌린지 (AI기반 악성코드 탐지 부문) 본선 7팀 (2018.12)
    * Keras 모델 제작 및 코딩 (탐지율 92%) 
* KMU - KISIA 정보보호 방안 논문 공모전 - 우수상 (3위) (2018.04)
    * 국내 사이버보험 커버리지 개선안에 대한 연구
 * 2018 중앙대 다빈치 소프트웨어 해커톤 우수상 (2018.05)
    * 아침형인간: 아침에 알람과 함께 정보를 제공하는 인공지능 스피커 개발
 * 카이버 네트워크 블록체인 공모전 - 본선 5팀 (2018.02)
    * 블록체인을 활용한 탈중앙화된 광고플랫폼
 * 2017 중앙대 다빈치 소프트웨어 공모전 최우수상 (2017.12)
    * 이등병의 편지: 입대관련 정보를 제공하는 카카오톡 챗봇 개발
 * 2010 정보올림피아드 중등부 공모 부문 전국 동상 (2010)
 * 2009 정보올림피아드 초등부 경시 (서울) 장려상 (2009)

# Education
 * 중앙대학교 산업보안학과 전공(학사), 사이버보안 연합전공(학사)
    * 2017년 입학 - 휴학중
