import { useState, useEffect } from 'react';
import { RadialBarChart, PolarAngleAxis, RadialBar } from "recharts";

import { getScore } from "../../services/api";

const Score = ({ dataSource }) => {
  const [score, setScore] = useState([]);

  const getData = async () => {
    const data = await getScore(dataSource);

    const formattedScore = [
      { name: "Score", value: data.todayScore || data.score, fill: "#ff0000" },
    ];

    setScore(formattedScore);
  };

  useEffect(() => {
    getData();
  }, [dataSource]);

  return (
    <RadialBarChart
    width={258}
    height={258}
    cx="50%"
    cy="50%"
    innerRadius="80%"
    outerRadius="100%"
    barSize={10}
    data={score}
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
      background
      clockWise
      dataKey="value"
      cornerRadius={5}
    />
  </RadialBarChart>
  );
};

export default Score;
