

import React from 'react'
import ViewApp from './ViewApp'
import TextApp from './TextApp'

const Count = ({ right, left, top, bottom, count, size }: any) => {
    return (
        <ViewApp
            positionA
            top={top}
            right={right}
            left={left}
            bottom={bottom}
            backgroundColor={'#B22830'}
            borderR100
        >
            <TextApp colorW size={size ? size : 14}>{count}</TextApp>
        </ViewApp>
    )
}

export default Count