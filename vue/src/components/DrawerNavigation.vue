<script setup lang="ts">
import { routes } from '@/router';
import NavigationItems from './NavigationItems.vue';
</script>

<template>
  <NavigationItems :routes="routes" />
</template>
