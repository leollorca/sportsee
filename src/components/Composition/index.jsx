import { useState, useEffect } from 'react';

import { getComposition } from "../../services/api";

import calories from "../../assets/calories.svg";
import protein from "../../assets/protein.svg";
import carbs from "../../assets/carbs.svg";
import fat from "../../assets/fat.svg";

const Composition = ({ dataSource }) => {
const [composition, setComposition] = useState([]);

  const getData = async () => {
    const data = await getComposition(dataSource);
    setComposition(data);
  };

  useEffect(() => {
    getData();
  }, [dataSource]);

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center w-[258px] h-[130.75px] p-[30px] rounded-[5px] bg-[#fbfbfb]">
        <div className="flex items-center">
          <img
            src={calories}
            className="mr-[30px]"
          />
          <div className="flex flex-col gap-[2px]">
          <span className="text-[20px] font-bold">{composition.calorieCount}kCal</span>
            <span className="text-[14px] text-[#74798C]">Calories</span>
          </div>
        </div>
      </div>
      <div className="flex items-center w-[258px] h-[130.75px] p-[30px] rounded-[5px] bg-[#fbfbfb]">
        <div className="flex items-center">
          <img 
            src={protein}
            className="mr-[30px]"
          />
          <div className="flex flex-col gap-[2px]">
            <span className="text-[20px] font-bold">{composition.proteinCount}g</span>
            <span className="text-[14px] text-[#74798C]">Proteines</span>
          </div>
        </div>
      </div>
      <div className="flex items-center w-[258px] h-[130.75px] p-[30px] rounded-[5px] bg-[#fbfbfb]">
        <div className="flex items-center">
          <img 
            src={carbs}
            className="mr-[30px]"
          />
          <div className="flex flex-col gap-[2px]">
          <span className="text-[20px] font-bold">{composition.carbohydrateCount}g</span>
            <span className="text-[14px] text-[#74798C]">Glucides</span>
          </div>
        </div>
      </div>
      <div className="flex items-center w-[258px] h-[130.75px] p-[30px] rounded-[5px] bg-[#fbfbfb]">
        <div className="flex items-center">
          <img 
            src={fat}
            className="mr-[30px]"
          />
          <div className="flex flex-col gap-[2px]">
            <span className="text-[20px] font-bold">{composition.lipidCount}g</span>
            <span className="text-[14px] text-[#74798C]">Lipides</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Composition;
