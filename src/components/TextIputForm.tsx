import React, { useRef, useState } from 'react'
import { Alert, StyleProp, TextInput, TextInputProps, TextStyle, TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../colors/colors'
export type Handle = {
    getValue:() => void
    check?:() => void
    focus?:() => void
    clear?:() => void
}

interface Props extends TextInputProps {
    placeholder?: string
    valuleInit?: string
    look?: boolean
    styleView?: StyleProp<ViewStyle>
    styleInput?: StyleProp<TextStyle>

}

const TextInputForm = React.forwardRef<Handle,Props>((props, ref) => {
    const [value,setValue] = useState(props.valuleInit)
    const [look,setLook] = useState(props.look ? true : false)
    const refCore: any = useRef();
    React.useImperativeHandle(ref, () =>({
        check(){
            // Alert(value)
        },
        getValue() {
            return value
        },
        focus() {
            refCore.current.focus()
        },
        clear() {
            setValue('')
        },
        setValue(value: any) {
            setValue(value)
        },

    }))

    return(
        <View style={[props.styleView,styles.view]} >
            <TextInput 
                ref={refCore}
                value={value}
                onChangeText={setValue}
                placeholder={props.placeholder}
                placeholderTextColor={COLORS.text3}
                style={[props?.styleInput,styles.input]}
                secureTextEntry={look}
                {...props}
            />
            {
                props.look && (
                    <TouchableOpacity
                        onPress={() => setLook(!look)}
                        style={styles.hind}
                    >
                        <Ionicons name={look ? 'eye-off-outline' : 'eye-outline'}
                            size={22}
                            color={COLORS.primary}
                            style={{paddingHorizontal:5}}
                        />
                    </TouchableOpacity>
                )
            }
            
        </View>
    )

})

const styles = StyleSheet.create({
    view:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        marginVertical:10,
        alignItems:'center',
        backgroundColor:COLORS.white,
        borderRadius:20,
        borderWidth:1,
        
        //
        shadowColor:COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        
        elevation: 24,
    },
    input:{
        color:COLORS.text2,
        fontWeight:'bold',
        flex:1
    },
    hind:{

    }
})

export default TextInputForm
