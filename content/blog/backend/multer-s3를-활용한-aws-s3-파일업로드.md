---
title: multer-s3를 활용한 AWS S3 파일업로드
date: 2018-09-27 16:09:38
category: backend
thumbnail: { thumbnailSrc }
draft: false
---

multer-s3를 활용한 AWS S3 파일업로드. 
사용 스택 : Express.js / Vue.js + [Bootstrap-vue](https://bootstrap-vue.js.org/)


준비물
 1. AWS계정과 IAM 키
 2. AWS S3 버킷
 3. express에서 multer, multer-s3 설치
 
 ## S3 인스턴스 얻어오기
 ```javascript
 let AWS = require("aws-sdk");
 AWS.config.loadFromPath(__dirname + '/../config/aws.json');
 let s3 = new AWS.S3();
```

aws.json은 다음과 같은 형식이다.
```json
{ "accessKeyId": "blahblah", "secretAccessKey": "blahblah", "region": "your_region" }
```

## Upload하는 multer-s3 객체 만들기
```javascript
let multer = require("multer");
let multerS3 = require('multer-s3');
var path = require('path');
var uuid = require('uuid/v4');

module.exports = {
    upload : multer({
        storage: multerS3({
            s3: s3,
            bucket: "your_bucket",
            key: function (req, file, cb) {
                let extension = path.extname(file.originalname);
                cb(null, uuid() + Date.now().toString() + extension)
            },
            acl: 'public-read-write'
        })
    })
};
```
key는 버킷에 올라갈 파일의 이름이다.

## 만든 multer-s3 객체로 POST 라우팅하기

```javascript
//최대 5개까지 업로드할 수 있음
router.post('/upload', s3Api.upload.array('img', 5),function(req, res, next){
    let imgFile = req.files;
    res.json(imgFile);
});

//1개 업로드
router.post('/upload', s3Api.multerS3Upload.single('img'),function(req, res, next){
    let imgFile = req.file;
    res.json(imgFile);
});
```
multer-s3에서 자동으로 AWS S3에 업로드 해줍니다.

## 프론트엔드 만들기

```javascript
<b-form-file v-model="file" ref="fileinput" id="file" 
   accept="image/*" placeholder="Choose a file..."></b-form-file>
```
Bootstrap-vue의 Form file에 대한 공식 정보는 [여기](https://bootstrap-vue.js.org/docs/components/form-file)서 확인할 수 있습니다.

```javascript
let formdata = new FormdData();
formdata.push(file);

axios.post('/upload',formdata,{
  headers:{
    'Content-Type': 'multipart/form-data'
  }
})
.then((res)=>{
  console.log(res);
});
```                
획득한 Javascript File 객체를 FormData에 넣고, 아까 라우팅한 주소에 POST를 해줍니다.