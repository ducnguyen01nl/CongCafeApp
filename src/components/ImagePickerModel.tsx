import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState, } from "react"
import { Modal, ModalBaseProps, StyleProp, TextStyle, Image, TouchableOpacity, ViewStyle, StyleSheet, View } from "react-native"
import ViewApp from "./ViewApp"
import { imgApp } from "../assets/img"
import TextApp from "./TextApp"
// import * as ImagePicker from 'react-native-image-picker'
import {launchCamera, launchImageLibrary, CameraOptions, ImagePickerResponse} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import { requestCameraPermission } from "../service/requestCamera"

// import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";

type Handle = {
    close: () => void
    open?: () => void
    getValue: () => void
}
interface Props extends ModalBaseProps {
    animate?: boolean
    valueInit?: string
    styles?: StyleProp<TextStyle>
    styleProps?: StyleProp<ViewStyle>
    mid?: boolean
    outClose?: boolean
    initState?: string
    background?: string
    children?: React.ReactNode,
    bot?:boolean,
    // onImageLibraryPress: () => void,
    // onCameraPress: () => void,
}


type ImageSource = {
    uri: string;
    width: number;
    height: number;
  };

const ModalPickerImage = forwardRef<Handle,Props>(
    ({
        animated,
        animationType,
        transparent = true,
        visible,
        onRequestClose,
        onShow,
        children,
        mid,
        outClose = true,
        bot,
        background = '#00000062',
        initState = false,
        // onImageLibraryPress,
        // onCameraPress,
        ...rest
    },
    ref,
    ) => {
        const [show,setShow] = useState<any>(initState)
        // const refImage = useRef<any>()
        const [imageSource, setImageSource] = useState<ImageSource | null>(null);
        const [value,setValue] = useState<any>()
        
        useImperativeHandle(ref,() =>({
            close() {
                setShow(false)
            },
            open(){
                setShow(true)
            },
            getValue(){
                return value
            }
        }))
        const styleProps: any = [
            mid && {alignItems: 'center', justifyContent: 'center'},
            { backgroundColor: background },
            bot && {alignItems: 'center', justifyContent: 'flex-end'}
          ]

          const [pickerResponse, setPickerResponse] = useState<any>(null);     

          const onCameraPress = async() => {
            const options: CameraOptions = {
                saveToPhotos: true,
                mediaType: 'photo' as ImagePicker.MediaType,
                includeBase64: false,
            };
            try {
              await requestCameraPermission();
              launchCamera(options, (response:any) => {
                if (response.didCancel) {
                  console.log('User cancelled camera');
                } else if (response.error) {
                  console.log('Camera Error: ', response.error);
                } else {
                  console.log('Image/Video URI: ', response.assets?.[0]?.uri);
                  // Handle the selected media
                  setValue(response.assets?.[0]?.uri);
                }
              });
            } catch (error) {
              console.error('Error requesting camera permission:', error);
            }
          
            
          };

          const onImageLibraryPress = () => {
            const options: ImagePicker.ImageLibraryOptions = {
                mediaType: 'photo' as ImagePicker.MediaType,
                includeBase64: false,
            };
            launchImageLibrary(options, (response:any) => {
              if (response.didCancel) {
                console.log('User cancelled camera');
              } else if (response.error) {
                console.log('Camera Error: ', response.error);
              } else {
                console.log('Image/Video URI1: ', response.assets?.[0]?.uri);
                // Handle the selected media
                setValue(response.assets?.[0]?.uri);
              }
            });
          };
        return(
            <Modal
                visible={show}
                transparent={transparent}
                animated={animated}
                animationType={animationType}
                onRequestClose={onRequestClose}
                onShow={onShow}
                {...rest}>
                <View style={[stylesModal.fullScreen, styleProps]}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => (outClose ? setShow(false) : {})}
                    style={stylesModal.fullScreen}
                />
                
                <View style={stylesModal.container}>
                    <TouchableOpacity style={stylesModal.containerIcon}
                        onPress={onImageLibraryPress}
                    >
                        <Image source={imgApp.picture} style={stylesModal.icon} resizeMode='contain' />
                        <TextApp colorP bold>Thư viện</TextApp>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesModal.containerIcon}
                        onPress={() => onCameraPress()}
                    >
                        <Image source={imgApp.camera} style={stylesModal.icon}  resizeMode='contain'/>
                        <TextApp colorP bold>Máy ảnh</TextApp>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        )
    }
)
ModalPickerImage.defaultProps =  {
    animated:true,
    animationType:'fade',
    transparent:true,
    visible:false,
    onRequestClose: () =>{},
    onShow: () => {}
}

const stylesModal = StyleSheet.create({
    fullScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    container:{
        backgroundColor:'white',
        position:'absolute',
        // top: '70%',
        left: 0,
        right: 0,        
        bottom: 0,
        height:'30%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    containerIcon:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
        // backgroundColor:'red'
    },
    icon:{
        width:'40%',
        height:'40%'
    }
  })
  

export default ModalPickerImage