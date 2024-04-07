import { StyleProp, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedbackProps, View, ViewProps, ViewStyle } from 'react-native'
import React from 'react'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'

interface T_TouchApp extends ViewStyle, TouchableWithoutFeedbackProps {
  children?: React.ReactNode
  hidden?: boolean | undefined
  w?: number | string | undefined
  minW?: number | string | undefined
  maxW?: number | string | undefined
  w100?: boolean | undefined
  animated?: boolean | undefined
  onPress?: () => void
  disabled?: boolean | undefined
  //
  h?: number | string | undefined
  minH?: number | string | undefined
  maxH?: number | string | undefined
  h100?: boolean | undefined
  //
  square?: number | undefined
  mid?: boolean | undefined
  row?: boolean | undefined
  styleBox?: StyleProp<ViewStyle> | undefined
  centerH?: boolean | undefined
  flex?: number | undefined
  flex1?: boolean | undefined
  flex2?: boolean | undefined
  flex3?: boolean | undefined
  flex4?: boolean | undefined
  flex5?: boolean | undefined
  flex6?: boolean | undefined
  flex7?: boolean | undefined
  flex8?: boolean | undefined
  flex9?: boolean | undefined

  pad?: number | undefined
  padH?: number | undefined
  padV?: number | undefined
  //
  pad5?: boolean | undefined
  pad10?: boolean | undefined
  pad20?: boolean | undefined

  //
  //
  padH5?: boolean | undefined
  padH10?: boolean | undefined
  padH20?: boolean | undefined

  //
  //
  padV5?: boolean | undefined
  padV10?: boolean | undefined
  padV20?: boolean | undefined

  //
  padL?: number | undefined
  padT?: number | undefined
  padR?: number | undefined
  padB?: number | undefined
  //
  //
  padL10?: boolean | undefined
  padT10?: boolean | undefined
  padR10?: boolean | undefined
  padB10?: boolean | undefined
  //
  mar?: number | undefined
  marH?: number | undefined
  marV?: number | undefined
  //
  marV5?: boolean | undefined
  marV10?: boolean | undefined
  marV20?: boolean | undefined
  //
  marH5?: boolean | undefined
  marH10?: boolean | undefined
  marH20?: boolean | undefined
  //
  mar5?: boolean | undefined
  mar10?: boolean | undefined
  mar20?: boolean | undefined
  //
  marL10?: boolean | undefined
  marT10?: boolean | undefined
  marR10?: boolean | undefined
  marB10?: boolean | undefined
  //
  //
  marL?: number | undefined
  marT?: number | undefined
  marR?: number | undefined
  marB?: number | undefined
  //
  bg?: string
  bgR?: boolean | undefined
  bgW?: boolean | undefined
  //
  alignI?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  alignCenter?: boolean | undefined
  justifyCenter?: boolean | undefined
  justifySB?: boolean | undefined
  justifyC?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined
  overF?: 'visible' | 'hidden' | 'scroll' | undefined
  overH?: boolean | undefined
  borderR?: number | undefined
  borderC?: string | undefined
  borderW?: number | undefined
  borderR100?: boolean | undefined
  //
  borderLW?: number | undefined
  borderTW?: number | undefined
  borderRW?: number | undefined
  borderBW?: number | undefined
  //
  topRadius?: number | undefined
  bottomRadius?: number | undefined
  //
  positionA?: boolean | undefined
  positionTL?: boolean | undefined
  positionTR?: boolean | undefined
  positionB?: boolean | undefined
  positionFull?: boolean | undefined
  left0?: boolean | undefined
  top0?: boolean | undefined
  right0?: boolean | undefined
  bottom0?: boolean | undefined
}

