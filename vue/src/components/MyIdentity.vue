<script setup lang="ts">
import { useResumeStore } from '@/stores';
import { computed } from 'vue';
import { HOME_ROUTE } from '@/router';
import { RouterLink } from 'vue-router';

const resumeStore = useResumeStore();
const name = computed(() => resumeStore.basics.name.split(' '));
</script>

<template>
  <h1 class="text-6xl font-extrabold leading-[5.1rem] print:text-5xl">
    <RouterLink
      :to="HOME_ROUTE.path"
      class="box-decoration-clone bg-gradient-to-r from-primary to-secondary text-white px-4 print:px-0 print:bg-none print:text-primary">
      <template v-for="token of name" :key="token">
        {{ token }}
        <br class="print:hidden" />
      </template>
    </RouterLink>
  </h1>
  <h2 class="text-4xl mt-6 text-secondary-focus font-bold tracking-wide print:mt-2 print:text-3xl">
    {{ resumeStore.basics.role }}
  </h2>
  <p class="mt-2 font-medium print:mt-1">
    <span>{{ resumeStore.basics.location.city }}</span>
    <span class="mx-2 print:mx-1">•</span>
    <v-icon :name="resumeStore.basics.location.icon['vue']" class="mr-2 print:!hidden" />
    <span>{{ resumeStore.basics.location.countryCode }}</span>
  </p>
</template>
