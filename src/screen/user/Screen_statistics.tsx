import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack, navigate } from '../../root/RootNavigation'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import ViewApp from '../../components/ViewApp'
import { DATA_FILTER_STATISTICS, DATA_MONTH, DATA_MONTH_2, DATA_TYPE_ITEMS, widthScreen } from '../../data/dataLocal'
import { useListOrderAllApp } from '../../service/useLocalMater'
import InputCustom from '../../components/input/InputCustom'
import InputSelect from '../../components/input/InputSelect'
import { convertFirebaseTimestamp } from '../../components/convertData'
import { coverDateTimeStamp, formatMoney, formatMoney2 } from '../../utils/format'
import TextApp from '../../components/TextApp'
import { COLORS } from '../../colors/colors'
import IconApp from '../../components/IconApp'
import TouchApp from '../../components/TouchApp'
import { number } from 'yup'

type orderType = {
  year?: number | undefined
}

const Screen_statistics = () => {

  const [isLoading, data, onRefresh] = useListOrderAllApp(-1)
  const _input = useRef<any>({})
  // console.log('====================================');
  // console.log(data);
  // console.log('====================================');
  const countOrder = (status: number, dataFilter?: any) => {
    const dataCurrent = dataFilter ? dataFilter : data
    if (status == 3 || status == 4) {
      return dataCurrent.filter((item: any) => item.status == status)
    }
    else {
      return dataCurrent.filter((item: any) => item.status != 3 && item.status != 4)
    }
  }

  const totalPrice = (data: any) => {
    let total = 0;
    data.map((item: any) => {
      total += Number(item.totalPrice)
    })
    return total
  }

  useEffect(() => {
    _input.current['date_year'].setValue(dataSelectYear()[0])
    _input.current['date_month'].setValue(DATA_MONTH[0])
  }, [])

  const groupedOrders = (dataGroup?: any) => {
    const group: any = [];
    const dataCurrent = dataGroup ? dataGroup : data
    if (Array.isArray(dataCurrent)) {
      dataCurrent?.forEach((element: any) => {
        const date = coverDateTimeStamp(element.createAt)
        if (date) {
          const key = `${date?.getFullYear()}`
          if (!group[key]) {
            group[key] = [];
          }
          // Thêm đơn hàng vào nhóm tương ứng
          group[key].push(element);
        }
      });
    }
    const result = Object.entries(group).map(([year, data]) => ({
      time: year.toString(),
      data: data,
    }));
    return result.sort((a:any,b:any) => a.time - b.time)

  }

  const groupedOrders1 = (dataGroup?: any) => {
    const group: any = [];
    const dataCurrent = dataGroup ? dataGroup : data
    if (Array.isArray(dataCurrent)) {
      dataCurrent?.forEach((element: any) => {
        const date = coverDateTimeStamp(element.createAt)
        if (date) {
          const key = `${date?.getFullYear()}_${date?.getMonth() + 1}`
          if (!group[key]) {
            group[key] = [];
          }
          // Thêm đơn hàng vào nhóm tương ứng
          group[key].push(element);
        }
      });
    }
    const result = Object.entries(group).map(([year, data]) => ({
      year: year.toString().split('_')[0],
      month: year.toString().split('_')[1],
      data: data,
    }));
    return result.sort((a:any,b:any) => a.month - b.month)
  }

  const groupedOrders2 = (dataGroup?: any) => {
    const group: any = [];
    const dataCurrent = dataGroup ? dataGroup : data
    if (Array.isArray(dataCurrent)) {
      dataCurrent?.forEach((element: any) => {
        const date = coverDateTimeStamp(element.createAt)
        if (date) {
          const key = `${date?.getFullYear()}_${date?.getMonth() + 1}_${date?.getDate()}`
          if (!group[key]) {
            group[key] = [];
          }
          // Thêm đơn hàng vào nhóm tương ứng
          group[key].push(element);
        }
      });
    }
    const result = Object.entries(group).map(([year, data]) => ({
      year: year.toString().split('_')[0],
      month: year.toString().split('_')[1],
      day: year.toString().split('_')[2],
      data: data,
    }));

    return result.sort((a:any,b:any) => a.day - b.day)
  }

  const dataSelectYear = () => {
    const data = groupedOrders()?.map((item: any, index) => { return { name: item.time, value: index } })
    return [{ name: AppLang('tat_ca_nam'), value: -1 }, ...data]
  }
  const dataSelectMonth = () => {
    const data = groupedOrders1()?.map((item: any, index) => { return { name: item.month, value: index } })
    return [{ name: AppLang('tat_ca_thang'), value: -1 }, ...data]
  }

  const [valueYear, setValueYear] = useState(dataSelectYear()[0])


  useEffect(() => {
    if (valueYear.value == -1) {
      _input.current['date_month'].setValue(DATA_MONTH[0])
    }
  }, [valueYear])

  // console.log('222', dataSelectYear())

  const dataRender = () => {
    if (_input.current['date_year']?.getValue()?.value == -1) {
      return data
    }
    else {
      if (Number(_input.current['date_month']?.getValue()?.value) == 0) {
        // console.log(_input.current['date_year'].getValue().name);
        const dataNew: any = groupedOrders()?.filter((item: any) => (item.time == _input.current['date_year']?.getValue()?.name))
        return dataNew.length > 0 ? dataNew[0].data : []
        // groupedOrders()?.map((item:any) =>{
        //   console.log(item.time == _input.current['date_year']?.getValue()?.name);
        //   if(item.time == _input.current['date_year']?.getValue()?.name){
        //     return item     
        //   }
        // })
      }
      else {
        const year = _input.current['date_year']?.getValue()?.name;
        const month = _input.current['date_month']?.getValue()?.value
        const dataNew: any = groupedOrders1()?.filter((item: any) => (item.year == year && Number(item.month) == month))
        return dataNew.length > 0 ? dataNew[0].data : []
      }
    }

  }

  console.log('--------------', groupedOrders2(countOrder(3, dataRender())))
  console.log('--------------', groupedOrders1()?.filter((item: any) => (item.year == _input.current['date_year']?.getValue()?.name && Number(item.month) == _input.current['date_month']?.getValue()?.value)))

  const data1 = {
    labels: valueYear.value == -1 ? groupedOrders(countOrder(3, dataRender()))?.map((item: any) => item.time) 
      : _input.current['date_month']?.getValue()?.value == 0 ? groupedOrders1(countOrder(3, dataRender()))?.map((item: any) => `${AppLang('thang')} ${item.month}`)
      : groupedOrders2(countOrder(3, dataRender()))?.map((item: any) => `${AppLang('ngay2')} ${item.day}/${item.month}`),
    datasets: [{
      data: (valueYear.value == -1 ? groupedOrders(countOrder(3, dataRender())) 
      : _input.current['date_month']?.getValue()?.value == 0 ? groupedOrders1(countOrder(3, dataRender()))
      : groupedOrders2(countOrder(3,dataRender())))?.map((item: any) => {
        let total = 0;
        item.data.map((prev: any) => total += prev.totalPrice)
        // const formatMoney = formatMoney2(total / 1000)
        // console.log(formatMoney);

        return total / 1000
      })
    }
    ]
  };


  const handleFilter = () => {
    // dataRender()
    onRefresh()
  }

  const hanđleShowOrder = (data: any, title: string) => {
    navigate('Screen_list_order_statistics', { data: data, title: title })
  }

  return (
    <LayoutApp>
      <HeaderApp
        title={AppLang('thong_ke_don_hang')}
        left={{
          show: true,
          onPress: () => goBack()
        }}
      />
      <ScrollView style={{ flex: 1 }}>
        <ViewApp row padH10 marT10 mid>
          <InputSelect
            label={AppLang('theo_nam')}
            // placeholder={AppLang(`ngay`)}
            data={dataSelectYear()}
            onSelectItem={(item: any) => setValueYear(item)}
            icon={{ name: 'caret-down' }}
            ref={ref => (_input.current['date_year'] = ref)}
            styleBox={{ flex: 1, marginHorizontal: 5 }}
            style={{ paddingHorizontal: 10 }}
          // placeholder='Năm'
          />
          <InputSelect
            label={AppLang('theo_thang')}
            // placeholder={AppLang(`ngay`)}
            data={DATA_MONTH}
            icon={{ name: 'caret-down' }}
            ref={ref => (_input.current['date_month'] = ref)}
            styleBox={{ flex: 1, marginHorizontal: 5 }}
            style={{ paddingHorizontal: 10 }}
            disabled={valueYear.value == -1 ? true : false}
          />
          <TouchApp borderW={1} square={50} borderR={10} mid marT={15} borderC={COLORS.text1}
            onPress={() => handleFilter()}
          >
            <IconApp size={30} name='filter-list-alt' type='MaterialIcons' />
          </TouchApp>
        </ViewApp>
        <ViewApp marV20 mid>
          <ItemStatistics title={AppLang('tong_hoa_don')} value={dataRender().length} bg={COLORS.primary} char='clipboard' onPress={() => hanđleShowOrder(dataRender(), AppLang('tong_hoa_don'))} />
          <ItemStatistics title={AppLang('hoa_don_da_thanh_cong')} value={countOrder(3, dataRender()).length} bg={COLORS.blue} char='check-square-o' onPress={() => hanđleShowOrder(countOrder(3, dataRender()), AppLang('hoa_don_da_thanh_cong'))} />
          <ItemStatistics title={AppLang('hoa_don_bi_huy')} value={countOrder(4, dataRender()).length} bg={COLORS.orange} char='remove' onPress={() => hanđleShowOrder(countOrder(4, dataRender()), AppLang('hoa_don_bi_huy'))} />
          <ItemStatistics title={AppLang('hoa_don_dang_xu_ly')} value={countOrder(0, dataRender()).length} bg={COLORS.text3} char='gears' onPress={() => hanđleShowOrder(countOrder(0, dataRender()), AppLang('hoa_don_dang_xu_ly'))} />
          <ItemStatistics title={AppLang('tong_doanh_thu')} value={formatMoney(totalPrice(countOrder(3, dataRender())))} bg={COLORS.green} char={'usd'} onPress={() => { }} />
        </ViewApp>
        <ViewApp marT={20} mid>
          {
            countOrder(3, dataRender()).length > 0 &&
            <ViewApp w100 row centerH padH20>
              <ViewApp></ViewApp>
              <TextApp>{AppLang('bieu_do_doanh_thu')}</TextApp>
              <TextApp>{`${AppLang('don_vi')}: ${AppLang('nghin_dong')}`}</TextApp>
            </ViewApp>
          }
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: 20 }}>
            <BarChart
              style={{}}
              data={data1}
              width={
                (_input.current['date_year']?.getValue()?.value == -1 ? groupedOrders(countOrder(3, dataRender())) 
                : _input.current['date_month']?.getValue()?.value == 0 ? groupedOrders1(countOrder(3, dataRender()))
                : groupedOrders2(countOrder(3,dataRender()))
              ).length * widthScreen * 0.3
              }
              height={220}
              yAxisLabel=""
              // chartConfig={chartConfig}
              // verticalLabelRotation={30}
              fromZero
              showValuesOnTopOfBars
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              yAxisSuffix=""
            />
          </ScrollView>
        </ViewApp>
      </ScrollView>

    </LayoutApp>
  )
}

const ItemStatistics = ({ title, value, bg, char, onPress }: any) => {
  return (
    <ViewApp w={'90%'} pad10 marV5 borderR={10} row alignCenter backgroundColor={bg}
    >
      <TouchApp row onPress={onPress}>
        <ViewApp square={40} borderR100 mid bgW marR10>
          <IconApp color={COLORS.text2} name={char} type='FontAwesome' />
        </ViewApp>
        <ViewApp>
          <TextApp colorW>{title}</TextApp>
          <TextApp colorW bold>{`${value}`}</TextApp>
        </ViewApp>

      </TouchApp>
    </ViewApp>
  )
}

export default Screen_statistics