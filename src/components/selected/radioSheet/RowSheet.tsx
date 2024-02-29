import {StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native'
import React from 'react'
import TouchApp from '../../TouchApp'
import ViewApp from '../../ViewApp'
import TextApp from '../../TextApp'
import IconApp from '../../IconApp'
import { COLORS } from '../../../colors/colors'
type T_RowSheet = {
  styleBox?: StyleProp<ViewStyle>
  styleTxt?: StyleProp<TextStyle>
  content?: any
  icon?: any
  onPress?: () => void
}
export default function RowSheet ({
  styleBox,
  styleTxt,
  content,
  onPress,
  status,
}: any) {
  return (
    <TouchApp
      // activeOpacity={0.8}
      row
      onPress={onPress}
      h={45}
      styleBox={[styles.defaultBox, styleBox]}>
      <ViewApp minW={50} />
      <TextApp size18 style={[{color: '#2787f9', fontWeight: '500'}, styleTxt]}>
        {/* {capitalizeFirst(content)} */}
        {content}
      </TextApp>
      <ViewApp minW={50}>
        {status && (
          <IconApp
            name={'checkmark-circle'}
            size={20}
            style={{marginLeft: 10}}
            color={COLORS.primary}
          />
        )}
      </ViewApp>
    </TouchApp>
  )
}

const styles = StyleSheet.create({
  defaultBox: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    borderWidth: 0.5,
  },
})
