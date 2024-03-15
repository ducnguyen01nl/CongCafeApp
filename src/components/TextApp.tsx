import React, { Children, Ref } from 'react'
import { StyleProp, Text, TextStyle, StyleSheet, TextProps } from 'react-native'
import { COLORS } from '../colors/colors'

type T_TextApp = {
  children?: React.ReactNode
  style?: StyleProp<TextStyle>

  colorP?: boolean | undefined
  colorS?: boolean | undefined
  color1?: boolean | undefined
  color2?: boolean | undefined
  color3?: boolean | undefined
  color4?: boolean | undefined
  colorW?: boolean | undefined
  color?: string | undefined

  size12?: boolean | undefined
  size14?: boolean | undefined
  size16?: boolean | undefined
  size18?: boolean | undefined
  size22?: boolean | undefined
  size30?: boolean | undefined
  size38?: boolean | undefined
  size?: boolean | undefined

  bold?: boolean | undefined

  mT?: boolean | undefined
  mB?: boolean | undefined
  mR?: boolean | undefined
  mL?: boolean | undefined

  mV5?: boolean | undefined
  mV10?: boolean | undefined
  mV15?: boolean | undefined
  mV20?: boolean | undefined
  mV?: boolean | undefined

  mH5?: boolean | undefined
  mH10?: boolean | undefined
  mH15?: boolean | undefined
  mH20?: boolean | undefined
  mH?: boolean | undefined

  mar5?: boolean | undefined
  mar10?: boolean | undefined
  mar15?: boolean | undefined
  mar20?: boolean | undefined
  mar?: boolean | undefined

  pT?: boolean | undefined
  pB?: boolean | undefined
  pR?: boolean | undefined
  pL?: boolean | undefined

  pV5?: boolean | undefined
  pV10?: boolean | undefined
  pV15?: boolean | undefined
  pV20?: boolean | undefined
  pV?: boolean | undefined

  pH5?: boolean | undefined
  pH10?: boolean | undefined
  pH15?: boolean | undefined
  pH20?: boolean | undefined
  pH?: boolean | undefined

  pad5?: boolean | undefined
  pad10?: boolean | undefined
  pad15?: boolean | undefined
  pad20?: boolean | undefined
  pad?: boolean | undefined

  numberOfLines?: number | undefined
  ellipsizeMode?: any
}

const TextApp: React.FC<T_TextApp> = (props) => {

  const styleProps: Array<any> = [
    props.colorP && { color: COLORS.primary },
    props.colorS && { color: COLORS.Secondary },
    props.color1 && { color: COLORS.text1 },
    props.color2 && { color: COLORS.text2 },
    props.color3 && { color: COLORS.text3 },
    props.color4 && { color: COLORS.text4 },
    props.colorW && { color: COLORS.white },
    props.color && { color: props.color },
    //
    props.size12 && { fontSize: 12 },
    props.size14 && { fontSize: 14 },
    props.size16 && { fontSize: 16 },
    props.size18 && { fontSize: 18 },
    props.size38 && { fontSize: 38 },
    props.size30 && { fontSize: 30 },
    props.size22 && { fontSize: 22 },
    props.size && { fontSize: props.size },

    props.bold && { fontWeight: 'bold' },

    //padding
    props.pad5 && { padding: 5 },
    props.pad10 && { padding: 10 },
    props.pad15 && { padding: 15 },
    props.pad20 && { padding: 20 },
    props.pad && { padding: props.pad },

    props.pH5 && { paddingHorizontal: 5 },
    props.pH10 && { paddingHorizontal: 10 },
    props.pH15 && { paddingHorizontal: 15 },
    props.pH20 && { paddingHorizontal: 20 },
    props.pH && { paddingHorizontal: props.pH },

    props.pV5 && { paddingVertical: 5 },
    props.pV10 && { paddingVertical: 10 },
    props.pV15 && { paddingVertical: 15 },
    props.pV20 && { paddingVertical: 20 },
    props.pV && { paddingVertical: props.pV },

    props.pT && { paddingTop: props.pT },
    props.pB && { paddingTop: props.pB },
    props.pR && { paddingTop: props.pR },
    props.pL && { paddingTop: props.pL },
    //margin
    props.mar5 && { margin: 5 },
    props.mar10 && { margin: 10 },
    props.mar15 && { margin: 15 },
    props.mar20 && { margin: 20 },
    props.mar && { margin: props.mar },

    props.mH5 && { marginHorizontal: 5 },
    props.mH10 && { marginHorizontal: 10 },
    props.mH15 && { marginHorizontal: 15 },
    props.mH20 && { marginHorizontal: 20 },
    props.mH && { marginHorizontal: props.mH },

    props.mV5 && { marginVertical: 5 },
    props.mV10 && { marginVertical: 10 },
    props.mV15 && { marginVertical: 15 },
    props.mV20 && { marginVertical: 20 },
    props.mV && { marginVertical: props.mV },

    props.mT && { paddingTop: props.mT },
    props.mB && { paddingTop: props.mB },
    props.mR && { paddingTop: props.mR },
    props.mL && { paddingTop: props.mL },
  ]

  return (
    <Text
      style={[styleProps, props.style, styles.styleText]}
      numberOfLines={props.numberOfLines}
      ellipsizeMode={props.ellipsizeMode}
    >
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  styleText: {
    marginHorizontal: 5,
    // color:COLORS.text1
  }
})

export default TextApp
