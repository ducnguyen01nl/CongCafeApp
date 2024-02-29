import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
  LegacyRef,
  useEffect,
} from 'react'
import {
  TextStyle,
  ViewStyle,
  TextProps,
  ColorValue,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  Alert,
} from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { useRef } from 'react'
import IconApp from '../IconApp'
export type Handle = {
  getValue: () => void
  check?: () => void
  focus?: () => void
  clear?: () => void
}

interface Props extends TextInputProps {
  placeholder?: string
  valueInit?: any
  look?: boolean
  styleBoxInput?: StyleProp<ViewStyle>
  styleInput?: StyleProp<TextStyle>
  background?: string;
}

const InputCore = React.forwardRef<Handle, Props>((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    check() {
      Alert.alert(value)
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
  const [value, setValue] = useState(props.valueInit)
  const [look, setLook] = useState(props.look ? true : false)
  const refCore: any = useRef()
  const [textareaHeight, setTextareaHeight] = useState<any>()
  useEffect(() => {
    setValue(props?.valueInit)
  }, [props.valueInit])

  return (
    <View style={[styles.box, props.styleBoxInput, { backgroundColor: props.background }]}>
      <TextInput
        ref={refCore}
        value={value}
        onChangeText={setValue}
        placeholder={props.placeholder}
        style={[{ height: props.multiline ? textareaHeight : 50, width: props.look ? '90%' : '100%', marginHorizontal:10 },
          , props?.styleInput]}
        // textAlignVertical='top'
        secureTextEntry={look}
        autoCapitalize={'none'}
        placeholderTextColor={'#bbb'}
        onContentSizeChange={({ nativeEvent: event }) =>
          setTextareaHeight(event.contentSize.height + 50)
        }
        {...props}
      />
      {props.look && (
        <TouchableOpacity
          onPress={() => setLook(prev => !prev)}
          style={styles.hind}>
          <IconApp
            name={look ? 'eye-off-outline' : 'eye-outline'}
            color='#696969'
            size={22}
          />
        </TouchableOpacity>
      )}
    </View>
  )
})
export default InputCore
InputCore.defaultProps = {
  placeholder: 'placeholder',
  look: false,
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    fontSize: 15,
    fontWeight: '500',
    width: '90%',
  },
  box: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius:5
  },
  hind: {
    position: 'absolute',
    right: 20,
  },
})
// export const TextBox = (props: any) => {
//   return (
//     <View style={[styles.box, props.styleBox]}>
//       <Text style={styles.input}>{props?.value}</Text>
//     </View>
//   )
// }
