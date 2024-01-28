<template>
<div v-if="selectedId != null" class="tile-details">
  <div class="tile-progress">
    <img :src="getImageUrl()" alt="Tile Image" class="icon-layer" />

      <!-- <p>Progress PvM: {{ selectedTile.progress_pvm }}</p>
      <p>Progress Skilling: {{ selectedTile.progress_skilling }}</p> -->
    </div>

    <div class="tile-pvm">
      <div class="title-section">
        <p>{{ selectedTile.title_pvm }}</p>
      </div>

      <div class="details-section">
        <p>{{ selectedTile.desc_pvm }}</p>
      </div>
    </div>

    <div class="tile-skill">
      <div class="title-section">
        <p>{{ selectedTile.title_skilling }}</p>
      </div>

      <div class="details-section">
        <p>{{ selectedTile.desc_skilling }}</p>
      </div>
    </div>
</div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useSelectedTileStore } from '@/stores/selectedTile';
import { useBingoBoardStore } from '@/stores/bingoBoard';

export default defineComponent({
  computed: {
    selectedId(): number | null {
      const selectedTileStore = useSelectedTileStore();
      return selectedTileStore.selectedId;
    },
    selectedTile(): any | null {
      const bingoBoardStore = useBingoBoardStore();

      if (this.selectedId !== null) {
        return bingoBoardStore.getTileById(this.selectedId);
      }

      return {
        id: null,
        progress_pvm: null,
        progress_skilling: null,
        title_pvm: null,
        title_skilling: null,
        image: null,
      };
    },
  },
  methods: {
    getImageUrl() {
      if (this.selectedTile.image == null) {
        return new URL(`../assets/images/tiles/sample.png`, import.meta.url).href;
      }
      return new URL(`../assets/images/tiles/${this.selectedTile.image}`, import.meta.url).href;
    },
  },
});
</script>
  
<style scoped>
img {
  max-width: 100%;
  max-height: 300px;
  height: auto;
}
.tile-details {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 380px;
}

.tile-progress {
  background-color: transparent;
  border: none;
}

.tile-pvm {
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid lightblue;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.tile-skill {
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid yellow;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.title-section {
  font-weight: bold;
  margin-bottom: 5px;
}

.details-section {
  text-align: center;
}
</style>
  