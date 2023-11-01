<script setup lang="ts">
import ResumeProfiles from './ResumeProfiles.vue';
import { type Route } from '@/router';
defineProps<{ routes: Route[] }>();
</script>

<template>
  <ul class="menu menu-lg">
    <template v-for="(route, index) in routes" :key="route.name">
      <li>
        <RouterLink v-slot="{ isActive }" :to="route.path" active-class="ring-2 ring-primary">
          <div
            v-if="route.iconClass"
            class="w-4 h-4 mx-1"
            :class="[isActive ? 'bg-primary' : 'bg-neutral', route.iconClass]"></div>
          <v-icon v-if="route.icon" :name="route.icon" />
          <span :class="{ 'text-primary': isActive }">{{ route.name }}</span>
        </RouterLink>
        <div v-if="index === routes.length - 1" class="divider"></div>
      </li>
    </template>
    <ResumeProfiles />
  </ul>
</template>
