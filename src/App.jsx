import { useState, useEffect } from 'react';

import { getUsername } from "./services/api";

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DailyActivity from './components/DailyActivity';
import Performances from './components/Performances';
import Score from './components/Score';
import AverageSessions from './components/AverageSessions';
import Composition from './components/Composition';
import DataRadio from './components/DataRadio';

const App = () => {
  const [dataSource, setDataSource] = useState("api");
  const [username, setUsername] = useState([]);

  const getData = async () => {
    const data = await getUsername(dataSource);

    setUsername(data);
  };

  useEffect(() => {
    getData();
  }, [dataSource]);

  return (
    <>
    <Header />
    <Sidebar />
    <div className="pl-[256px]">
      <h1 className="pt-[128px] text-[48px] leading-none">
        Bonjour <span className="text-[#ff0101]">{username}</span>
      </h1>
      <p className="mt-8 mb-16 text-[18px]">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <div className="flex gap-[30px]">
        <div className='inline-flex flex-col gap-[30px]'>
          <div className='flex justify-center items-center w-[835px] h-[320px] p-2 rounded-[5px] bg-[#fbfbfb]'>
            <DailyActivity dataSource={dataSource} />
          </div>
          <div className="flex justify-between">
            <div className='w-[258px] h-[263px] rounded-[5px] bg-[#FF0000]'>
              <AverageSessions dataSource={dataSource} />
            </div>
            <div className='w-[258px] h-[263px] p-2 rounded-[5px] bg-[#282d30]'>
              <Performances dataSource={dataSource} />
            </div>
            <div className='w-[258px] h-[263px] rounded-[5px] bg-[#fbfbfb]'>
              <Score dataSource={dataSource} />
            </div>
          </div>
        </div>
        <Composition dataSource={dataSource} />
      </div>
    </div>
    <DataRadio setDataSource={setDataSource} />
    </>
  );
}

export default App;
