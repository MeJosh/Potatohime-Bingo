import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTeamStore = defineStore('teams', () => {
  const BACKUP_URL = "http://84.198.76.61:5000";
  const BASE_URL = "https://codingosrsbot.duckdns.org";
  
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
      const response = await fetch(`${BASE_URL}/get_file21/`)
      const data = await response.json();
      teams.length = 0;
      teams.push(...data.teams);
    } catch (error) {
      console.error("There was a problem fetching the teams data:", error);
      console.log("Attemping backup load!");
      const response = await fetch(`${BACKUP_URL}/get_file21/`)
      const data = await response.json();
      console.log(data)
      teams.length = 0;
      teams.push(...data.teams);
    }

    const teamBoardProgressURLs = [
      `${BASE_URL}/get_file1`,
      `${BASE_URL}/get_file3`,
      `${BASE_URL}/get_file5`,
      `${BASE_URL}/get_file7`,
      `${BASE_URL}/get_file9`,
      `${BASE_URL}/get_file11`,
      `${BASE_URL}/get_file13`,
      `${BASE_URL}/get_file15`,
      `${BASE_URL}/get_file17`,
      `${BASE_URL}/get_file19`,
    ];

    teamBoards.length = 0;
    for (let url of teamBoardProgressURLs) {
      console.log("Loading: " + url);
      try {
        const response = await fetch(url)
        const data = await response.json();
        teamBoards.push(data);
      } catch (error) {
        console.error(`There was a problem fetching ${url}:`, error);
        url = url.replace(BASE_URL, BACKUP_URL);
        console.log("Attemping backup load: " + url);
        const response = await fetch(url)
        const data = await response.json();
        teamBoards.push(data);
      }
    }

    const teamBonusesURLs = [
      `${BASE_URL}/get_file2`,
      `${BASE_URL}/get_file4`,
      `${BASE_URL}/get_file6`,
      `${BASE_URL}/get_file8`,
      `${BASE_URL}/get_file10`,
      `${BASE_URL}/get_file12`,
      `${BASE_URL}/get_file14`,
      `${BASE_URL}/get_file16`,
      `${BASE_URL}/get_file18`,
      `${BASE_URL}/get_file20`,
    ];

    teamBonuses.length = 0;
    for (let url of teamBonusesURLs) {
      console.log("Loading: " + url);
      try {
        const response = await fetch(url)
        const data = await response.json();
        teamBonuses.push(data);
      } catch (error) {
        console.error(`There was a problem fetching ${url}:`, error);
        url = url.replace(BASE_URL, BACKUP_URL);
        console.log("Attemping backup load: " + url);
        const response = await fetch(url)
        const data = await response.json();
        teamBonuses.push(data);
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
