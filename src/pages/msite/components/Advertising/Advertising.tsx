// 首页广告位
import React, { FC } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Navigator } from '@tarojs/components'

import './Advertising.scss'

interface AdvertisingProps {
  title: string
  detail: string
  img: string
  url?: string
}

const Advertising: FC<AdvertisingProps> = (props) => {
  const { title, detail, img, url } = props

  const onClick = React.useCallback((e) => {
    if (url) return
    Taro.showToast({
      title: '暂未开放',
      icon: 'none',
    })
  }, [])

  return (
    <Navigator className="advertising" url={url} onClick={onClick}>
      <View className="advertising-left">
        <View className="title">{title}</View>
        <View className="detail">{detail}</View>
        <View className="href">立即抢购&gt;</View>
      </View>
      <View className="advertising-right">
        <Image src={img} className="image" />
      </View>
    </Navigator>
  )
}

export default Advertising
