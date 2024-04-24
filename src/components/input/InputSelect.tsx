import { ScrollView, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import React, { useRef, useState } from 'react'
import { isArray, isObject } from 'underscore';
import { TextInputMaskProps } from 'react-native-masked-text';
import RBSheet from 'react-native-raw-bottom-sheet';
import TouchApp from '../TouchApp';
import ViewApp from '../ViewApp';
import TextApp from '../TextApp';
import IconApp from '../IconApp';
import { COLORS } from '../../colors/colors';
import LayoutApp from '../LayoutApp';
import { arrayData } from '../../utils/format';
import RowSheet from '../selected/radioSheet/RowSheet';
interface Props extends TextInputMaskProps {
    required?: boolean
    propsInput?: any
    rightComponent?: any
    styleBox?: StyleProp<ViewStyle>
    placeholder?: string
    look?: boolean
    styleInput?: StyleProp<TextStyle>
    icon?: any
    styleBlockContain?: any,
    valueInit?: any,
    keyString?: any,
    label?: any,
    data?: any[],
    styleLabel?: any,
    background?: any,
    option?: { title: string }
    multiSelect?: boolean
    disabled?: boolean
    onSelectItem?:(item:any) => void
}
const TEXT_COLOR = '#1E2E3D'
const TEXT_PLACE_HOLDER = '#A4A4A4'

const InputSelect = React.forwardRef<any, Props>(({ label, valueInit, placeholder, styleBlockContain,
    required, multiSelect = false, data, keyString = 'name', styleBox, styleLabel, background, icon, rightComponent, propsInput, option, ...props }, ref) => {
    const ref_RBSheet = useRef<any>(null)
    const [value, setValue] = useState<any>(multiSelect ? [] : null)

    React.useImperativeHandle(ref, () => ({
        getValue: (keyString?: string) => {
            if (keyString && isObject(value)) return value[keyString]
            return value
        },
        setValue: (item: any) => {
            if (multiSelect)
                setValue([{ ...item, name: item[keyString] }])
            else
                setValue({ ...item, name: item[keyString] })
        },
        clearValue: () => setValue(multiSelect ? [] : null)
    }))
    const styleText = [
        { color: TEXT_PLACE_HOLDER },
        { ...(value?.name || value?.length > 0) && { color: TEXT_COLOR } }
    ]
    return (
        <ViewApp marB10 styleBox={styleBox} >
            {
                label ? <ViewApp justifyCenter flex1 marB={5}>
                    <TextApp color1 bold style={styleLabel}>
                        {label} {required ? <TextApp color='#EE8022'> *</TextApp> : ''}
                    </TextApp>
                </ViewApp> : null
            }
            <TouchApp
                onPress={() => {
                    ref_RBSheet?.current?.open()
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
                disabled={props.disabled}
            
            >
                <ViewApp width={'95%'}>
                    <TextApp style={styleText} >{multiSelect ? nameToStringInputSelect(value, placeholder) : value ? value?.name : placeholder}</TextApp>
                </ViewApp>
                {icon && (
                    <IconApp
                        name={icon.name}
                        color={icon?.color || COLORS.text1}
                        size={icon?.size || 16}
                    />
                )}
            </TouchApp>
            {rightComponent}
            <RBSheet
                ref={ref_RBSheet}
                closeOnDragDown
                closeOnPressMask
                height={400}
                customStyles={{
                    wrapper: {
                        backgroundColor: '#0F101393',
                    },
                    draggableIcon: {
                        backgroundColor: 'transparent',
                    },
                    container: {
                        borderRadius: 10,
                        backgroundColor: 'transparent',
                    },
                }}
                openDuration={300}
                {...RBSheetProps}>
                <LayoutApp
                    forceInset={{ vertical: 'never' }}
                    forceInsetBot={{ vertical: 'never', bottom: 'always' }}
                    styleBot={{ backgroundColor: 'transparent' }}
                    style={{ backgroundColor: 'transparent' }}>
                    <TouchApp
                        flex1
                        pad10
                        justifyC='flex-end'
                        // activeOpacity={1}
                        onPress={() => ref_RBSheet.current.close()}>
                        <ViewApp maxHeight={280} borderR={20} overH bgW>
                            <ScrollView>
                                {arrayData(data).map((item:any, index:number) => (
                                    <RowSheet
                                        key={index}
                                        onPress={() => {
                                            if (multiSelect) {
                                                let find = value?.find((i: any) => i?.value === item?.value)
                                                if (find) return setValue((pre: any) => pre.filter((i: any) => i?.value !== item?.value))
                                                setValue((pre: any) => [...pre, { ...item, name: item[keyString] }])
                                            }
                                            else {
                                                setValue({ ...item, name: item[keyString] });
                                                ref_RBSheet.current.close();
                                                if(props.onSelectItem){
                                                    props.onSelectItem(item)
                                                }
                                            }
                                        }}
                                        content={item?.name}
                                        icon={item?.icon}
                                        status={multiSelect ? value?.find((i: any) => i?.value == item?.value) : value?.value === item?.value}
                                    />
                                ))}
                            </ScrollView>
                        </ViewApp>
                        <ViewApp
                            styleBox={{
                                marginTop: 10,
                                borderRadius: 15,
                                overflow: 'hidden',
                                backgroundColor: '#fff',
                            }}>
                            <RowSheet
                                content={option?.title ? option?.title : 'Hủy'}
                                onPress={() => ref_RBSheet.current.close()}
                                styleBox={{
                                    backgroundColor: 'white',
                                }}
                            />
                        </ViewApp>
                    </TouchApp>
                </LayoutApp>
            </RBSheet>
        </ViewApp>
    )
})
export default InputSelect
const styles = StyleSheet.create({
})
const RBSheetProps: any = {}
const nameToStringInputSelect = (data: any[], placeholder?: string) => {
    if (data?.length === 0) return placeholder;
    let res: string = ''
    if (isArray(data)) {
        data.forEach((item, index) => {
            if (isObject(item))
                res += `${index === 0 ? '' : ','} ${item?.name}`
        })
    }
    return res
}