const TouchApp: React.FC<T_TouchApp> = (props) => {
  const styleProps: Array<any> = [
    props.flex1 && { flex: 1 },
    props.flex2 && { flex: 2 },
    props.flex3 && { flex: 3 },
    props.flex4 && { flex: 4 },
    props.flex5 && { flex: 5 },
    props.flex6 && { flex: 6 },
    props.flex7 && { flex: 7 },
    props.flex8 && { flex: 8 },
    props.flex9 && { flex: 9 },
    props.mid && { alignItems: 'center', justifyContent: 'center' },
    props.row && { flexDirection: 'row' },
    //
    props.w && { width: props.w },
    props.minW && { minWidth: props.minW },
    props.maxW && { maxWidth: props.maxW },
    props.w100 && { width: '100%' },
    //
    props.h && { height: props.h },
    props.minH && { minHeight: props.minH },
    props.maxH && { maxHeight: props.maxH },
    props.h100 && { height: '100%' },
    //
    props.pad && { padding: props.pad },
    props.padH && { paddingHorizontal: props.padH },
    props.padV && { paddingVertical: props.padV },
    //
    props.pad5 && { padding: 5 },
    props.pad10 && { padding: 10 },
    props.pad20 && { padding: 20 },
    //
    props.padV5 && { paddingVertical: 5 },
    props.padV10 && { paddingVertical: 10 },
    props.padV20 && { paddingVertical: 20 },
    //
    //
    props.padH5 && { paddingHorizontal: 5 },
    props.padH10 && { paddingHorizontal: 10 },
    props.padH20 && { paddingHorizontal: 20 },
    //
    props.padL && { paddingLeft: props.padL },
    props.padT && { paddingTop: props.padT },
    props.padR && { paddingRight: props.padR },
    props.padB && { paddingBottom: props.padB },
    //
    props.padL10 && { paddingLeft: 10 },
    props.padT10 && { paddingTop: 10 },
    props.padR10 && { paddingRight: 10 },
    props.padB10 && { paddingBottom: 10 },
    //
    props.mar && { margin: props.mar },
    props.marH && { marginHorizontal: props.marH },
    props.marV && { marginVertical: props.marV },
    //
    props.mar5 && { margin: 5 },
    props.mar10 && { margin: 10 },
    props.mar20 && { margin: 20 },
    //
    props.marH5 && { marginHorizontal: 5 },
    props.marH10 && { marginHorizontal: 10 },
    props.marH20 && { marginHorizontal: 20 },
    //
    props.marV5 && { marginVertical: 5 },
    props.marV10 && { marginVertical: 10 },
    props.marV20 && { marginVertical: 20 },
    //
    props.marL && { marginLeft: props.marL },
    props.marT && { marginTop: props.marT },
    props.marR && { marginRight: props.marR },
    props.marB && { marginBottom: props.marB },
    //
    props.marL10 && { marginLeft: 10 },
    props.marT10 && { marginTop: 10 },
    props.marR10 && { marginRight: 10 },
    props.marB10 && { marginBottom: 10 },
    //
    props.square && { width: props.square, height: props.square },
    props.centerH && {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    //
    props.bg && { backgroundColor: props.bg },
    props.bgR && { backgroundColor: 'red' },
    props.bgW && { backgroundColor: '#fff' },
    //
    props.alignI && { alignItems: props.alignI },
    props.alignCenter && { alignItems: 'center' },
    //
    props.justifyC && { justifyContent: props.justifyC },
    props.justifyCenter && { justifyContent: 'center' },
    props.justifySB && { justifyContent: 'space-between' },
    //
    props.overF && { overflow: props.overF },
    props.overH && { overflow: 'hidden' },
    //
    props.borderR && { borderRadius: props.borderR },
    props.borderR100 && { borderRadius: 100 },
    props.borderC && { borderColor: props.borderC },
    props.borderW && { borderWidth: props.borderW },
    //
    props.borderLW && { borderLeftWidth: props.borderLW },
    props.borderTW && { borderTopWidth: props.borderTW },
    props.borderRW && { borderRightWidth: props.borderRW },
    props.borderBW && { borderBottomWidth: props.borderBW },

    //
    props.topRadius && {
      borderTopLeftRadius: props.topRadius,
      borderTopRightRadius: props.topRadius,
    },
    props.bottomRadius && {
      borderBottomLeftRadius: props.bottomRadius,
      borderBottomRightRadius: props.bottomRadius,
    },

    //
    props.positionA && { position: 'absolute' },
    props.positionFull && {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    props.positionTL && { position: 'absolute', top: 0, left: 0, },
    props.positionTR && { position: 'absolute', top: 0, right: 0 },
    props.positionB && {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    props.left0 && {
      left: 0,
    },
    props.top0 && {
      top: 0,
    },
    props.right0 && {
      right: 0,
    },
    props.bottom0 && {
      bottom: 0,
    },
  ]
  if (props?.hidden) return null
  return (
    <>
      {props.animated
        ? <TouchableOpacity>

          <Animated.View style={[defaultStyle.block, styleProps, props.styleBox]} {...props}
            entering={FadeInUp.delay(200)}
            exiting={FadeOutUp}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          >
            {props.children}
          </Animated.View>
        </TouchableOpacity>
        : <TouchableOpacity disabled={props.disabled} style={[{opacity:props.disabled ? 0.3 : 1},defaultStyle.block, styleProps, props.styleBox]} {...props}
          onPress={props.onPress}
        >
          {props.children}
        </TouchableOpacity>

      }
    </>
  )
}

const defaultStyle = StyleSheet.create({
  block: {
    borderColor: '#ddd',
  },
})

export default TouchApp

const styles = StyleSheet.create({})