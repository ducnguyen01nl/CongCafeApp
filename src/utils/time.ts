import moment from 'moment'
export enum TimeType {
  Hours = 'hours',
  Days = 'days',
}

export const FMTime = {
  full: (date: any) => {
    if (date) return moment(date).format('HH:mm:ss DD/MM/YYYY')
    return ''
  },
  full2: (date: any) => {
    if (date) return moment(date).format('HH:mm DD/MM/YYYY')
    return ''
  },
  day: (date: any) => {
    if (date) return moment(date).format('DD/MM/YYYY')
    return ''
  },
  post: (date: any) => {
    if (date) return moment(date).format('YYYY-MM-DD HH:mm:ss')
    return ''
  },
  format1: (date: any) => {
    if (date) return moment(date).format('HH:mm - DD/MM/YYYY')
    return ''
  },
  isBetween: (currentTime: any, startTime: any, endTime: any) => {
    if (!currentTime || !startTime || !endTime) return false
    return currentTime.isBetween(startTime, endTime)
  },
  addTime: (time?: any, number_add: number = 0, typeAdd: TimeType = TimeType.Hours) => {
    if (!time) return false;
    return moment(time).add(number_add, typeAdd)
  },
  subtractTime: (time?: any, number_add: number = 0, typeAdd: TimeType = TimeType.Hours) => {
    if (!time) return false;
    return moment(time).subtract(number_add, typeAdd)
  },
}
