import { View, Text, StyleProp, StyleSheet, ViewStyle, TouchableOpacity, TextStyle, TextProps } from 'react-native'
import React from 'react'
import IconApp from './IconApp'
import { COLORS } from '../colors/colors'
import { isString } from 'formik'
import TextApp from './TextApp'
import { AppLang } from '../assets/languages'
const PADDING_HORIZONTAL = 15
const PADDING_LEFT = 10
const PADDING_RIGHT = 10
const SIZE_ICON = 26

type HeaderProps = {
    title: any
    left?: LeftComponentProps['left']
    style?: StyleProp<ViewStyle>
    styleTitle?: StyleProp<TextStyle>
    right?: RightComponentProps['right']
    propsTitle?: TextProps
}

const HeaderApp = (props:HeaderProps) => {
    const {title = 'Header', left, right, style, styleTitle,propsTitle} = props
    const renderTitle = () => {
        if(isString(title)) return title;
        return title
    }
    return (
    <View style={[styles.box, style]}>
        <LeftComponent left={left} />
        <Text numberOfLines={1} style={[styles.textTitle,styleTitle]} {...propsTitle}>
            {renderTitle()}
        </Text>
        <RightComponent right={right} />
    </View>
  )
}

type LeftComponentProps = {
    left?:{
        style?: any
        onPress?: any
        icon?: any
        size?: any
        show?: boolean
        styleIcon?: StyleProp<ViewStyle>
    }
}

type RightComponentProps = {
    right?:{
        style?: any
        onPress?: any
        icon?: any
        size?: any
        show?: boolean
        styleIcon?: StyleProp<ViewStyle>
        iconType?: string
        type?: boolean
        title?: string
    }
}

const RightComponent = ({right}:RightComponentProps) => {
    if(!right?.show) return null
    return (
        <TouchableOpacity
            style={[styles.boxHorizontal, styles.boxRight, right?.style]}
            onPress={right?.onPress}>
              {
                right?.type ? <Text style={{color:'white',fontSize:16}} >{right?.title ? right?.title: AppLang('luu')}</Text>
                : <IconApp
                name={right?.icon ? right.icon : 'chevron-forward-sharp'}
                size={right?.size ? right.size : SIZE_ICON}
                color={COLORS.white}
                style={right?.styleIcon}
                type={right?.iconType}
            />
              
              }
            </TouchableOpacity>
    )
}

const LeftComponent = ({ left }: LeftComponentProps) => {
    if (!left?.show) return null
    return (
      <TouchableOpacity
        style={[styles.boxHorizontal, styles.boxLeft, left?.style]}
        onPress={left?.onPress}>
        <IconApp
          name={left?.icon || 'arrow-back-outline'}
          size={left?.size || SIZE_ICON}
          color={COLORS.white}
          style={left?.styleIcon}
          
        />
      </TouchableOpacity>
    )
  }

const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingTop: 10,
      },
      boxHorizontal: {
        position: 'absolute',
        paddingTop: 10,
      },
      boxLeft: {
        left: PADDING_HORIZONTAL ? PADDING_HORIZONTAL : PADDING_LEFT,
      },
      boxRight: {
        right: PADDING_HORIZONTAL ? PADDING_HORIZONTAL : PADDING_RIGHT,
      },
      textTitle: {
        fontSize: 20,
        width: '70%',
        textAlign: 'center',
        color: COLORS.white,
        fontWeight:'500',
      },
})

export default HeaderApp