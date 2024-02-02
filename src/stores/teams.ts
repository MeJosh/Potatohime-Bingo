import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTeamStore = defineStore('teams', () => {
  const BASE_URL = "http://84.198.76.61:5000/";
  
  let initialized  = false;
  const loaded = ref(false);
  
  const teams = [] as any[];
  const teamBoards = [] as any[];
  const teamBonuses = [] as any[];

  async function fetchTeams() {
    if (initialized) {
      return;
    }
    initialized = true;
    
    try {
      const response = await fetch(`${BASE_URL}/get_file_test21/`)
      const data = await response.json();
      teams.length = 0;
      teams.push(...data.teams);
    } catch (error) {
      console.error("There was a problem fetching the teams data:", error);
    }

    const teamBoardProgressURLs = [
      `${BASE_URL}/get_file_test1`,
      `${BASE_URL}/get_file_test3`,
      `${BASE_URL}/get_file_test5`,
      `${BASE_URL}/get_file_test7`,
      `${BASE_URL}/get_file_test9`,
      `${BASE_URL}/get_file_test11`,
      `${BASE_URL}/get_file_test13`,
      `${BASE_URL}/get_file_test15`,
      `${BASE_URL}/get_file_test17`,
      `${BASE_URL}/get_file_test19`,
    ];

    teamBoards.length = 0;
    for (const url of teamBoardProgressURLs) {
      console.log("Loading: " + url);
      try {
        const response = await fetch(url)
        const data = await response.json();
        teamBoards.push(data);
      } catch (error) {
        console.error(`There was a problem fetching ${url}:`, error);
      }
    }

    const teamBonusesURLs = [
      `${BASE_URL}/get_file_test2`,
      `${BASE_URL}/get_file_test4`,
      `${BASE_URL}/get_file_test6`,
      `${BASE_URL}/get_file_test8`,
      `${BASE_URL}/get_file_test10`,
      `${BASE_URL}/get_file_test12`,
      `${BASE_URL}/get_file_test14`,
      `${BASE_URL}/get_file_test16`,
      `${BASE_URL}/get_file_test18`,
      `${BASE_URL}/get_file_test20`,
    ];

    teamBonuses.length = 0;
    for (const url of teamBonusesURLs) {
      console.log("Loading: " + url);
      try {
        const response = await fetch(url)
        const data = await response.json();
        teamBonuses.push(data);
      } catch (error) {
        console.error(`There was a problem fetching ${url}:`, error);
      }
    }

    loaded.value = true;

  }

  // Automatically fetch teams when the store is accessed for the first time
  fetchTeams();

  function teamNames() {
    const result = [];
    for (const team of teams) {
      if (team?.name) {
        result.push(team.name)
      }
    }
    return result;
  }

  function highestTeamScore() {
    let result = 1;
    for (const team of teams) {
      if (team.points > result) {
        result = team.points;
      }
    }
    return result;
  }

  return {
    teams,
    teamBoards,
    teamBonuses,
    loaded,
    fetchTeams,
    teamNames,
    highestTeamScore,
  };
});
