# LineTable

体验地址：

https://linetable.suezp.cn

VUE3 + ElementPlus + Vue-router + Axios.js

通过前端配置的 crud 列表

平平无奇的表格

## 为什么要搞个表格

     事情是这样的，我老姐的工作室需要统计客户信息，由于excel 用的不太好并且数据太多 有时候电脑卡，
 我就帮她开发了个简简单单的 管理系统 一开始只有一个页面叫 周年客户数据 功能就是普遍的 增删改查功能 
 关键字搜索 编辑之类的， 过了几天==  我姐又发了我一个excel 表格过来 数据和上次不是一个表的 理所当然我
 有新开了一个页面 但是功能呢是一模一样的 除了字段不同，  晚上我姐说在外面电脑不方便，理所当然我就干了两个
 H5 的页面 监听可视区域的宽度 跳转路由 这个时间段还好只有两个页面维护基本也没我啥事。 .......又过了几天
 新的表 又来了 ，目前有 4个表  功能算是完全一样吧  字段小差别  所以我就想着 让我姐他们工作室 自己新建表，
 因为 功能重复度极高， 我就开始了。  现在才 刚刚开始  。   后台是用node写的 我也不知道什么并发之类的--
 后台功能也是  C V 操作 所以--   

 ## 进度  

 目前 已完成表格的 增删改   以及 二级页面列表的 增删改查  目前的功能比较基础， 列表数据项宽度支持的更改保存。
 下一步把 介绍和教程写上去把  后期再多增加一些可编辑性。  

 缺陷 目前的时间选择器 功能还不太完善  后期想把编辑改为详情 以及添加一些 图片的上传和展示。

 还想做一些 流程管理带一些 等级管理的操作。


 ## 配置 VITE 

.env.production  .env.development  
配置文件内以 VITE_ 开头的变量可以在 js 中获取到  以 import.meta.env.XXX  获取到 

默认 两种模式 可自定义模式 


通过  .env.XXX  配置模式名称 在文件中 NODE_ENV=production 来申明当前基本模式 
启动  vite build --mode XXX   来自定义模式 以及环境内容

# BUG1 
如果打开了 一个表格  返回首页再删除该表格个之后   再TAB 导航上 还是存在改tab 
首页删除表格 的时候 同步以下 store 中的 TAG 

---已修复


目前的体验地址 大佬们手下留情 

https://linetable.suezp.cn