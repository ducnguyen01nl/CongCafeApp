import React from 'react'
import SafeAreaView, {ForceInsetProp} from 'react-native-safe-area-view'
import { goBack } from '../root/RootNavigation'
import {Platform, StatusBar, StyleProp, ViewStyle} from 'react-native'
import { COLORS } from '../colors/colors'
type _layout = {
  children?: any
  forceInset?: ForceInsetProp
  forceInsetBot?: ForceInsetProp
  styleBot?: StyleProp<ViewStyle> | undefined
  style?: StyleProp<ViewStyle> | undefined
  isBack?: boolean
}
export default function LayoutApp ({
  children,
  forceInset = {top: 'always', horizontal: 'never', bottom: 'never'},
  forceInsetBot = {vertical: 'never'},
  styleBot,
  style,
}: _layout) {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: COLORS.white,
        },
        style,
      ]}
      forceInset={forceInset}>
      <SafeAreaView
        style={[
          {
            flex: 1,
            backgroundColor: COLORS.white,
          },
          styleBot,
        ]}
        forceInset={forceInsetBot}>
        {children}
      </SafeAreaView>
    </SafeAreaView>
  )
}
