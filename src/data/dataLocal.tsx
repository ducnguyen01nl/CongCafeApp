import { Timestamp } from "firebase/firestore";


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

export const DATA_GENDER = [
    { name: 'Nam', value: true }, 
    { name: 'Nữ', value: false }
]
