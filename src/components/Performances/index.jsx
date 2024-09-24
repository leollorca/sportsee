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
      let order;
      let formattedSubject;

      switch (subject) {
        case "intensity":
          order = 1;
          formattedSubject = "Intensité";
          break;
        case "speed":
          order = 2;
          formattedSubject = "Vitesse";
          break;
        case "strength":
          order = 3;
          formattedSubject = "Force";
          break;
        case "endurance":
          order = 4;
          formattedSubject = "Endurance";
          break;
        case "energy":
          order = 5;
          formattedSubject = "Energie";
          break;
        case "cardio":
          order = 6;
          formattedSubject = "Cardio";
          break;
        default:
          formattedSubject = "Inconnu";
          break;
      }
      
      return {
        order,
        subject: formattedSubject,
        value: performance.value,
        fullMark: 300,
      };
      }
    );

    setPerformances(formattedPerformances.sort((a, b) => a.order - b.order));
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
