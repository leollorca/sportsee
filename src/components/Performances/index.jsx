import { useState, useEffect } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

import { getPerformances } from "../../services/api";

const Performances = ({ dataSource }) => {
  const [performances, setPerformances] = useState([]);

  const getData = async () => {
    const data = await getPerformances(dataSource);

    setPerformances(data);
  };

  useEffect(() => {
    getData();
  }, [dataSource]);
  
  return (
    <RadarChart width={248} height={238} data={performances}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#ffffff" }} />
      <Radar dataKey="value" fill="#ff0101" fillOpacity={0.7} />
    </RadarChart>
  );
};

export default Performances;
