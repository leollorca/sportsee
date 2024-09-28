class Performances {
  constructor(data) {
    this.data = data;
  }

  formatPerformances() {
    const formattedPerformances = this.data.data.map(performance => {
      const subject = this.data.kind[performance.kind];
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

    return formattedPerformances.sort((a, b) => a.order - b.order);
  }
}

export default Performances;