/**
 * 地球坐标系：WGS-84
 * 百度地图：bd09
 * 高德地图：gcj02
 */

const X_PI = (3.14159265358979324 * 3000.0) / 180.0;
const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;

/**
 * @description 判断经纬度是否在国外
 * @param {number}    lng - 地理坐标 lng 经度
 * @param {number}    lat - 地理坐标 lat 纬度
 * @return {boolean}  是否在国外
 */

export function outOfChina(lng: number, lat: number): boolean {
  return (
    lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false
  );
}

export function transformlat(lng: number, lat: number) {
  let ret =
    -100.0 +
    2.0 * lng +
    3.0 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng));
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) /
    3.0;
  ret +=
    ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) *
      2.0) /
    3.0;
  return ret;
}

export function transformlng(lng: number, lat: number) {
  let ret =
    300.0 +
    lng +
    2.0 * lat +
    0.1 * lng * lng +
    0.1 * lng * lat +
    0.1 * Math.sqrt(Math.abs(lng));
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) /
    3.0;
  ret +=
    ((150.0 * Math.sin((lng / 12.0) * PI) +
      300.0 * Math.sin((lng / 30.0) * PI)) *
      2.0) /
    3.0;
  return ret;
}

/**
 * @description 地球坐标系(WGS-84)转火星坐标系(GCJ)： 原始坐标转为高德地图坐标
 * @param {number}    lng - 地理坐标 lng 经度
 * @param {number}    lat - 地理坐标 lat 纬度
 * @returns {[number, number]}   [lng, lat] - 转换后的坐标
 */
export const wgs84togcj02 = (lng: number, lat: number): [number, number] => {
  if (outOfChina(lng, lat)) {
    return [lng, lat];
  } else {
    let dlat = transformlat(lng - 105.0, lat - 35.0);
    let dlng = transformlng(lng - 105.0, lat - 35.0);
    const radlat = (lat / 180.0) * PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
    const mglat = lat + dlat;
    const mglng = lng + dlng;
    return [mglng, mglat];
  }
};

/**
 * @description 火星坐标系(GCJ)转百度坐标系(gcj02)： 高德地图坐标转百度坐标
 * @param {number}    lng - 地理坐标 lng 经度
 * @param {number}    lat - 地理坐标 lat 纬度
 * @returns {[number, number]}   [lng, lat] - 转换后的坐标
 */
export const gcj02tobd09 = (lng: number, lat: number): [number, number] => {
  const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * X_PI);
  const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * X_PI);
  const BdLng = z * Math.cos(theta) + 0.0065;
  const BdLat = z * Math.sin(theta) + 0.006;
  return [BdLng, BdLat];
};

/**
 * @description 地球坐标系(WGS-84)转百度坐标系(bd09)： 原始坐标转为百度地图坐标
 * @param {number}    lng - 地理坐标 lng 经度
 * @param {number}    lat - 地理坐标 lat 纬度
 * @step 1. wgs84togcj02 原始转火星（高德）
 * @step 2. gcj02tobd09 火星（高德）转百度
 * @returns {[number, number]}   [lng, lat] - 转换后的坐标
 */
export const wgs84tobd09 = (lng: number, lat: number): [number, number] => {
  const gcj02 = wgs84togcj02(lng, lat);
  const result = gcj02tobd09(gcj02[0], gcj02[1]);
  return result;
};
