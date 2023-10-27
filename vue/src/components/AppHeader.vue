<script setup lang="ts">
import SetTheme from './SetTheme.vue';
import ResumeProfiles from './ResumeProfiles.vue';
import { RouterLink } from 'vue-router';
import MyLogo from './MyLogo.vue';
defineProps(['sideNavId']);
</script>

<template>
  <header class="flex-shrink-0 flex flex-row items-center p-2">
    <v-responsive target="md-" class="flex flex-row items-center">
      <label :for="sideNavId" tabIndex="{0}" class="btn btn-circle btn-ghost">
        <v-icon name="md-menu" />
      </label>
    </v-responsive>
    <RouterLink to="/">
      <MyLogo class="w-10 h-10" />
    </RouterLink>
    <div class="flex-1"></div>
    <SetTheme />
    <div class="dropdown dropdown-end ml-2">
      <label tabIndex="{0}" class="btn btn-primary shadow">
        <v-icon name="md-contactpage" />
        <span>Contact</span>
      </label>
      <ul
        tabIndex="{0}"
        class="menu menu-lg dropdown-content rounded-box bg-base-200 z-10 p-2 mt-2 shadow-md">
        <ResumeProfiles />
      </ul>
    </div>
  </header>
</template>
