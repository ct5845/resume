<script setup lang="ts">
import { routes, type Route } from '@/router';
import { RouterLink } from 'vue-router';
import ResumeProfiles from './ResumeProfiles.vue';
import { computed } from 'vue';

const props = defineProps<{ hide?: Route[] }>();

const filteredRoutes = computed(() => {
  return routes.filter(
    (route) => !(props.hide ?? []).find((hideRoute) => hideRoute.name === route.name)
  );
});
</script>

<template>
  <ul>
    <template v-for="route in filteredRoutes" :key="route.name">
      <li>
        <RouterLink v-slot="{ isActive }" :to="route.path" active-class="ring-2 ring-primary">
          <div
            v-if="route.iconClass"
            class="w-4 h-4 mx-1"
            :class="[isActive ? 'bg-primary' : 'bg-neutral', route.iconClass]"></div>
          <v-icon v-if="route.icon" :name="route.icon" />
          <span :class="{ 'text-primary': isActive }">{{ route.name }}</span>
        </RouterLink>
      </li>
    </template>
    <div class="divider"></div>
    <ResumeProfiles />
  </ul>
</template>
