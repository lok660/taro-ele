import Taro from "@tarojs/taro";
import {
  GETUSERADDRESSLIST,
  SETTOKEN,
  REMOVETOKEN,
  CURRENTADDRESS,
  USERADDRESS,
  SETUSERADDRESS,
  REMOVEUSERADDRESS,
  REMOVEUSERADDRESSLIST,
} from "../action-types";
import { Reducers } from "../interface";

interface Action<T, D = string> {
  type: T;
  payload: D;
}

//  用户token
type TOKENTYPE = typeof SETTOKEN | typeof REMOVETOKEN;
const initToken: string = Taro.getStorageSync("token") || "";

const token = (
  state = initToken,
  action: Action<TOKENTYPE, Reducers["token"]>
) => {
  const { type, payload } = action;
  switch (type) {
    case SETTOKEN:
      return payload;
    case REMOVETOKEN:
      return "";

    default:
      return state;
  }
};

export default {
  token,
};
