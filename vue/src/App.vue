<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { HOME_ROUTE } from './router';
import AppLayout from '@/components/AppLayout.vue';
import DrawerNavigation from '@/components/DrawerNavigation.vue';
import RouterFooter from '@/components/RouterFooter.vue';
import PermenantNavigationVue from '@/components/PermenantNavigation.vue';

const route = useRoute();
const isSplash = computed(() => {
  return route.path === HOME_ROUTE.path;
});
</script>

<template>
  <AppLayout :splash="isSplash">
    <template #header><AppHeader /></template>
    <template #main><RouterView /></template>
    <template #nav>
      <v-responsive target="md-">
        <DrawerNavigation />
      </v-responsive>
      <v-responsive target="lg+">
        <PermenantNavigationVue />
      </v-responsive>
    </template>
    <template #footer><RouterFooter /></template>
  </AppLayout>
</template>
