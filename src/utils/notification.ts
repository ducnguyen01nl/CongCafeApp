import messaging from '@react-native-firebase/messaging';
import ToastService from '../service/ToastService';
import { useGetListNotification } from '../service/useLocalMater';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pushNotificationApi } from '../api/pushNotificationApi';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../app/redux/slices/tokenSlice';
import { store } from '../app/redux/store';
import { ToastAndroid } from 'react-native';
import { authorize } from 'react-native-app-auth';
import { navigate } from '../root/RootNavigation';
import { LINK_TO } from '../data/dataLocal';


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

const config:any = {
  issuer: 'https://accounts.google.com',
  clientId: '956275766314-njl1jn8klh7ejh1pp1oa5827cm6r5fc5.apps.googleusercontent.com',
  scopes: ['openid', 'profile', 'email'],
};

export const getTokenOAuth = async () => {
  try {
    const result = await authorize(config);
    const accessToken = result.accessToken;
    console.log('Access Token:', accessToken);
    // Use the access token to make requests to the FCM HTTP v1 API
  } catch (error) {
    console.error('OAuth error:', error);
  }
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
    console.log('nofionbackgroud',remoteMessage.notification)
  })
  messaging().onMessage(remoteMessage =>{
    console.log('notifionApp',remoteMessage);
    ToastService.showToast(remoteMessage.notification?.body,0)
  })
  messaging().getInitialNotification()
  .then((remoteMessage:any) =>{
    if(remoteMessage){
      console.log('notifiOutApp',remoteMessage.notification);
    }
    // if(remoteMessage.data){
    //   const screen = LINK_TO(Number(remoteMessage.data.screen))
    //   console.log('screen',screen);
    //     navigate(screen ? screen : 'BottomTab')
    // }
  })
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage.data);
    // if(remoteMessage.data){
    //   const screen = LINK_TO(Number(remoteMessage.data.screen))
    //   console.log('screen',screen);
    //     navigate(screen ? screen : 'BottomTab')
    // }
  });

}