<div align="center">
	<img src="https://sm-megrez-prd.oss-cn-hangzhou.aliyuncs.com/1/assetsFiles/zb-trans.png" style="width: 110px;"/>
	<h2>zb-trans</h2>
</div>

## 简介

[zb-trans](https://github.com/xxyu98/zb-trans) 使用定义的一些常量来进行坐标系转换 无需再次调用第三方 api 转换

## 特性

- 无需调用地图 convertFrom 插件来进行 ajax 请求进行坐标转换 减少网络波动所造成接口响应速度问题

## 安装使用

```bash
npm i zb-trans
```

## 转换函数

- wgs84togcj02 **原始坐标转为高德地图坐标**

  ```javascript
  import { wgs84togcj02 } from 'zb-trans'
  const [gd_lng, gd_lat] = wgs84togcj02(lng, lat)
  ```

- gcj02tobd09 **高德地图坐标转百度地图坐标**

  ```javascript
  import { gcj02tobd09 } from 'zb-trans'
  const [gd_lng, gd_lat] = gcj02tobd09(lng, lat)
  ```

- wgs84tobd09 **原始坐标转为百度地图坐标**

  ```javascript
  import { wgs84tobd09 } from 'zb-trans'
  const [gd_lng, gd_lat] = wgs84tobd09(lng, lat)
  ```

## 开源作者

[@xxyu98](https://github.com/xxyu98)