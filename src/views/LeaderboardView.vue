<template>
<div class="leaderboard-container">
  <div v-if="isDataLoading" class="loading">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
  <div v-else class="data-container">
    <div class="team-graph">
      <div class="header">
        <div class="title">
          Potatohime's BINGOOOOOOO Event!
        </div>
        <div class="buttons">
          <button class="button is-link" @click="goToTeamsList">Team List</button>
          <button class="button is-link" @click="goToLeaderboard">Leaderboard</button>
        </div>
      </div>
      <!-- <div class="title">Potatohime's BINGOOOOOOO Event!</div>
        <div class="buttons">
          <button class="button is-success" @click="goToLeaderboard">Leaderboard</button>
          <button class="button is-success" @click="toToTeamList">Team List</button>
        </div>
      </div> -->
      <LeaderboardGraph />
    </div>
    <!-- <div class="gap"></div> -->
    <!-- <div class="team-table">
      <table class="table">
        <thead>
          <tr>
            <th class="header">Name</th>
            <th class="header">Points</th>
            <th class="header">Members</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in teams" :key="team.id">
            <td>{{ team.name }}</td>
            <td>{{ team.points }}</td>
            <td>{{ team.members.join(", ") }}</td>
            <td>
              <div class="buttons">
                <button class="button is-info" @click="selectTeamBoard(team.id)">Board</button>
                <button class="button is-info" @click="selectTeamBonuses(team.id)">Bonuses</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</div>
</template>

<script>
import LeaderboardGraph from '@/components/LeaderboardGraph.vue';
import { useTeamStore } from "@/stores/teams";

export default {
  components: {
    LeaderboardGraph,
  },
  data() {
    return {
      //isLoading: true,
    };
  },
  mounted() {
    //this.loadTeamData();
  },
  computed: {
    teams() {
      return useTeamStore().teams;
    },
    isDataLoading() {
      return !useTeamStore().loaded;
    }
  },
  methods: {
    selectTeamBoard(teamId) {
      this.$router.push(`/boards/${teamId}`);
    },
    selectTeamBonuses(teamId) {
      this.$router.push(`/bonuses/${teamId}`);
    },
    goToLeaderboard() {
      this.$router.push("/leaderboard");
    },
    goToTeamsList() {
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.leaderboard-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  min-height: 100vh; /* Ensures the container takes at least the viewport height */
  background-color: transparent;
}

.header {
  text-align: center;
}

.buttons {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  text-align: center;
  font-size: 4em;
  color: white;
}

.loading {
  font-size: 24px;
  text-align: center;
  /* Center horizontally and vertically within the container */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  color: white;
}

.team-graph {
  width: calc(100vw - 100px);
  padding-top: 50px;
}

.data-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
}

.gap {
  height: 20px; /* Adjust the gap height as needed */
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top: 4px solid #3498db; /* Adjust the spinner color as needed */
  border-radius: 50%;
  animation: spin 1s linear infinite; /* CSS animation for spinning */
  margin-bottom: 10px; /* Adjust the margin as needed to create space between spinner and text */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.team-table {
  text-align: center; /* Center table content horizontally */
}

table {
  border-collapse: collapse; /* Ensure borders between table cells */
  width: 100%; /* Make the table expand to its container */
}

th.header {
  font-weight: bold; /* Make headers bold */
  text-align: center; /* Center headers horizontally */
}
</style>
