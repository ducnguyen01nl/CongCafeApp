import { Alert } from "react-native";
import { AppLang } from "../../assets/languages";

const info = (name_screen: string) => {
  return {
    path: `${name_screen}/:data`,
    parse: {
      data: (data: string) => JSON.parse(data),
    },
  }
}

export const config = {
  screens: {
    Login_email: info('Login_email'),
    Screen_info_user:info('Screen_info_user'),
    Screen_order_detail:info('Screen_order_detail'),
    BottomTab:info('BottomTab')
  },
}

export const formatLink = (content: any)  =>{
  const id = content?.id;
  const screen = content?.screen;
  if(screen == 2){
    console.log(`congcafeapp://` + TYPE_SCREEN[Number(screen)]  +'/'+id)
    return `congcafeapp://` + TYPE_SCREEN[Number(screen) +'/'+id]
  }
  console.log(`congcafeapp://` + TYPE_SCREEN[Number(screen)] + '/' + JSON.stringify({id}));
  return `congcafeapp://` + TYPE_SCREEN[Number(screen)] + '/' + JSON.stringify({id})
}

export const TYPE_SCREEN:any = {
  1:'Screen_order_detail',
  2:'BottomTab'
}

export const AlertOnMessage = ({ title, body, onPress }: any) => {
  Alert.alert(title, body, [
    {
      text:AppLang('dong'),
      onPress: () => {},
    },
    { text: AppLang('xem'), onPress:() => onPress() },
  ])
}