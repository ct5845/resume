<script setup lang="ts">
import { HOME_ROUTE, routes } from '@/router';
import NavigationItems from './NavigationItems.vue';
import { computed } from 'vue';
import MyIdentity from './MyIdentity.vue';

const routesWithoutHome = computed(() => routes.filter((route) => route.path !== HOME_ROUTE.path));
</script>

<template>
  <header class="px-2 pb-2">
    <MyIdentity />
  </header>
  <div class="divider"></div>
  <NavigationItems :routes="routesWithoutHome" />
</template>
