---
title: '두 번 만드는 i18n: Flask-babel to next-i18next'
date: 2021-03-29 21:11:32
category: frontend
thumbnail: { thumbnailSrc }
draft: false
---

최근에 회사에서 Flask(jinja2 + jQuery)로 된 웹사이트를 Next.js + Django Rest Framework로 재개발하는 프로젝트를 진행중입니다.

새로 만드는만큼, 많은 개선점을 적용해서 만들고 있지만 특히 많이 느껴졌던 부분이 i18n 부분이라서 이전에는 어떻게 했는 지, 그리고 이제는 어떻게 하고 있는 지에 대해 정리해보고자 합니다.

# Flask-babel

[https://flask-babel.tkte.ch/](https://flask-babel.tkte.ch/) Flask-babel이라는 라이브러리를 사용해서 구현했습니다.

Flask-babel은 babel [http://babel.pocoo.org/en/latest/](http://babel.pocoo.org/en/latest/) 이라는 Python용 i18n 라이브러리를 Flask용으로 래핑한 라이브러리입니다.

jQuery에서도 번역문을 사용해야했기 때문에 해당 라이브러리와 같이 쓸 수 있는 Flask-babel-js도 사용했습니다. ([https://github.com/emdemir/Flask-Babel-JS/](https://github.com/emdemir/Flask-Babel-JS/))

## 설정

```
[python: **.py]
[jinja2: **/templates/**.html]
extensions=jinja2.ext.autoescape,jinja2.ext.with_

[javascript:**/static/**.js]
extract_messages=_,gettext,ngettext
```

이렇게 `babel.cfg` 파일을 만들어주고

```python
from flask_babel import Babel, gettext
from flask_babel_js import BabelJS

babel = Babel(application)
babel_js = BabelJS(application)

@babel.localeselector
def get_locale():
    # Add your custom locale select logic
    return request.accept_languages.best_match(['kr', 'en', 'id'])
```

babel 객체를 초기화해주고, locale을 알 수 있는 `localeselector` 함수를 만들어주면 됩니다.

## 번역문과 사용

message.po

```
msgid "hello_world"
msgstr "안녕하세요!"

msgid "%(username)s_sign_up_fin"
msgstr "%(username)s님의 회원가입을 축하드립니다."
```

js에서

```jsx
alert(_('error_login_required'))
```

Python(jinja2)에서

```html
<p>{{_('%(username)s_sign_up_fin', username=username)}}</p>
```

이런 방식으로 단순하게 번역문을 가져오거나 interpolate할 수 있습니다.

## Pain point

### Namespace의 부재

현재 프로젝트에는 약 3700개의 번역문이 한 파일 안에 존재합니다. 게다가 계층구조도 없으니 번역문 수정, 추가 등을 할 때에 매우 번거롭죠. 번역문의 key가 중첩되지 않게 관리하느라 key가 매우 길어지는 부분도 불편했습니다.

### 중첩 구조를 지원하지 않음

namespace 부재와 더불어서 특정 스코프의 번역문을 Object로 묶을 수도 없고, List를 사용할 수도 없습니다.

이 때문에 리스트 형태의 데이터를 "foo_1", "foo_2" 식으로 관리해야하고 이는 관리 피로에도 직결되는 부분이죠.

만약 중간에 어떤 문장이 추가된다고 하면... 끔찍하게도 일일이 손으로 key에 붙은 index number들을 수정하는 것 말고는 방법이 없습니다. 물론 Jinja2 template file에서 번역문을 불러올 때 사용하는 Key도요! 특히 번역문을 분리하는 방법으로 텍스트 서식을 구현했다면 더 끔찍합니다. 다음 같이요.

이런 **끔찍한** 것

```html
<span>{{_('some_text_01')}} </span>
<strong>{{_('some_text_02')}} </strong>
<span>{{_('some_text_03')}} </span>
```

```
msgid "some_text_01"
msgstr "이런"

msgid "some_text_02"
msgstr "끔찍한"

msgid "some_text_03"
msgstr "것"
```

이런 **정말** _끔찍한_ 것

```html
<span>{{_('some_text_01')}} </span>
<strong>{{_('some_text_02')}} </strong>
<em>{{_('some_text_03')}}</em>
<span>{{_('some_text_04')}} </span>
```

```
msgid "some_text_01"
msgstr "이런"

msgid "some_text_02"
msgstr "정말"

msgid "some_text_03"
msgstr "끔찍한"

msgid "some_text_04"
msgstr "것"
```

물론 이런 성격의 데이터는 i18n에서 다루기보다는 외부 리소스 관리자(CMS, Admin?)를 사용해 마크업이나 마크다운으로 제공하는게 더 바람직하다고 생각합니다만, 일단 제가 겪은 몇가지 케이스에서는 리소스 부족으로 별도의 접근방법을 사용하기는 힘들었습니다 :(

### 컴파일 필요

`*.po` 파일을 `pybabel` 을 통해 바이너리 파일인 `*.mo` 파일로 빌드한 후에야 쓸 수 있습니다.

# i18next

Javascript용 라이브러리인 i18next가 있고, 이를 react용으로 래핑한 react-i18next에다가, 다시 한 번 더 react 기반인 Next.js로 래핑한 next-i18next가 있습니다. 이번에는 next-i18next를 사용했습니다.

i18n routing에 관해서는 Next.js 내장 기능으로 제공합니다. 내장 `Link` 및 `router` 에서 자연스럽게 지원됩니다. ([https://nextjs.org/docs/advanced-features/i18n-routing](https://nextjs.org/docs/advanced-features/i18n-routing))

## 설정

자세한 설정법은 공식 Github의 README를 참고해주세요. [https://github.com/isaachinman/next-i18next](https://github.com/isaachinman/next-i18next)

```jsx
// next-i18next.config.js
const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'kr',
    locales: ['kr', 'en', 'id'],
    localePath: path.resolve('./public/locales'),
  },
}

// app.js
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
```

## 번역문과 사용

```json
/* public/locales/ko/common.json */
{
  "hello-world": "환영합니다!",
  "member": {
    "welcome": "{{username}}님 안녕하세요!"
  },
  "why-our-service": [
    "1. 우리 서비스가 좋은 첫번째 이유",
    "2. 우리 서비스가 좋은 두번째 이유"
  ]
}
```

이런 json 형식으로 번역문을 작성할 수 있습니다.

각 페이지의 `getStaticProps` / `getServerSideProps` 에서

```jsx
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'index'])),
    },
  }
}
```

어떤 namespace의 번역문을 불러올 지 `serverSideTranslations` 의 두번째 인수에서 정할 수 있습니다.

그리고 그 페이지 안에서, 다음과 같이 사용할 수 있습니다.

```jsx
import { useTranslation } from 'next-i18next';

function SomeComponent({username = 'cereme'}){
	const { t, i18n } = useTranslation();
	return (
    <div>
      <p>Current locale is {{i18n.language}}</p>
      <h1>{t('common:hello-world')</h1>
      <p>{t('common:member.welcome', { username })</p>
      <ol>
        {t('common:why-our-service', {returnObjects: true}).map((elem) => (
          <li key={elem}>{elem}</li>
        ))}
      </ol>
    </div>
  )
}
```

## 뭐가 나아졌나

### Namespace

페이지, 도메인별로 namespace를 나누어 번역문을 관리할 수 있습니다.

서비스 전체에서 사용될 수 있는 키워드 같은 경우에는 `common` namespace에 넣어놓고, 적절하게 페이지(혹은 도메인)별로 번역문을 나누어서 번역문 수정이 용이합니다.

### 자유로운 구조 (List, Object 지원)

JSON의 구조를 그대로 사용할 수 있기 때문에 번역파일의 자유도가 훨씬 높습니다.

이런 번역문 파일에서

```json
{
  "items": [
    {
      "title": "카드 할부 결제가 가능한가요?",
      "description": "5만원 이상 결제 시 할부 결제가 가능하며,\n카드사의 기준에 따라서 2~7개월 무이자 혜택을 받으실 수 있습니다."
    }
  ]
}
```

이렇게 렌더링할 수 있습니다.

```jsx
{
  items.map(e => {
    return (
      <FaqElement title={e.title} description={e.description} key={e.title} />
    )
  })
}
```

FAQ 항목이 추가되었을 때를 비교해봅시다. 기존에 Flask-babel을 사용했다면 HTML Template에서 `faq_common_q_5` / `faq_common_a_5` 를 추가해주고, 번역문에 해당 키로 번역문을 추가하고, 빌드한 후 배포해야 했겠죠.

하지만 i18next를 사용하면 json 파일에만 양식에 맞게 데이터를 추가해준 후 배포하면 됩니다.

위에서도 언급했지만, 서식이 포함되어 있거나 내용이 컨텐츠에 따라 동적으로 많이 바뀌는 페이지의 경우 별도의 마크업으로 불러오는게 좋다고 생각합니다.

나름 궁여지책으로, 다음과 같이 Object에 어떤 모양으로 렌더링될 지에 대한 정보를 저장하고 styled-component를 사용하여 비슷하게 구현해봤습니다.

```jsx
{
  ...,
  "items": [
      {"type": "pTitle", "content": "Apex Legends는 왜 재밌을까요?"},
      {"type": "span", "content": "최고의 타격감, 빠른 속도감, 빠른 업데이트!\n"},
      {"type": "spanTint", "content": "※ 주의: 정말 재밌습니다"},
      {"type": "img", "src": "/static/images/apex-legends.png"}
  ]
}
```

```jsx
const ItemStyles = {
  pTitle: styled.p`
    font-size: larger;
    color: #715eff;
    margin-top: 1rem;
    margin-bottom: 1rem;
  `,
  span: styled.span``,
  spanTint: styled.span`
    color: #ff5e8b;
  `,
  img: styled.img`
    display: block;
    margin-top: 1rem;
    margin-bottom: 1rem;
    max-width: 100%;
  `,
}

function selectTag(itemType) {
  return ItemStyles[itemType]
}

// ...

{
  t('items', { returnObjects: true }).map((e, idx) => {
    const Item = selectTag(e.type)
    return (
      <Item key={idx} src={e.src}>
        {e.content}
      </Item>
    )
  })
}
```

이런 페이지도 이전의 방식을 사용했다면, 모든 항목마다 마크업을 작성하고 `some-game-title-1`, `some-game-content-1` 이런 식의 키를 붙이고 그에 맞게 번역문을 작성해야 했을겁니다. 수정할 때 두 배로 고통스러운 점은 더 할 말도 없겠죠.

# Outro

개인적으로 다른 동료 개발자분들과 대화를 나누면서 i18n 작업을 극혐하시는 분들을 꽤 만날 수 있었습니다.

물론 고된 작업이고 레퍼런스도 그렇게까지 많은 편은 아니고, 결과물도 크게 눈에 띠는 파트는 아닙니다.

하지만 순수하게 데이터들을 어떻게 나눠서 저장하고, 어떻게 불러오고, 어떻게 관리할 지에 대해서 많이 고민하는 시간을 가질 수 있었다는 측면에서 꽤 재미있는 시간이였습니다.

> "Bad programmers worry about the code. Good programmers worry about data structures and their relationships." - Linus Torvalds
