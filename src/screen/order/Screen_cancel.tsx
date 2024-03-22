import React, { useRef, useState } from 'react'
import { useListOrder } from '../../service/useLocalMater'
import Screen_default from './components/Screen_default'

const Screen_cancel = () => {

  const [isLoading, data, onRefresh] = useListOrder(4)
  
  return (
    <Screen_default isLoading={isLoading} data={data} onRefresh={onRefresh} />

  )
}

export default Screen_cancel