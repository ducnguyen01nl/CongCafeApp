import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ViewApp from './ViewApp'
import TouchApp from './TouchApp'
import { COLORS } from '../colors/colors'
import IconApp from './IconApp'
import TextApp from './TextApp'

const ChangeCountItem = ({count,setCount}: any) => {
    // const [countItem, setCountItem] = useState(count)
    return (
        <ViewApp row marR10 alignCenter justifyContent='space-between' w={'40%'}>
            <TouchApp square={24} mid borderR100 bg={ count <= 1 ? COLORS.trans : COLORS.primary}
                disabled={count <= 1 ? true : false}
                styleBox={{ opacity: count <= 1 ? 0.5 : 1 }}
                onPress={() => setCount(count - 1)}
            >
                <IconApp size={14} color={COLORS.white} name='minus' type='FontAwesome' />
            </TouchApp>
            <ViewApp h={30} marH10 mid borderR={5} bg={COLORS.Secondary}>
                <TextApp size18 bold>{count}</TextApp>
            </ViewApp>
            <TouchApp square={24} mid borderR100 bg={COLORS.primary}
                onPress={() => setCount(count + 1)}
            >
                <IconApp size={14} color={COLORS.white} name='plus' type='FontAwesome' />
            </TouchApp>
        </ViewApp>
    )
}

export default ChangeCountItem