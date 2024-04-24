import { Timestamp } from "firebase/firestore";
import { AppLang } from "../assets/languages";
import { Dimensions } from "react-native";
import { navigate } from "../root/RootNavigation";


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
        const hours = newDate.getHours().toString().padStart(2, '0');
        const minutes = newDate.getMinutes().toString().padStart(2, '0');
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

export const DATA_FILTER_DATE = [
    {name:AppLang('tat_ca'), value:0},
    {name:AppLang('hom_nay'), value:1},
    {name:AppLang('bay_ngay_truoc'), value:2},
    {name:AppLang('thang_truoc'), value:3},
]
export const DATA_FILTER_TYPE = [
    {name:AppLang('tat_ca'), value:0},
    {name:AppLang('thong_bao'), value:1},
    {name:AppLang('su_kien'), value:2},
    {name:AppLang('tin_tuc'), value:3},
]
export const DATA_FILTER_TYPE_2 = [
    {name:AppLang('thong_bao'), value:1},
    {name:AppLang('su_kien'), value:2},
    {name:AppLang('tin_tuc'), value:3},
]

export const DATA_FILTER_STATISTICS = [
    {name:AppLang('theo_nam'), value:0},
    {name:AppLang('theo_thang'), value:1},
    {name:AppLang('theo_ngay'), value:2},
]
export const DATA_MONTH = [
    {name:AppLang('tat_ca_thang'), value:0},
    {name:AppLang('thang_1'), value:1},
    {name:AppLang('thang_2'), value:2},
    {name:AppLang('thang_3'), value:3},
    {name:AppLang('thang_4'), value:4},
    {name:AppLang('thang_5'), value:5},
    {name:AppLang('thang_6'), value:6},
    {name:AppLang('thang_7'), value:7},
    {name:AppLang('thang_8'), value:8},
    {name:AppLang('thang_9'), value:9},
    {name:AppLang('thang_10'), value:10},
    {name:AppLang('thang_11'), value:11},
    {name:AppLang('thang_12'), value:12},
]
export const DATA_MONTH_2 = [
    {name:AppLang('thang_1'), value:1},
    {name:AppLang('thang_2'), value:2},
    {name:AppLang('thang_3'), value:3},
    {name:AppLang('thang_4'), value:4},
    {name:AppLang('thang_5'), value:5},
    {name:AppLang('thang_6'), value:6},
    {name:AppLang('thang_7'), value:7},
    {name:AppLang('thang_8'), value:8},
    {name:AppLang('thang_9'), value:9},
    {name:AppLang('thang_10'), value:10},
    {name:AppLang('thang_11'), value:11},
    {name:AppLang('thang_12'), value:12},
]

export const LINK_TO = (id:number) =>{
    switch(id){
        case 0:
            return "Screen_add_news"
        case 1:
            return "Screen_address"
    }
}


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

export const ipLocal = '192.168.1.229'