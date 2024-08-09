import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { getActivity } from "../../services/api";

const DailyActivity = ({ dataSource }) => {
  const [sessions, setSessions] = useState([]);

  const getData = async () => {
    const data = await getActivity(dataSource);

    const formattedActivity = data.map((session, i) => ({
      name: i + 1,
      kgs: session.kilogram,
      cals: session.calories,
    }));

    setSessions(formattedActivity);
  };

  useEffect(() => {
    getData();
  }, [dataSource]);

  return (
    <BarChart width={730} height={250} data={sessions}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="kgs" fill="#282D30" round={20}/>
      <Bar dataKey="cals" fill="#E60000" />
    </BarChart>
  );
};

export default DailyActivity;
