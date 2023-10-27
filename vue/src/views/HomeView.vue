<script setup lang="ts">
import AppNavigation from '@/components/AppNavigation.vue';
import { useResumeStore } from '@/stores';
import { computed } from 'vue';
import { HOME_ROUTE } from '@/router';
import { RouterLink } from 'vue-router';

const props = defineProps(['isNavigation', 'align']);
const resumeStore = useResumeStore();
const name = computed(() => resumeStore.basics.name.split(' '));

const textAlignment = computed(() => {
  return props.align === 'left' ? 'text-left' : 'text-center';
});
const selfAlignment = computed(() => {
  return props.align === 'left' ? 'self-start' : 'self-center';
});
</script>

<template>
  <main
    class="flex-1 h-full flex flex-col align-items-center justify-center"
    :class="[{ 'sm:pt-0': isNavigation, 'sm:pt-16': !isNavigation }]">
    <h1 :class="[textAlignment]" class="text-6xl font-bold leading-none tracking-tight">
      <RouterLink
        :to="HOME_ROUTE.path"
        class="box-decoration-clone bg-gradient-to-r from-primary to-secondary text-white px-2 leading-tight">
        <template v-for="token of name" :key="token">
          {{ token }}
          <br />
        </template>
      </RouterLink>
    </h1>
    <h2 :class="[textAlignment]" class="text-4xl mt-6 text-secondary-focus font-bold tracking-wide">
      {{ resumeStore.basics.label }}
    </h2>
    <p :class="[textAlignment]" class="mt-2 font-medium">
      <span>{{ resumeStore.basics.location.city }}</span>
      <span class="mx-2">•</span>
      <v-icon :name="resumeStore.basics.location.icon['vue']" class="mr-2" />
      <span>{{ resumeStore.basics.location.countryCode }}</span>
    </p>
    <v-responsive :class="[selfAlignment]" class="mt-6" target="sm+">
      <div v-if="isNavigation" class="divider"></div>
      <AppNavigation :hide="[HOME_ROUTE]" class="menu menu-lg" />
    </v-responsive>
  </main>
</template>
