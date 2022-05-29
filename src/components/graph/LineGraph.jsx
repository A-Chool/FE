import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

// nivo import
import { ResponsiveLine } from '@nivo/line'

import { loadLine } from "../../redux/modules/rank";

const LineGraph = () => {

    const dispatch = useDispatch();

    const Myline = useSelector((state) => state?.rank?.line?.myTotal)
    const Totalline = useSelector((state) => state?.rank?.line?.usersAvg)

    // console.log('Myline은 = ' ,Myline)
    // console.log('Totalline은 = ' ,Totalline)

    const MylineX = Myline?.map((e) => {return (e.split(':')[0])})
    // console.log('MylineX은 = ' , MylineX)

    const MylineY = Myline?.map((e) => {return (e.split(':')[1])})
    // console.log('MylineY은 = ' , MylineY)

    const TotallineX = Totalline?.map((e) => {return (e.split(':')[0])})
    // console.log('TotallineX은 = ' , TotallineX)

    const TotallineY = Totalline?.map((e) => {return (e.split(':')[1])})
    // console.log('TotallineY은 = ' , TotallineY)

    const MylineData = MylineX?.map((e, idx) => {
        return ({'x' : MylineX[idx], 'y' : MylineY[idx]})
    })

    const TotallineData = TotallineX?.map((e, idx) => {
        return ({'x' : TotallineX[idx], 'y' : TotallineY[idx]})
    })

    // console.log('MylineData은 = ' , MylineData)
    // console.log('TotallineData은 = ' , TotallineData)

    const total = [
        {
            id : '나의 학습시간',
            data : MylineData,
        },
        {
            id : '유저 평균',
            data : TotallineData
        }
    ]



    // 상단 통계 데이터 볼러오기
    React.useEffect(() => {
        dispatch(loadLine());
    }, []);

return (    
    <div style={{ height: 210 }}>
    <ResponsiveLine
        data={total}
        margin={{ top: 10, right: 110, bottom: 50, left: 40 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: '0',
            max: '24',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="basis"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        colors={[
            "rgba(255, 95, 0, 0.5)",
            "rgba(59, 135, 155, 0.5)",
        ]}
        lineWidth={4}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        areaOpacity={0}
        enableCrosshair={false}
        useMesh={true}
        legends={[
            {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 16,
                itemOpacity: 0.75,
                symbolSize: 10,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        motionConfig="slow"
    />
    </div>
  );
};

export default LineGraph;