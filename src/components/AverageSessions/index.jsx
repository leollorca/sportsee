import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

import { getAverageSessions } from "../../services/api";

const AverageSessions = ({ dataSource }) => {
  const [sessions, setSessions] = useState([]);

  const getData = async () => {
    const data = await getAverageSessions(dataSource);

    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    
    const formattedSessions = data.map((session, index) => ({
      day: days[index],
      sessionLength: session.sessionLength,
    }));

    setSessions(formattedSessions);
  };

  useEffect(() => {
    getData();
  }, [dataSource]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2">
          <p>{`${payload[0].value} min${payload[0].value > 0 ? "s" : ""}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={263}>
      <LineChart data={sessions}>
        <Tooltip content={<CustomTooltip />} />
        <Line
          dataKey="sessionLength"
          type="monotone"
          stroke="#fff"
          strokeWidth={3}
          dot={false}
          activeDot={{ stroke: 'rgba(255,255,255,0.4)', strokeWidth: 12, r: 6 }}
        />
        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#fff', padding: '16px' }} />
        <YAxis hide={true} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AverageSessions;
