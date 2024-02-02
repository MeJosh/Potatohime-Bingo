<template>
  <div class="bingo-board">
    <div class="bingo-grid">
      <div
        class="bingo-tile"
        v-for="(tile, index) in board"
        :key="index"
      >
        <BingoTile
          :id="tile.id"
          :progress_pvm="tile.progress_pvm"
          :progress_skilling="tile.progress_skilling"
          :title_pvm="tile.title_pvm"
          :title_skilling="tile.title_skilling"
          :imagePath="tile.image"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BingoTile from '@/components/BingoTile.vue';
import { useTeamStore } from '@/stores/teams';
import { type PropType } from 'vue';

export default {
  props: {
    teamId: String as PropType<string>,
  },
  components: {
    BingoTile,
  },
  computed: {
    board() {
      if (this.teamId == null) {
        return [];
      }
      
      const teamStore = useTeamStore();
      const teamId = parseInt(this.teamId);
      if (teamStore.teamBoards.length >= teamId - 1) {
        const board = teamStore.teamBoards[teamId - 1];
        return board;
      }

      return [];
    }
  },
  methods: {}
};
</script>

<style scoped>

.bingo-board {
  padding: 20px;
  background-color: rgba(100, 100, 100, 0.5);
  border: 1px solid black;
  border-radius: 2em;
}
.bingo-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

</style>
