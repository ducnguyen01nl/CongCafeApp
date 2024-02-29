
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
  // Convert seconds and nanoseconds to milliseconds
  const milliseconds = date.seconds * 1000 + Math.floor(date.nanoseconds / 1e6);

  // Create a Date object
  const dateObject = new Date(milliseconds);
  return dateObject
}
export const coverDateTimeStampToString = (date: any) => {
  // Convert seconds and nanoseconds to milliseconds
  const milliseconds = date.seconds * 1000 + Math.floor(date.nanoseconds / 1e6);

  // Create a Date object
  const dateObject = new Date(milliseconds);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0
  const day = dateObject.getDate();

  return `${day}/${month}/${year}`
}