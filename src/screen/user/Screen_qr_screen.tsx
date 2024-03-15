import React, { useEffect } from 'react'
import LayoutApp from '../../components/LayoutApp';
const Screen_qr_screen = () => {

//   const { hasPermission, requestPermission } = useCameraPermission()
//   const device = useCameraDevice('back')

//   React.useEffect(() =>{
//     requestPermission()
//   },[])

//   if (device == null) return <LoadingApp />


//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: (codes: Code[]) => {
//       console.log(`Scanned ${codes[0].value} codes!`)
//     }
//   })

//   return (
//     <Camera
//       style={StyleSheet.absoluteFill}
//       device={device}
//       isActive={true}
//       codeScanner={codeScanner} 
//     />
//   )

return(
  <LayoutApp></LayoutApp>
)



}


export default Screen_qr_screen