import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { getActivity } from "../../services/api";

const DailyActivity = ({ dataSource }) => {
  const [sessions, setSessions] = useState([]);
  const [minKg, setMinKg] = useState(0);
  const [maxKg, setMaxKg] = useState(0);
  const [midKg, setMidKg] = useState(0);
  const [minCal, setMinCal] = useState(0);
  const [maxCal, setMaxCal] = useState(0);
  const [midCal, setMidCal] = useState(0);

  const getData = async () => {
    const data = await getActivity(dataSource);
    
    const formattedActivity = data.map((session, i) => {
      const minKg = Math.min(...data.map((session) => session.kilogram));
      const maxKg = Math.max(...data.map((session) => session.kilogram));
      const midKg = (minKg + maxKg) / 2;

      const minCal = Math.min(...data.map((session) => session.calories));
      const maxCal = Math.max(...data.map((session) => session.calories));
      const midCal = (minCal + maxCal) / 2;

      setMinKg(minKg - 1);
      setMaxKg(maxKg + 1);
      setMidKg(midKg);
      setMinCal(minCal - 100);
      setMaxCal(maxCal + 100);
      setMidCal(midCal);
      
      return {
        name: i + 1,
        kgs: session.kilogram,
        cals: session.calories,
      };
    });

    setSessions(formattedActivity);
  };

  useEffect(() => {
    getData();
  }, [dataSource]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="flex flex-col gap-6 bg-[#e60000] text-[#fff] py-6 px-4">
          <p>{`${payload[0].value}kg`}</p>
          <p>{`${payload[1].value}kcal`}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <>
      <BarChart width={763} height={215} data={sessions} barGap={12}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#DEDEDE"
          tickSize={0}
          tick={{ fill: '#9B9EAC' }}
          tickMargin={24}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          hide={true}
          ticks={[minCal, midCal, maxCal]}
          domain={[minCal, maxCal]}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          axisLine={false}
          tick={{ fill: '#9B9EAC' }}
          tickSize={0}
          tickMargin={24}
          ticks={[minKg, midKg, maxKg]}
          domain={[minKg, maxKg]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="kgs"
          yAxisId="right" 
          fill="#282D30"
          barSize={8}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="cals"
          yAxisId="left"
          fill="#E60000"
          barSize={8}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
      <div className='absolute top-[24px] left-[24px] text-[15px] text-[#20253A]'>
        Activité quotidienne
      </div>
      <div className='absolute top-[24px] right-[24px] flex gap-8 text-[15px] text-[#74798C]'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-[#20253A] rounded-full' />
          Poids (kg)
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-[#E60000] rounded-full' />
          Calories brûlées (kCal)
        </div>
      </div>
    </>
  );
};

export default DailyActivity;
