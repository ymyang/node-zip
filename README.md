# node-zip
zip and unzip folder for node

# 安装

```
npm install node-zip-dir
```

# 使用

```
var zip = require('node-zip-dir');

// 压缩
zip.zip('E:/Temp', 'E:/Temp.zip').then(function() {
    console.log('success');
}).catch(function(err) {
    console.error(err);    
});

// 解压
zip.unzip('E:/Temp.zip', 'E:/Temp1').then(function() {
    console.log('success');
}).catch(function(err) {
    console.error(err);    
});

```



