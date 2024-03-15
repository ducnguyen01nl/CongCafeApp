import { Timestamp } from "firebase/firestore";
import { AppLang } from "../assets/languages";
import { Dimensions } from "react-native";


export const regPhone: RegExp = /([3|5|7|8|9])+([0-9]{8})\b/
export const regPhone2: RegExp = /(0[3|5|7|8|9])+([0-9]{8})\b/
// Chuyển đổi timestamp thành đối tượng Date
export const formatDateTimestamp = (time:any) => {
    if(time){
        const newDate = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
        const day = newDate.getDate();
        const month = newDate.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
        const year = newDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate

    }
    
    // return formattedDate
}


export const heightScreen = Dimensions.get('window').height;
export const widthScreen = Dimensions.get('window').width;

export const DATA_GENDER = [
    { name: AppLang(`nam`), value: true }, 
    { name: AppLang(`nu`), value: false }
]

export const DATA_TYPE_ITEMS = [
    {name:AppLang('dac_san_cua_cong'), value:0},
    {name:AppLang('ca_phe_pho'), value:1},
    {name:AppLang('ca_phe_ta'), value:2},
    {name:AppLang('tra_co_thu'), value:3},
    {name:AppLang('do_dia_phuong'), value:4},
    {name:AppLang('trai_cay'), value:5},
    {name:AppLang('sua_chua'), value:6},
    {name:AppLang('do_an'), value:7},
]