import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ReferenceArea,
} from "recharts";

import { getAverageSessions } from "../../services/api";

const AverageSessions = ({ dataSource }) => {
  const [sessions, setSessions] = useState([]);
  const [maxSessionLength, setMaxSessionLength] = useState(0);
  const [minSessionLength, setMinSessionLength] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  

  const getData = async () => {
    const data = await getAverageSessions(dataSource);

    const maxSessionLength = Math.max(...data.map((session) => session.sessionLength));
    const minSessionLength = Math.min(...data.map((session) => session.sessionLength));

    setMinSessionLength(minSessionLength - 20);
    setMaxSessionLength(maxSessionLength + 20);

    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    
    const formattedSessions = data.map((session, index) => ({
      day: days[index],
      sessionLength: session.sessionLength,
      index,
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
  
  const handleMouseMove = (state) => {
    if (state && state.activeTooltipIndex !== undefined) {
      setHoverIndex(state.activeTooltipIndex);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div className='relative -left-[6px] -top-[6px]'>
      <ResponsiveContainer width={268} height={273}>
        <LineChart data={sessions}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Line
            dataKey="sessionLength"
            type="monotone"
            stroke="#fff"
            strokeWidth={2}
            dot={false}
            activeDot={{ stroke: 'rgba(255,255,255,0.4)', strokeWidth: 12, r: 4 }}
          />
          <XAxis  hide={true} dataKey="day" />
          <YAxis hide={true} domain={[minSessionLength, maxSessionLength]} />
          { hoverIndex !== null && (
            <ReferenceArea
              x1={sessions[hoverIndex]?.index}
              x2={sessions[sessions.length - 1]?.index}
              fill="black"
              opacity={0.2}
            />
          ) }
        </LineChart>
      </ResponsiveContainer>
      <div className='absolute top-[24px] left-[24px] text-[15px] text-[#fff] opacity-70'>
        <div>Durée moyenne des</div>
        <div>sessions</div>
      </div>
      <ul className='relative bottom-12 flex justify-between text-[#fff] opacity-70 pl-4 pr-2'>
        <li>L</li>
        <li>M</li>
        <li>M</li>
        <li>J</li>
        <li>V</li>
        <li>S</li>
        <li>D</li>
      </ul>
    </div>
  );
};

export default AverageSessions;
