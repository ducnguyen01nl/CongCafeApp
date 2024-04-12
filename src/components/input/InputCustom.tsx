import React, {
} from 'react'
import {
    TextStyle,
    ViewStyle,
    StyleProp,
    TextInput,
} from 'react-native'
import {
    TextInputMaskProps,
} from 'react-native-masked-text'
import { useRef } from 'react'
import InputBasic from './InputBasic'
import ViewApp from '../ViewApp'
import TextApp from '../TextApp'
import TouchApp from '../TouchApp'
import IconApp from '../IconApp'
import { COLORS } from '../../colors/colors'
export type Handle = {
    getValue: () => void
    check?: () => void
    focus?: () => void
    clear?: () => void
}

interface Props extends TextInputMaskProps {
    isText?: boolean
    isUpdate?: boolean
    isModal?: boolean
    required?: boolean
    propsInput?: any
    onPressRight?: any
    rightComponent?: any
    label?: any
    styleBox?: StyleProp<ViewStyle>
    placeholder?: string
    look?: boolean
    styleInput?: StyleProp<TextStyle>
    background?: any
    icon?: any
    styleBlockContain?: any
}
const TEXT_COLOR = '#1E2E3D'
const TEXT_PLACE_HOLDER = '#A4A4A4'
const InputCustom = React.forwardRef<Handle, Props>(({ isText, isUpdate, isModal, label, styleLabel, value, onPressRight, styleBox, icon, rightComponent, background = 'white', styleBlockContain, required, placeholder = '', propsInput,styleInput, ...props }: any, ref) => {
    const _InputCustom = useRef<any>()
    React.useImperativeHandle(ref, () => ({
        getValue: () => {
            return _InputCustom.current.getValue()
        },
        clear() {
            return _InputCustom.current.clear()
        },
    }))
    return (
        <ViewApp marB10 styleBox={styleBox}>
            {
                label ? <ViewApp justifyCenter flex1 marB={5}>
                    <TextApp color1 bold style={styleLabel}>
                        {label} {required ? <TextApp color='#EE8022'> *</TextApp> : ''}
                    </TextApp>
                </ViewApp> : null
            }

            {isText && (
                <ViewApp bg={background} flex1 pad10 borderR={5} minH={50} justifyContent='center' borderC='#ccc' borderW={1} styleBox={styleBlockContain}>
                    <TextApp color={value ? TEXT_COLOR : TEXT_PLACE_HOLDER} >{value ?? placeholder}</TextApp>
                </ViewApp>
            )}
            {isUpdate && (
                <InputBasic
                    ref={_InputCustom}
                    placeholder=''
                    styleBoxInput={styleInput}
                    background={background}
                    {...propsInput}
                    {...props}
                />
            )}
            {isModal && (
                <TouchApp
                    onPress={onPressRight}
                    bg={background}
                    flex1
                    pad10
                    minH={50}
                    borderR={5}
                    borderW={1}
                    borderC='#ccc'
                    styleBox={[
                        icon && {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }, styleBlockContain]}
                    {...propsInput}
                >
                    <ViewApp width={'95%'}>
                        <TextApp color={value ? TEXT_COLOR : TEXT_PLACE_HOLDER} >{value ?? placeholder}</TextApp>
                    </ViewApp>
                    {icon && (
                        <IconApp
                            name={icon.name}
                            color={icon?.color || COLORS.text1}
                            size={icon?.size || 16}
                        />
                    )}
                </TouchApp>
            )}
            {rightComponent}
        </ViewApp>
    )
})
export default InputCustom
InputCustom.defaultProps = {
    placeholder: 'placeholder',
    look: false,
}