<template>
  <div class="team-dropdown dropdown" :class="{ 'is-active': isActive }">
    <div class="dropdown-trigger">
      <button class="button" @click="toggleDropdown">
        Select Team
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="team-dropdown-menu" role="menu">
      <div class="dropdown-content">
        <!-- List of teams goes here -->
        <a class="dropdown-item" href="#" @click="selectTeam('Team 1')">Team 1</a>
        <a class="dropdown-item" href="#" @click="selectTeam('Team 2')">Team 2</a>
        <a class="dropdown-item" href="#" @click="selectTeam('Team 3')">Team 3</a>
        <!-- Add more teams as needed -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  data() {
    return {
      isActive: false, // Initialize the dropdown as closed
    };
  },
  methods: {
    toggleDropdown() {
      this.isActive = !this.isActive; // Toggle the dropdown open/close
    },
    selectTeam(teamName: string) {
      this.isActive = false; // Close the dropdown when a team is selected
      console.log(teamName);
    },
  },
});
</script>

<style scoped>
/* You can add additional styling here if needed */
</style>
