<template>
  <div class="grid-container">
    <div v-if="isDataLoaded" class="bonus-board-container">
      <div class="team-title"> {{ teamName }} Bonus Points</div>
      <div class="controls">
        <div class="buttons">
          <button class="button is-link" @click="goToTeamsList">Team List</button>
          <button class="button is-link" @click="goToLeaderboard">Leaderboard</button>
        </div>
      </div>
      <div class="info">
        <div class="total-points">
          Total Bonus Points Earned: <span class="item-points">{{ totalBonusPoints }}pts</span>
        </div>
        <div class="message">
          The bonus items only give points once per item (per team) good luck!</div>
        </div>
      <table class="table">
        <tbody>
          <tr v-for="item in bonuses" :key="item.id" :class="{completed: item.progress >= 1}">
            <td>
              <img src="@/assets/images/check_green.png" v-if="item.progress >= 1" alt="Green Check" class="checkmark" />
              <img :src="getImageUrl(item.image)" alt="Tile Image" class="icon-layer" />
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.desc }}</td>
            <td class="item-points">{{ item.value }}pt</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!isDataLoaded" class="loading">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useTeamStore } from "@/stores/teams";

export default {
  methods: {
    getImageUrl(imageName: string) {
      return new URL(`../assets/images/bonus_items/${imageName}`, import.meta.url).href;
    },
    goToLeaderboard() {
      this.$router.push("/leaderboard");
    },
    goToTeamsList() {
      this.$router.push("/");
    }
  },
  computed: {
    isDataLoaded() {
      return useTeamStore().loaded;
    },
    teamId() {
      return this.$route.params.teamId;
    },
    teamName() {
      const teamId = this.$route.params.teamId;
      if (teamId == null) {
        return "";
      } else {
        for (const team of useTeamStore().teams) {
          console.log(useTeamStore().teams);
          console.log(teamId + " vs " + team.id);
          if (team.id == parseInt(teamId as string)) {
            return team.name;
          }
        }
      }
      return "";
    },
    bonuses() {
      if (this.teamId == null) {
        return [];
      }
      
      const teamStore = useTeamStore();
      const teamId = parseInt(this.teamId as string);
      if (teamStore.teamBonuses.length >= teamId - 1) {
        const board = teamStore.teamBonuses[teamId - 1];
        return board;
      }

      return [];
    },
    totalBonusPoints() {
      let result = 0;
      for (const bonus of this.bonuses) {
        if (bonus.progress >= 1) {
          result += bonus.value;
        }
      }
      return result;
    }
  },
};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px;
}

.bonus-board-container {
  text-align: center;
  margin: 10px;
}

.team-title {
  font-size: 3em;
  color: white;
}

.buttons {
  margin-top: 10px;
}

.table {
  margin-top: 20px;
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
  border: 2px solid black;
}

.loading {
  color: white;
}

.table td {
  padding: 10px; /* Adjust padding as needed for spacing */
  vertical-align: middle; /* Center content vertically within table cells */
}

.total-points {
  font-size: 2em;
  color: black;
}

.completed {
  background: lightgreen
}

@media screen and (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    justify-content: center;
    text-align: center;
  }

  .tile-details-container {
    margin: 0 auto;
  }
}

img {
  height: 60px;
}

.info {
  background-color: #f5f5f5;
  border: 2px solid black;
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.item-points {
  font-size: 2rem;
  font-weight: bold;
}

.checkmark {
  height: 40px;
  margin-right: 10px;
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
</style>