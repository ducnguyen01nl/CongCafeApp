import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {userApi} from '../api/userApi';
import {addressApi} from '../api/addressApi';
import {drinksApi} from '../api/drinksApi';
import {orderApi} from '../api/orderApi';
import {tableApi} from '../api/tableApi';
import {pushNotificationApi} from '../api/pushNotificationApi';

export const useLocalMater = (type, callBackApi) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(type);

  useEffect(() => {
    onRefresh();
  }, []);
  const onRefresh = async () => {
    setIsLoading(true);
    try {
      const res = await callBackApi();
      if (res) setData(res);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return [isLoading, data, onRefresh];
};

export const useInfoUserCurrent = () => {
  const {user} = useSelector(state => state.user);
  const [isLoading, data, onRefresh] = useLocalMater({}, () =>
    userApi.getUserInfoById(user),
  );
  return [isLoading, data, onRefresh];
};

export const useListAddress = () => {
  const [isLoading, data, onRefresh] = useLocalMater([], () =>
    addressApi.getListAddress(),
  );
  return [isLoading, data, onRefresh];
};
export const useAddressActive = () => {
  const [isLoading, data, onRefresh] = useLocalMater({}, () =>
    addressApi.getAddressActive(),
  );
  return data;
};
export const useAddressById = id => {
  const [isLoading, data, onRefresh] = useLocalMater({}, () =>
    addressApi.getAddressById(id),
  );
  return [isLoading, data, onRefresh];
};
export const useAddressActive2 = () => {
  const [isLoading, data, onRefresh] = useLocalMater({}, () =>
    addressApi.getAddressActive(),
  );
  return [isLoading, data, onRefresh];
};

export const useAddressVN = () => {
  const [isLoading, data, onRefresh] = useLocalMater([], () =>
    addressApi.getAddress(),
  );
  return [isLoading, data, onRefresh];
};

export const useListDrinks = () => {
  const [isLoading, data, onRefresh] = useLocalMater([], () =>
    drinksApi.getListDrinks(),
  );
  return [isLoading, data, onRefresh];
};

export const useCartUser = () => {
  const [isLoading, data, onRefresh] = useLocalMater({}, () =>
    userApi.getCartUser(),
  );
  return [isLoading, data, onRefresh];
};

export const useGetItemDrink = id => {
  const [isLoading, data, onRefresh] = useLocalMater({}, () =>
    drinksApi.getItemDrink(id),
  );

  return [isLoading, data, onRefresh];
};
export const useListOrder = status => {
  const [isLoading, data, onRefresh] = useLocalMater([], () =>
    orderApi.getListOrderByStatus(status),
  );
  return [isLoading, data, onRefresh];
};

export const useListOrderAll = () => {
  const [isLoading, data, onRefresh] = useLocalMater([], () =>
    orderApi.getListOrderAll(),
  );
  return [isLoading, data, onRefresh];
};

export const useListOrderAllApp = status => {
  const [isLoading, data, onRefresh] = useLocalMater([], () =>
    orderApi.getListOrderAllAppByStatus(status),
  );
  return [isLoading, data, onRefresh];
};

export const useGetListTable = () => {
  const [isLoading, data, onRefresh] = useLocalMater([], () =>
    tableApi.getListTable(),
  );
  return [isLoading, data, onRefresh];
};
export const useGetTableById = id => {
  const [isLoading, data, onRefresh] = useLocalMater([], () =>
    tableApi.getTableById(id),
  );
  return [isLoading, data, onRefresh];
};
export const useGetListNotification = () => {
  const [isLoading, data, onRefresh] = useLocalMater([], () =>
    pushNotificationApi.getListNotification(),
  );
  return [isLoading, data, onRefresh];
};
export const useGetListToken = () => {
  const [isLoading, data, onRefresh] = useLocalMater([], () =>
    pushNotificationApi.getListToken(),
  );
  return [isLoading, data, onRefresh];
};
export const useGetTokenById = (userId) =>{
  const [isLoading, data, onRefresh] = useLocalMater({},() =>
    pushNotificationApi.getTokenByIdUser(userId)
  );
  return data
}
