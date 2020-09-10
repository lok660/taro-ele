import Taro, { request, getStorageSync } from "@tarojs/taro";

export default class Server {
  protected ajax({
    url,
    data,
    method = "GET",
    ...restParams
  }: Taro.RequestParams) {
    //  用户token
    const Authorization: string = getStorageSync("token") || "";
    //  判断请求类型
    let contentType: string;
    //  GET请求
    if (method == "GET") {
      contentType = "application/json";
    } else if (method === "POST") {
      contentType = "application/x-www-form-urlencoded";
    }

    return new Promise<Taro.request.SuccessCallbackResult>(
      (resolve, reject) => {
        request({
          url,
          data,
          method,
          header: {
            "content-type": contentType,
            Authorization,
          },
          ...restParams,
          //  成功回调
          success(res: Taro.request.SuccessCallbackResult): void {
            resolve(res);
          },
          //  失败回调
          fail(err: Taro.General.CallbackResult): void {
            reject(err);
          },
        });
      }
    );
  }
}
