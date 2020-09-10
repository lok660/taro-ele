import Taro from "@tarojs/taro";
import API from "@/@/api";

import {
  SETTOKEN,
  CURRENTADDRESS,
  SETUSERADDRESS,
  REMOVETOKEN,
  GETUSERADDRESSLIST,
  USERADDRESS,
  REMOVEUSERADDRESS,
  REMOVEUSERADDRESSLIST,
} from "../action-types";

//  设置token
export const setToken = (token: string) => {
  token = `Bearer${token}`;
  Taro.setStorageSync("toekn", token);
  return {
    type: SETTOKEN,
    payload: token,
  };
};

//  删除token
export const removeToekn = () => {
  Taro.removeStorageSync("token");
  return {
    type: REMOVETOKEN,
  };
};

//  设置地址信息
export const setCurrentAddress = (address) => ({
  type: CURRENTADDRESS,
  payload: address,
});

//  初始化ip定位地址
export const initCurrentAddress = () => {
  return async (dispatch) => {
    const { err, res } = await API;
  };
};
