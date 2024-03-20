import { regPhone2 } from "../data/dataLocal"

export const validatePhone = (value:any) => {
    if(regPhone2.test(value)) return true
    return false
}