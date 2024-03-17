
import { Timestamp } from 'firebase/firestore'
import { isArray, isEmpty, isObject, isString } from 'underscore'
export const arrayData = (data: any) => {
  if (isEmpty(data)) return []
  if (data) {
    if (Array.isArray(data)) return data
    return []
  }
  return []
}

export const coverDateTimeStamp = (date: Timestamp) => {
  if(date) {
    // Convert seconds and nanoseconds to milliseconds
    const milliseconds = date.seconds * 1000 + Math.floor(date.nanoseconds / 1e6);
  
    // Create a Date object
    const dateObject = new Date(milliseconds);
    return dateObject

  }
}
export const coverDateTimeStampToString = (date: any) => {
  if(date){
    // Convert seconds and nanoseconds to milliseconds
    const milliseconds = date.seconds * 1000 + Math.floor(date.nanoseconds / 1e6);
    
    // Create a Date object
    const dateObject = new Date(milliseconds);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0
    const day = dateObject.getDate();
    return `${day}-${month}-${year}`
    
    }
    
}

export const covertFirebaseTimeStampToString = (time:Timestamp) => {
  if(time){
    
// Convert Firestore Timestamp to JavaScript Date
    const date = new Date(time.seconds * 1000 + time.nanoseconds / 1e6);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();

    // Create the formatted string
    const formattedDateString = `${day}-${month}-${year}`;
    return formattedDateString
  }
}

export const covertStringtoDateTimeStamp = (date: any) => {
  if(date){
    const dateObject = new Date(date);

    const seconds = Math.floor(dateObject.getTime() / 1000);
    const nanoseconds = (dateObject.getTime() % 1000) * 1e6;

    const firestoreTimestamp = {
      seconds: seconds,
      nanoseconds: nanoseconds,
    };
    return firestoreTimestamp
  }
}

export const covertStringToDate = (date:any) => {
  if(date){
    const dateArray = date.split('-');
    if (dateArray.length === 3) {
      // Ensure the month and day have two digits
      const formattedDate = `${dateArray[2]}-${dateArray[1].padStart(2, '0')}-${dateArray[0].padStart(2, '0')}`;
  
      // Create a new Date object
      const dateObject = new Date(formattedDate);
      return dateObject

    }
  }
}
export const formatMoney = (number:number) => {
  return `${Number(number).toLocaleString('en-US')} đ`
}

export const moneyDiscount = (money:any,discoust:any) =>{
  const percent = 100 - Number(discoust);
  return Number(money)*(percent*0.01)
}