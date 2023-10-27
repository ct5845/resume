<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppNavigation from './components/AppNavigation.vue';
</script>

<template>
  <div class="drawer h-full w-full">
    <input id="side-nav-open" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <AppHeader side-nav-id="side-nav-open" class="flex-shrink-0" />
      <RouterView class="flex-1" />
    </div>
    <div class="drawer-side">
      <label for="side-nav-open" aria-label="close sidebar" class="drawer-overlay"></label>
      <AppNavigation class="h-full shadow-2xl bg-base-100" />
    </div>
  </div>
</template>
