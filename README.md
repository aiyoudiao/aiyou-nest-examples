# nest

## 业务开发

创建服务：npx nest g service user logical  
创建控制器：npx nest g controller user logical  
创建模块：npx nest g module user logical  

## 数据库

`https://mp.weixin.qq.com/s?__biz=MzA5NTcxOTcyMg==&mid=2247484018&idx=1&sn=b4c314834f03306c8b157d0361b3b3d0&scene=19#wechat_redirect`

yarn add sequelize sequelize-typescript mysql2 -S  


## jwt sso

https://mp.weixin.qq.com/s?__biz=MzA5NTcxOTcyMg==&mid=2247484023&idx=1&sn=fc1711c3885259287edccf9adb422d11&scene=19#wechat_redirect

yarn add crypto -S  
yarn add passport passport-jwt passport-local @nestjs/passport @nestjs/jwt -S  
yarn add -D @types/passport @types/passport-jwt @types/passport-local

**创建 auth**  
npx nest g service auth logical  
npx nest g module auth logical
