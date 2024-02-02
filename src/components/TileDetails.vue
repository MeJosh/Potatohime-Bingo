<template>
<div v-if="selectedId != null" class="tile-details">
  <div class="tile-progress">
    <img :src="getImageUrl()" alt="Tile Image" class="icon-layer" />
    </div>

    <div class="tile-pvm">
      <div class="title-section">
        <p>{{ selectedTile?.title_pvm }}</p>
        <img src="@/assets/images/check_green.png" v-if="selectedTile?.progress_pvm >= 1" alt="Green Check" class="checkmark" />
      </div>
      
      <div class="details-section">
        <p>{{ selectedTile?.desc_pvm }}</p>
      </div>
    </div>
    
    <div class="tile-skill">
      <div class="title-section">
        <p>{{ selectedTile?.title_skilling }}</p>
        <img src="@/assets/images/check_green.png" v-if="selectedTile?.progress_skilling >= 1" alt="Green Check" class="checkmark" />
      </div>

      <div class="details-section">
        <p>{{ selectedTile?.desc_skilling }}</p>
      </div>
    </div>
</div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useSelectedTileStore } from '@/stores/selectedTile';
import { useTeamStore } from '@/stores/teams';
import { type PropType } from 'vue';


  
export default defineComponent({
  props: {
    teamId: String as PropType<string>,
  },
  computed: {
    selectedId(): number | null {
      const selectedTileStore = useSelectedTileStore();
      return selectedTileStore.selectedId;
    },
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
    },
    selectedTile(): any | null {
      if (this.selectedId !== null) {
        for(const tile of this.board) {
          if (tile.id == this.selectedId) {
            return tile;
          }
        }
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
      console.log(this.selectedTile)
      if (this.selectedTile?.image == null) {
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
  padding: 20px;
  background-color: rgba(100, 100, 100, 0.5);
  border: 1px solid black;
  border-radius: 2em;
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
  display: flex;
}

.details-section {
  text-align: center;
}

.checkmark {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
</style>
  