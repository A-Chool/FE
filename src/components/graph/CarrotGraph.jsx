import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

// nivo import
import { ResponsiveCalendar } from '@nivo/calendar'

import { loadCarrot } from "../../redux/modules/rank";

const CarrotGraph = (props) => {

  const dispatch = useDispatch();
  
  const data = useSelector((state) => state?.rank?.carrot)

  // console.log(data)
  
  const carrot = [
    {
      day: '2022-01-01', 
      value: 0
    },
    {
      day: '2022-01-02', 
      value: 1
    },
  ]

  
  // console.log(carrot)
  // const data = () => {
  //   if (carrot === undefined){
  //     return [{day: '2022-01-01', value: 0}]
  //   }
  // };

  
  // 상단 통계 데이터 볼러오기
  React.useEffect(() => {
    dispatch(loadCarrot());
  }, []);

  return (
    <div style={{ height: 140 }}>
    <ResponsiveCalendar
      data={data}
      from="2022-01-01"
      to="2022-12-31"
      emptyColor="#eeeeee"
      colors={[
        "rgba(255, 95, 0, 0.2)",
        "rgba(255, 95, 0, 0.4)",
        "rgba(255, 95, 0, 0.6)",
        "rgba(255, 95, 0, 0.8)",
        "#FF5F00",
      ]}
      minValue={1}
      maxValue={15}
      margin={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2.5}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 5,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  </div>
  )
}

export default CarrotGraph;