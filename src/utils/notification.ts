import messaging from '@react-native-firebase/messaging';
import ToastService from '../service/ToastService';
import { useGetListNotification } from '../service/useLocalMater';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pushNotificationApi } from '../api/pushNotificationApi';
import { useDispatch } from 'react-redux';
import { setToken } from '../app/redux/slices/tokenSlice';
import { store } from '../app/redux/store';
import { ToastAndroid } from 'react-native';


export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const useToken = () => {

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        store.dispatch(setToken(token));
        return token
      }
    } catch (error) {
      console.log(error, 'getToken');
      return null
    }
  };
   getToken()

};

// const [isLoadingNo, dataNo, onRefreshNo] = useGetListNotification() 
// export  const handleUpdateTokenFCM = async() =>{
//   const userId: any = await AsyncStorage.getItem('userId')
  

//   try {
//     const token = await messaging().getToken()
//       if(token && dataNo){
//         const tokenCurrent = dataNo?.find((state:any) => state.token == token)
//         if(tokenCurrent){
//           if(tokenCurrent?.userId == userId){
//             return null
//           }
//           else{
//             await pushNotificationApi.updateTokenFCM(tokenCurrent?.id,{
//               userId:userId
//             })
//           }
//         }
//         else{
//           await pushNotificationApi.addTokenFCM(token)
//         }
//       }
      
//   } catch (error) {
//       console.log(error, 'getToken')
//   }
// }

export const notificationListener = async() =>{
  messaging().onNotificationOpenedApp(remoteMessage =>{
    console.log('nofionbackgroud',remoteMessage.notification);
    
  })
  messaging().onMessage(remoteMessage =>{
    console.log('notifionApp',remoteMessage.notification);
    ToastService.showToast(remoteMessage.notification?.body,0)
  })
  messaging().getInitialNotification()
  .then((remoteMessage:any) =>{
    if(remoteMessage){
      console.log('notifiOutApp',remoteMessage.notification);
      
    }
  })

}