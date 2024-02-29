import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import React, { useRef, useState } from 'react'
import { TextInputMaskProps } from 'react-native-masked-text';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { COLORS } from '../../colors/colors';
import ViewApp from '../ViewApp';
import TouchApp from '../TouchApp';
import TextApp from '../TextApp';
import { FMTime } from '../../utils/time';
import IconApp from '../IconApp';
interface Props extends TextInputMaskProps {
    required?: boolean
    propsInput?: any
    styleBox?: StyleProp<ViewStyle>
    placeholder?: string
    styleInput?: StyleProp<TextStyle>
    icon?: any
    iconType?:any
    styleBlockContain?: any,
    valueInit?: any,
    label?: any,
    styleLabel?: any,
    background?: any,
    mode?: any
}
const TEXT_COLOR = '#1E2E3D'
const TEXT_PLACE_HOLDER = '#A4A4A4'

const InputDate = React.forwardRef<any, Props>(({ label, valueInit, placeholder, styleBlockContain,
    required, mode = 'datetime', styleBox, styleLabel, background = COLORS.white, icon, iconType, propsInput, ...props }, ref) => {
    const [date, setDate] = useState<any>(valueInit)
    const [open, setOpen] = useState(false)

    React.useImperativeHandle(ref, () => ({
        getValue: (formatType?: string) => {
            if (formatType) return moment(date).format(formatType)
            return date;
        },
        setValue: (value: any) => {
            setDate(value)
        },
        clearValue: () => setDate(null)
    }))
    const styleText = [
        { color: TEXT_PLACE_HOLDER },
        { ...date && { color: TEXT_COLOR } }
    ]

    return (
        <ViewApp marB10 styleBox={styleBox} >
            {
                label ? <ViewApp justifyCenter flex1 marB={5}>
                    <TextApp bold style={styleLabel}>
                        {label} {required ? <TextApp color='#EE8022'> *</TextApp> : ''}
                    </TextApp>
                </ViewApp> : null
            }
            <TouchApp
                onPress={() => {
                    setOpen(true)
                }}
                bg={background}
                flex1
                pad10
                minH={50}
                borderR={5}
                borderW={1}
                borderC='#000'
                styleBox={[
                    icon && {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }, styleBlockContain]}
                {...propsInput}
            >
                <ViewApp width={'95%'}>
                    <TextApp style={styleText} >{date ? FMTime.day(date) : placeholder}</TextApp>
                </ViewApp>
                {icon && (
                    <IconApp
                        name={icon.name}
                        type={iconType}
                        color={icon?.color || COLORS.text1}
                        size={icon?.size || 24}
                    />
                )}
            </TouchApp>
            <DatePicker
                modal
                open={open}
                date={new Date()}
                onConfirm={date => {
                    setDate(date)
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                minimumDate={
                    new Date()
                }
                mode={mode}
                title={'Thời gian'}
                cancelText={'Hủy'}
                confirmText={'Đồng ý'}
                locale={'vi'}
                theme='light'
                textColor='#000'
                {...props}
            />
        </ViewApp>
    )
})
export default InputDate
const styles = StyleSheet.create({
})