import Taro from "@tarojs/taro";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Fragment,
} from "react";
import { View, ScrollView, Navigator } from "@tarojs/components";
import { useSelector } from "react-redux";
import API from "@/api/index";
import { Reducers } from "@/redux/interface";

// import FilterBar, { FilterParams } from '@/components/FilterBar/FilterBar'

import "./index.scss";

import { Ifilter, IShopList } from "@/api/interface";

const Msite = () => {
  const [navSwipeList, setNavSwipeList] = useState([]);
  const [filterData, setFilterData] = useState({} as Ifilter);
  const [shopList, setShopList] = useState<IShopList[]>([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrollY, setIsScrollY] = useState(true);
  // const [filterParams,setFilterParams] = useState({} as FilterPar)
  const [offset, setOffset] = useState(0);
  const [isMove, setIsMove] = useState(true);
  const isBottom = useRef(false);
  const limit = useRef(6);
  const shopLoading = useRef(false);

  const { currentAddress, token } = useSelector((state: Reducers) => state);

  //  导航
  const _getNavList = async () => {
    const params = {
      latitude: 41.138329,
      longitude: 123.052798,
    };
    const { err, res } = await API.reqNavList(params);
    if (err) {
      console.log(err);
      return;
    }
    if (res.code === 0) {
      setNavSwipeList(res.data);
    }
  };

  //  筛选
  const _getFilter = async () => {
    const { err, res } = await API.reqGetBatchFilter();
    if (err) {
      if (err.code === 401) {
        console.log(err.message);
      }
      return;
    }
    if (res.code === 0) {
      setFilterData(res.data);
    }
  };

  useEffect(() => {
    //  获取导航
    _getNavList();
    //  获取筛选选项
    _getFilter();
  }, []);

  //  获取商家列表
  useEffect(() => {
    if (isMove && currentAddress.latitude && currentAddress.longitude) {
      shopLoading.current = false;
      API.reqGetMsiteShopList({
        latitude: currentAddress.latitude,
        longitude: currentAddress.longitude,
        offset: offset,
        limit: limit.current,
      }).then(({ err, res }) => {
        if (err) {
          console.log(err);
          return;
        }
        if (res.code === 0) {
          shopLoading.current = true;
          if (res.data.length) {
            setShopList((data) => {
              return [...data, ...res.data];
            });
            isBottom.current = false;
          } else {
            setIsMove(false);
          }
        }
      });
    }
  }, [isMove, currentAddress]);

  //  筛选参数
  const handleFilterChange = useCallback((result) => {
    _init();
  }, []);

  //  初始化商家数据参数
  const _init = () => {
    setIsMove(true);
    setOffset(0);
    setShopList([]);
    isBottom.current = false;
  };

  //  到达底部
  const handleLower = () => {
    isBottom.current = true;
    if (shopLoading.current) {
      setOffset((num) => {
        return num + limit.current;
      });
    }
  };

  //  商家列表下拉底部加载数据loading
  const handleLoading = useCallback(() => {
    callback;
  }, [isMove]);
};
