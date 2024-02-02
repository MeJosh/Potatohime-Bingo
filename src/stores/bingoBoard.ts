import { defineStore } from 'pinia';
import bingoData from '@/assets/data/bingoBoardData.json';

export const useBingoBoardStore = defineStore('bingoBoard', () => {
  const board = [] as any[];

  function setBoard(newBoard: any[]) {
    board.length = 0;
    board.push(...newBoard);
  }

  // Load data from the JSON file and initialize the board property
  function initializeBoardData() {
    setBoard(bingoData);
  }

  // Getter function to retrieve a tile by ID
  function getTileById(id: number) {
    return board.find((tile) => tile.id === id) || null;
  }

  return {
    board,
    setBoard,
    initializeBoardData,
    getTileById,
  };
});
