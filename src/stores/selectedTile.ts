import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSelectedTileStore = defineStore('selectedTile', () => {
  const selectedId = ref(1);

  function setSelectedId(id: any) {
    selectedId.value = id;
  }

  return {
    selectedId,
    setSelectedId,
  };
});
