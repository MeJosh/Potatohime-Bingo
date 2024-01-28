import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSelectedTileStore = defineStore('selectedTile', () => {
  const selectedId = ref(null);

  function setSelectedId(id: any) {
    selectedId.value = id;
  }

  return {
    selectedId,
    setSelectedId,
  };
});
