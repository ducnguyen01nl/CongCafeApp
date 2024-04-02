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
        return formattedDate;

    }
    
    return ''
}

export const formatDateTimestampAll = (time:any) => {
    if(time){
        const newDate = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
        const day = newDate.getDate();
        const month = newDate.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
        const year = newDate.getFullYear();
        const hours = newDate.getHours();
        const minutes = newDate.getMinutes();
        const formattedDate = ` ${hours}:${minutes} ${day}-${month}-${year}`;
        return formattedDate;

    }
    
    return ''
}


export const heightScreen = Dimensions.get('window').height;
export const widthScreen = Dimensions.get('window').width;

export const DATA_GENDER = [
    { name: AppLang(`nam`), value: true }, 
    { name: AppLang(`nu`), value: false }
]


export const DATA_TYPE_ITEMS = [
    {name:'dac_san_cua_cong', value:0},
    {name:'ca_phe_pho', value:1},
    {name:'ca_phe_ta', value:2},
    {name:'tra_co_thu', value:3},
    {name:'do_dia_phuong', value:4},
    {name:'trai_cay', value:5},
    {name:'sua_chua', value:6},
    {name:'do_an', value:7},
]

export const DATA_TYPE_ITEMS2 = [
    {name:AppLang('dac_san_cua_cong'), value:0},
    {name:AppLang('ca_phe_pho'), value:1},
    {name:AppLang('ca_phe_ta'), value:2},
    {name:AppLang('tra_co_thu'), value:3},
    {name:AppLang('do_dia_phuong'), value:4},
    {name:AppLang('trai_cay'), value:5},
    {name:AppLang('sua_chua'), value:6},
    {name:AppLang('do_an'), value:7},
]


export const titleTypeItem = (type: number) => {
    switch (type) {
        case 0:
            return 'don_hang_cho_xac_nhan'
        case 1:
            return 'don_hang_dang_xu_ly'
        case 2:
            return 'don_hang_dang_giao'
        case 3:
            return 'don_hang_da_hoan_thanh'
        case 4:
            return 'don_hang_da_huy'
    }
}
export const titleStatus = (type: number) => {
    switch (type) {
        case 0:
            return 'xac_nhan'
        case 1:
            return 'dang_xu_ly2'
        case 2:
            return 'dang_giao2'
        case 3:
            return 'hoan_thanh'
        case 4:
            return 'huy'
    }
}

export const ipLocal = '192.168.1.18'