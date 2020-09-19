---
title: Flask에서 Vue.js 템플릿 사용하기
date: 2019-05-09 16:09:73
category: frontend
thumbnail: { thumbnailSrc }
draft: false
description: Flask에서 Vue.js template setting javascript load
---

간단하게 만든 앱에서, 백엔드는 ```Flask```, 프론트엔드는 ```Vue.js```로 구성을 했는데, 빌드해서 templates에 넣으니, 페이지가 제대로 안나오는 문제가 있었다.

# Solution
1. Vue 빌드 후 빌드 결과물 flask templates 폴더로 복사

2. Flask에서 static_folder 설정
~~~python
app = Flask(__name__, static_folder="./templates")
~~~

3. index.html에서 main.js를 static folder에서 load하도록 변경
~~~html
<script type="text/javascript" src="{{ url_for('static', filename='main.js') }}"></script></body>
~~~

# 사족

```
127.0.0.1 - - [09/May/2019 10:04:14] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [09/May/2019 10:04:14] "GET /main.js HTTP/1.1" 404 -
```

Flask 로그 보고 왜 안되는지 깨달았당.