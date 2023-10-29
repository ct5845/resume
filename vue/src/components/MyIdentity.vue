<script setup lang="ts">
import { useResumeStore } from '@/stores';
import { computed } from 'vue';
import { HOME_ROUTE } from '@/router';
import { RouterLink } from 'vue-router';

const resumeStore = useResumeStore();
const name = computed(() => resumeStore.basics.name.split(' '));
</script>

<template>
  <h1 class="text-6xl font-extrabold leading-[5rem]">
    <RouterLink
      :to="HOME_ROUTE.path"
      class="box-decoration-clone bg-gradient-to-r from-primary to-secondary text-white px-4">
      <template v-for="token of name" :key="token">
        {{ token }}
        <br />
      </template>
    </RouterLink>
  </h1>
  <h2 class="text-4xl mt-6 text-secondary-focus font-bold tracking-wide">
    {{ resumeStore.basics.label }}
  </h2>
  <p class="mt-2 font-medium">
    <span>{{ resumeStore.basics.location.city }}</span>
    <span class="mx-2">•</span>
    <v-icon :name="resumeStore.basics.location.icon['vue']" class="mr-2" />
    <span>{{ resumeStore.basics.location.countryCode }}</span>
  </p>
</template>
