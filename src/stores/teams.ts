import { defineStore } from 'pinia';

export const useTeamStore = defineStore('teams', () => {
  const teams = [] as any[];

  async function initialize() {
    //teams = [];
    try {
      const response = await fetch("http://localhost:5000/get_file_test21/")
      const data = await response.json();
      console.log(data);
      //teams = data;
    } catch (error) {
      console.error("There was a problem fetching the teams data:", error);
    }
  }

  function teamNames() {
    const result = [];
    for (const team of teams) {
      if (team?.name) {
        result.push(team.name)
      }
    }
  }

  return {
    teams,
    initialize,
    teamNames,
  };
});
