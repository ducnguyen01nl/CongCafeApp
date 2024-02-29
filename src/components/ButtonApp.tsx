import React, { RefObject } from 'react'
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps, StyleProp, TextStyle, ViewStyle } from 'react-native'
import TextApp from './TextApp'
import { COLORS } from '../colors/colors'

interface T_Button extends TouchableOpacityProps {
    title?: string
    onPress?: () => void
    styleText?: StyleProp<TextStyle>
    styleButton?: StyleProp<ViewStyle>
    propsText?: any
    disabled?: boolean | undefined
    refBtn?: RefObject<any>

    with10?: boolean | undefined
    with9?: boolean | undefined
    with8?: boolean | undefined
    with6?: boolean | undefined
    with5?: boolean | undefined
    with4?: boolean | undefined
    with2?: boolean | undefined
    wit?: boolean | undefined

    hei30?: boolean | undefined
    hei40?: boolean | undefined
    hei50?: boolean | undefined
    hei?: boolean | undefined

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

    bR?: number | undefined

}

const ButtonApp: React.FC<T_Button> = (props) => {

    const StyleProps: Array<any> = [
    //width
        props.with10 && {width:'100%'},
        props.with8 && {width:'80%'},
        props.with6 && {width:'60%'},
        props.with4 && {width:'40%'},
        props.with2 && {width:'20%'},
        props.with9 && {width:'90%'},
        props.with5 && {width:'50%'},
        props.wit && {width:props.wit},
    //padding
        props.pad5 && {padding:5},
        props.pad10 && {padding:10},
        props.pad15 && {padding:15},
        props.pad20 && {padding:20},
        props.pad && {padding:props.pad},

        props.pH5 && {paddingHorizontal:5},
        props.pH10 && {paddingHorizontal:10},
        props.pH15 && {paddingHorizontal:15},
        props.pH20 && {paddingHorizontal:20},
        props.pH && {paddingHorizontal:props.pH},
        
        props.pV5 && {paddingVertical:5},
        props.pV10 && {paddingVertical:10},
        props.pV15 && {paddingVertical:15},
        props.pV20 && {paddingVertical:20},
        props.pV && {paddingVertical:props.pV},

        props.pT && {paddingTop:props.pT},
        props.pB && {paddingTop:props.pB},
        props.pR && {paddingTop:props.pR},
        props.pL && {paddingTop:props.pL},
    //margin
        props.mar5 && {margin:5},
        props.mar10 && {margin:10},
        props.mar15 && {margin:15},
        props.mar20 && {margin:20},
        props.mar && {margin:props.mar},

        props.mH5 && {marginHorizontal:5},
        props.mH10 && {marginHorizontal:10},
        props.mH15 && {marginHorizontal:15},
        props.mH20 && {marginHorizontal:20},
        props.mH && {marginHorizontal:props.mH},
        
        props.mV5 && {marginVertical:5},
        props.mV10 && {marginVertical:10},
        props.mV15 && {marginVertical:15},
        props.mV20 && {marginVertical:20},
        props.mV && {marginVertical:props.mV},

        props.mT && {paddingTop:props.mT},
        props.mB && {paddingTop:props.mB},
        props.mR && {paddingTop:props.mR},
        props.mL && {paddingTop:props.mL},
    //border Radius
        props.bR && { borderRadius: props.bR},
    //height
        props.hei30 && {height:30},
        props.hei40 && {height:40},
        props.hei50 && {height:50},
        props.hei && {height:props.hei},

    ]


  return (
    <TouchableOpacity
        onPress={props.onPress}
        style={[styles.button,props.styleButton,StyleProps, props.disabled && styles.styleButtonDisabled]}
        disabled={props.disabled}
        ref={props.refBtn}
    >
        <TextApp
            size18
            style={[props.styleText,styles.text]}

        >{props.title}</TextApp>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:COLORS.primary,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:10,
        
    },
    styleButtonDisabled:{
        opacity:0.5
    },
    text:{
        color:COLORS.white,
        fontWeight:'bold'
    }
})

export default ButtonApp
