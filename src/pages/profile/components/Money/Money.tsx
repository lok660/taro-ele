import React, { FC } from 'react'
import { View, Image } from '@tarojs/components'

import './Money.scss'

type MoneyList = {
  id: number
  img: string
  title: string
}

interface MoneyProps {
  moneyList: MoneyList[]
  onClick: () => void
}

const Money: FC<MoneyProps> = (props) => {
  const { moneyList, onClick } = props
  return (
    <View className="money">
      {moneyList.map((item) => {
        return (
          <View className="money-red" onClick={onClick} key={item.id}>
            <View className="money-imgs">
              <Image src={item.img} className="money-image" />
            </View>
            <View className="money-txt">{item.title}</View>
          </View>
        )
      })}
    </View>
  )
}

export default Money
