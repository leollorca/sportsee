class Score {
  constructor(data) {
    this.value = data.todayScore || data.score;
  }
}

export default Score;