## 开发
```
npm i

启动h5
npm run dev:h5

启动微信小程序
npm run dev:mp-weixin

```

## 打包
```
打包h5
npm run build:h5

打包微信小程序
npm run build:mp-weixin
```


## 如何升级当前uniapp sdk？
打开命令行工具，执行命令npm view @dcloudio/uni-app打印当前最新的版本号，找到vue3: 版本号在这是一串数字 复制 上述版本号 替换掉根目录中的package.json文件中的版本号。然后执行 npm install升级，安装即可。

你也可以在uniapp官方的npm版本库中找到最新的版本号[@dcloudio/uni-app](https://www.npmjs.com/package/@dcloudio/uni-app?activeTab=versions)，切换至：Version后，第一个对应的VUE3那一栏3.0.0-alpha-304xxxxx这个就是版本号。