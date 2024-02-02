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
import { useBingoBoardStore } from '@/stores/bingoBoard';

export default {
  components: {
    BingoTile,
  },
  setup() {
    const bingoBoardStore = useBingoBoardStore();

    // Use a computed property to get the board data
    const board = bingoBoardStore.board;
    bingoBoardStore.initializeBoardData();

    return {
      board,
    };
  },
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
