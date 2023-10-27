<script setup lang="ts">
import SetTheme from './SetTheme.vue';
defineProps(['sideNavId']);
</script>

<template>
  <header class="flex-shrink-0 flex flex-row align-items-center p-2">
    <label :for="sideNavId" class="btn btn-circle btn-ghost">
      <v-icon name="md-menu" />
    </label>
    <div class="flex-1"></div>
    <SetTheme />
    <a
      href="https://github.com/ct5845/resume"
      class="btn ml-2 btn-circle btn-secondary btn-outline">
      <v-icon class="h-6 w-6" name="bi-github"></v-icon>
    </a>
  </header>
</template>
