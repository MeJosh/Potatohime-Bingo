<template>
  <div class="grid-container">
    <div class="bingo-board-container">
      <TeamDropdown />
      <BingoBoard />
    </div>
    <div class="tile-details-container">
      <TileDetails />
    </div>
  </div>
</template>

<script lang="ts">
import BingoBoard from "@/components/BingoBoard.vue";
import TileDetails from "@/components/TileDetails.vue";
import TeamDropdown from "@/components/TeamDropdown.vue";
import { useTeamStore } from "@/stores/teams";
import { useBingoBoardStore } from "@/stores/bingoBoard";


export default {
  components: {
    BingoBoard,
    TileDetails,
    TeamDropdown,
  },
  methods: {
    fetchData() {
      const teamStore = useTeamStore();
      const bingoBoardStore = useBingoBoardStore();
      bingoBoardStore.initializeBoardData();
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
</style>
@/stores/teams