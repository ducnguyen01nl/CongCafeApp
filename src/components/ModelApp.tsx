import React, { forwardRef, useImperativeHandle, useState } from "react"
import { Modal, ModalBaseProps, StyleProp, TextStyle, TouchableOpacity, ViewStyle, StyleSheet, View } from "react-native"

type Handle = {
    close: () => void
    open?: () => void
}
interface Props extends ModalBaseProps {
    animate?: boolean
    valueInit?: string
    styles?: StyleProp<TextStyle>
    styleProps?: StyleProp<ViewStyle>
    mid?: boolean
    outClose?: boolean
    initState?: string
    background?: string
    children?: React.ReactNode,
    bot?:boolean,
}

const ModalApp = forwardRef<Handle,Props>(
    ({
        animated,
        animationType,
        transparent = true,
        visible,
        onRequestClose,
        onShow,
        children,
        mid,
        outClose = true,
        bot,
        background = '#00000062',
        initState = false,
        ...rest
    },
    ref,
    ) => {
        const [show,setShow] = useState(initState)
        useImperativeHandle(ref,() =>({
            close() {
                setShow(false)
            },
            open(){
                setShow(true)
            },
        }))
        const styleProps: any = [
            mid && {alignItems: 'center', justifyContent: 'center'},
            { backgroundColor: background },
            bot && {alignItems: 'center', justifyContent: 'flex-end'}
          ]
        return(
            <Modal
                visible={show}
                transparent={transparent}
                animated={animated}
                animationType={animationType}
                onRequestClose={onRequestClose}
                onShow={onShow}
                {...rest}>
                <View style={[stylesModal.fullScreen, styleProps]}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => (outClose ? setShow(false) : {})}
                    style={stylesModal.fullScreen}
                />
                {children}
                </View>
            </Modal>
        )
    }
)
ModalApp.defaultProps =  {
    animated:true,
    animationType:'fade',
    transparent:true,
    visible:false,
    onRequestClose: () =>{},
    onShow: () => {}
}

const stylesModal = StyleSheet.create({
    fullScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  })
  

export default ModalApp