---
title: Vue cli 3에서 IE11 Polyfill 하기
date: 2019-05-09 16:09:07
category: frontend
thumbnail: { thumbnailSrc }
draft: false
description: Vue CLI 3 IE 11 Polyfill
---

Vue 앱을 IE에서 켜다보면 화면이 제대로 나오지 않거나, 빈 페이지가 나오거나 한다.

Polyfill을 하면 해결된다.

1. ```yarn add babel-polyfill```

2. main.js에 추가
```javascript
import 'babel-polyfill'; //add this line
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
```

3. vue.config.js에 webpack 설정 추가
만약 없다면 루트 디렉토리에 파일을 만들면 된다.
```javascript
module.exports = {
    configureWebpack: {
        entry: ["babel-polyfill", "./src/main.js"]
    }
}
```