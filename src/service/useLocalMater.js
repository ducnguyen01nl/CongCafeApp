import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userApi } from "../api/userApi"
import { addressApi } from "../api/addressApi"
import { drinksApi } from "../api/drinksApi"

export const useLocalMater = (type,callBackApi) => {
    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState(type)

    useEffect(() => {
        onRefresh()
    },[])
    const onRefresh = async() =>{
        setIsLoading(true)
        try {
            const res = await callBackApi();
            console.log('====', res);
            if (res) setData(res);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }
    return [isLoading,data,onRefresh]
}

export const useInfoUserCurrent = () =>{
    const {user} = useSelector(state => state.user)
    const [isLoading,data,onRefresh] = useLocalMater({},() =>
        userApi.getUserInfoById(user),
    )
    return [isLoading,data,onRefresh]
}

export const useListAddress = () => {
    const {user} = useSelector(state => state.user)
    const [isLoading,data,onRefresh] = useLocalMater([],() =>
        userApi.getListAddress(user),
    )
    return [isLoading,data,onRefresh]
}

export const useAddressVN = () => {
    const [isLoading,data,onRefresh] = useLocalMater([],() =>
        addressApi.getAddress(),
    )
    return [isLoading,data,onRefresh]
}

export const useListDrinks = () => {
    const [isLoading,data,onRefresh] = useLocalMater([],() =>
        drinksApi.getListDrinks(),
    )
    return [isLoading,data,onRefresh]
}

export const useCartUser = () => {
    const [isLoading,data,onRefresh] = useLocalMater({},() =>
        userApi.getCartUser(),
    )
    return[isLoading,data,onRefresh]
}

export const useGetItemDrink = (id) => {
    const [isLoading,data,onRefresh] = useLocalMater({}, () =>
    drinksApi.getItemDrink(id))

    return [isLoading,data,onRefresh]
}

