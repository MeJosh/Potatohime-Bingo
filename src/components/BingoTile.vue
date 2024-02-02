<template>
  <div class="bingo-tile" @click="selectTile">
    <img :src="getImageUrl(imagePath)" alt="Tile Image" class="icon-layer" />
    <div class="checkmark-container"></div>
    <img src="@/assets/images/check_green.png" v-if="showGreenCheckmark" alt="Green Check" class="checkmark" />
    <img src="@/assets/images/check_yellow.png" v-else-if="showYellowCheckmark" alt="Yellow Check" class="checkmark" />
  </div>
</template>
  
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { useSelectedTileStore } from '@/stores/selectedTile';


export default defineComponent({
  props: {
    id: Number as PropType<number>,
    progress_pvm: Number as PropType<number>,
    progress_skilling: Number as PropType<number>,
    title_pvm: String as PropType<string>,
    title_skilling: String as PropType<string>,
    imagePath: String as PropType<string>,
  },
  data() {
    return {
      foo: 1,
    };
  },
  methods: {
    getImageUrl(name: string | undefined) {
      if (name === undefined) {
        return new URL(`../assets/images/tiles/sample.png`, import.meta.url).href;
      }
      return new URL(`../assets/images/tiles/${name}`, import.meta.url).href;
    },
    selectTile() {
      const selectedTileStore = useSelectedTileStore();
      selectedTileStore.setSelectedId(this.id);
    },
  },
  computed: {
    showGreenCheckmark() {
      return (this.progress_pvm || 0) >= 1 && (this.progress_skilling || 0) >= 1;
    },
    showYellowCheckmark() {
      return (this.progress_pvm || 0) >= 1 || (this.progress_skilling || 0) >= 1; 
    }
  }
});
</script>
<style scoped>
.bingo-tile {
  text-align: center;
  cursor: pointer;
  position: relative;
}

img {
  max-width: 100%;
  max-height: 150px;
  height: auto;
}

.checkmark {
  position: absolute;
  top: 40px;
  left: 40px;
  width: 80px; /* Adjust as needed */
  height: 80px; /* Adjust as needed */
}

.title-line {
  font-weight: bold;
  margin-top: 5px;
}
</style>
  