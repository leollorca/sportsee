import { useState, useEffect } from 'react';
import { RadialBarChart, PolarAngleAxis, RadialBar } from "recharts";

import { getScore } from "../../services/api";

const Score = ({ dataSource }) => {
  const [score, setScore] = useState([]);

  const getData = async () => {
    const data = await getScore(dataSource);

    setScore(data);
  };

  useEffect(() => {
    getData();
  }, [dataSource]);
  
  return (
    <>
      <RadialBarChart
      width={220}
      height={220}
      cx="50%"
      cy="50%"
      innerRadius="80%"
      outerRadius="100%"
      barSize={10}
      data={[score]}
      startAngle={90}
      endAngle={-270}
    >
      <PolarAngleAxis
        type="number"
        domain={[0, 1]}
        angleAxisId={0}
        tick={false}
      />
      <RadialBar
        minAngle={15}
        clockWise
        dataKey="value"
        cornerRadius={5}
      />
      </RadialBarChart>
      <div className='absolute flex items-center bg-[#ffffff] w-[157px] h-[157px] rounded-full'>
        <div className='flex flex-col items-center w-full'>
          <div className='text-[26px] font-bold'>{score.value * 100}%</div>
          <div className='text-[#74798C] font-medium'>de votre</div>
          <div className='text-[#74798C] font-medium'>objectif</div>
        </div>
      </div>
      <div className='absolute top-[24px] left-[24px] text-[15px] text-[#20253A]'>
        Score
      </div>
    </>
  );
};

export default Score;
