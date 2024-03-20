import { Text, StyleSheet } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import ViewApp from './ViewApp'
import { COLORS } from '../colors/colors'
import IconApp from './IconApp'

const ToastMessage = forwardRef(({timeout=2000}:any,ref) => {
    const [isVisiable,setIsVisiable] = useState(false)
    const [toastMessage,setToastMessage] = useState('')
    const [type,setType] = useState<number|undefined>(0)

    const showToast = (mesage:string,type?:number) =>{
        setToastMessage(mesage)
        setType(type)
        setIsVisiable(true)
        const timer:any = setTimeout(() =>{
            setIsVisiable(false)
            clearTimeout(timer)
        },timeout)
    }

    useImperativeHandle(ref,() =>({
        show: showToast
    }))

  return (
    <>
    {
        isVisiable && <ViewApp style={[styles.toast,{backgroundColor:type == 0 ? COLORS.green : COLORS.yl,}]} animated={true}>
                        <IconApp name={type == 0 ? 'checkcircleo' : 'warning'} type='AntDesign' size={26} color='white'/>
                        <Text style={styles.textToast}>{toastMessage}</Text>
                    </ViewApp>
    }
    </>
  )
}
)

const styles = StyleSheet.create({
    toast:{
        position:'absolute',
        top:10,
        left:10,
        right:10,
        minHeight:80,
        zIndex:100,
        borderRadius:20,
        padding:15,
        shadowColor: '#000',
        shadowOffset:{
            height:2,
            width:0
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5,
        flexDirection:'row',
        alignItems:'center'
    
    },
    textToast:{
        color: COLORS.white,
        marginHorizontal:10,
        fontSize:16
    }
})

export default ToastMessage

// ToastService.js
// export class ToastService {
//     static ref = React.createRef();
  
//     static showToast(message:any) {
//       (this.ref.current as any)?.show(message);
//     }
//   }

//   export default ToastService