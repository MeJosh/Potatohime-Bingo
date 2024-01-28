<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <header class="header">
      <nav class="nav">
        <RouterLink to="/" class="nav-link">Bingo Board</RouterLink>
        <RouterLink to="/bonus" class="nav-link">Bonus Points</RouterLink>
        <RouterLink to="/rules" class="nav-link">Rules</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
@import './assets/css/osrs-font.css';
.container {
  background-image: url('@/assets/images/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
}

.header {
  background-color: black;
  opacity: 0.7;;
  text-align: center;
  padding: 10px 0;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}

.nav-link {
  text-decoration: none;
  color: yellow; /* Change to your desired link color */
  padding: 10px 20px; /* Adjust padding as needed */
  transition: background-color 0.3s ease;
  font-family: "runescape_uf";
  font-size: 1.5rem;
}
</style>
