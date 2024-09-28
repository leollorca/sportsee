import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../data';
import Score from './score';
import Performances from './performances';

const request = async (url) => {
  try {
    const response = 
      await fetch(`http://localhost:3000/user/12/${url || ""}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

export const getUsername = async (source) => {
  if (source === "mock") {
    const { userInfos } = USER_MAIN_DATA.find((user) => user.id === 18);

    return userInfos.firstName;
  }

  const { data } = await request();

  return data.userInfos.firstName;
};

export const getScore = async (source) => {
  if (source === "mock") {
    const data = USER_MAIN_DATA.find((user) => user.id === 18);
    const score = new Score(data);
    const formattedScore = { name: "Score", value: score.value, fill: "#ff0000" };
    
    return formattedScore;
  }
  
  const { data } = await request();
  const score = new Score(data);
  const formattedScore = { name: "Score", value: score.value, fill: "#ff0000" };
  
  return formattedScore;
};


export const getComposition = async (source) => {
  if (source === "mock") {
    const { keyData } = USER_MAIN_DATA.find((user) => user.id === 18);

    return keyData;
  }

  const { data } = await request();

  return data.keyData;
};

export const getActivity = async (source) => {
  if (source === "mock") {
    const { sessions } = USER_ACTIVITY.find((user) => user.userId === 18);
    
    return sessions;
  }

  const { data } = await request("activity");

  return data.sessions;
};

export const getAverageSessions = async (source) => {
  if (source === "mock") {
    const { sessions } = USER_AVERAGE_SESSIONS.find((user) => user.userId === 18);
    
    return sessions;
  }

  const { data } = await request("average-sessions");

  return data.sessions;
};

export const getPerformances = async (source) => {
  if (source === "mock") {
    const data = USER_PERFORMANCE.find((user) => user.userId === 18);
    const performances = new Performances(data);
    
    return performances.formatPerformances();
  }

  const { data } = await request("performance");
  const performances = new Performances(data);

  return performances.formatPerformances();
};
