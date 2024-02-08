<template>
  <div class="grid-container">
    <div v-if="isDataLoaded" class="bingo-board-container">
      <div class="team-title" v-if="isTeamBoard"> {{ teamName }} Board</div>
      <BingoBoard :teamId="teamId"/>
    </div>
    <div v-if="isDataLoaded" class="tile-details-container">
      <TileDetails :teamId="teamId"/>
    </div>
    <div v-if="!isDataLoaded" class="loading">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import BingoBoard from "@/components/BingoBoard.vue";
import TileDetails from "@/components/TileDetails.vue";
import { useTeamStore } from "@/stores/teams";
import { useBingoBoardStore } from "@/stores/bingoBoard";


export default {
  components: {
    BingoBoard,
    TileDetails,
  },
  methods: {
    fetchData() {
      const teamStore = useTeamStore();
      teamStore.fetchTeams();
      console.log(teamStore.teams);

      const bingoBoardStore = useBingoBoardStore();
      bingoBoardStore.initializeBoardData();
    }
  },
  computed: {
    isDataLoaded() {
      return useTeamStore().loaded;
    },
    isTeamBoard() {
      return this.$route.params.teamId != null;
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
    }
  },
  mounted() {
    this.fetchData();
  }
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

.bingo-board-container {
  text-align: center;
}

.loading {
  color: white;
}

.team-title {
  font-size: 3em;
  color: white;
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