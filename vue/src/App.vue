<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppNavigation from './components/AppNavigation.vue';
import AppNavigationLarge from './components/AppNavigationLarge.vue';
import AppFooter from './components/AppFooter.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { HOME_ROUTE } from './router';

const route = useRoute();
const drawerAlwaysOpen = computed(() => {
  return route.path !== HOME_ROUTE.path;
});
const alignMainContent = computed(() => {
  return route.path === HOME_ROUTE.path ? 'lg:self-center' : 'lg:self-stretch';
});
const alignFooter = computed(() => {
  return route.path === HOME_ROUTE.path ? 'lg:self-center' : 'lg:self-start';
});
</script>

<template>
  <AppHeader side-nav-id="side-nav-open" />
  <div :class="{ 'lg:drawer-open': drawerAlwaysOpen }" class="drawer h-full w-full">
    <input id="side-nav-open" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content overflow-hidden flex flex-col">
      <section
        :class="alignMainContent"
        class="flex-1 overflow-auto pb-16 sm:flex-initial sm:pb-0 w-full self-center">
        <RouterView />
      </section>
      <AppFooter
        :class="alignFooter"
        class="flex-shrink-0 absolute sm:max-w-prose sm:self-center bottom-0 left-0 w-full bg-gradient-to-t from-base-200 sm:relative sm:bg-none" />
    </div>
    <v-responsive target="md-" class="drawer-side">
      <label for="side-nav-open" aria-label="close sidebar" class="drawer-overlay"></label>
      <AppNavigation class="h-full p-2 shadow-2xl menu menu-lg bg-base-100" />
    </v-responsive>
    <v-responsive target="lg+" class="drawer-side">
      <label for="side-nav-open" aria-label="close sidebar" class="drawer-overlay"></label>
      <AppNavigationLarge />
    </v-responsive>
  </div>
</template>
