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

    const formattedPerformances = data.data.map(performance => {
      const subject = data.kind[performance.kind];
      let formattedSubject;

      switch (subject) {
        case "cardio":
          formattedSubject = "Cardio";
          break;
        case "energy":
          formattedSubject = "Energie";
          break;
        case "endurance":
          formattedSubject = "Endurance";
          break;
        case "strength":
          formattedSubject = "Force";
          break;
        case "speed":
          formattedSubject = "Vitesse";
          break;
        default:
          formattedSubject = "Inconnu";
          break;
      }
      
      return {
        subject: formattedSubject,
        value: performance.value,
        fullMark: 300,
      };
      }
    );

    setPerformances(formattedPerformances);
  };

  useEffect(() => {
    getData();
  }, [dataSource]);

  return (
    <RadarChart width={258} height={258} data={performances}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <Radar dataKey="value" fill="#ff0101" fillOpacity={0.7} />
    </RadarChart>
  );
};

export default Performances;
