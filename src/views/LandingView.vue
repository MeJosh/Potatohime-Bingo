<template>
  <div class="landing-container">
    <div class="left-column">
      <div class="column-content"></div>
    </div>
    <div class="center-column">
      <div class="column-content">
        <BingoBoard />
      </div>
    </div>
    <div class="right-column">
      <div class="column-content">
        <TileDetails />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BingoBoard from '@/components/BingoBoard.vue';
import TileDetails from '@/components/TileDetails.vue';

export default {
  components: {
    BingoBoard,
    TileDetails,
  },
};
</script>

<style>
.landing-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.left-column,
.center-column,
.right-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.left-column {
  width: 10px;
  max-width: 10px;
}

.right-column {
  min-width: 400px;
}

.center-column {
  flex-grow: 1;
}

.column-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
