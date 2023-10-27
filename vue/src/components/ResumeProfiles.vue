<script setup lang="ts">
import { useResumeStore } from '@/stores';
const resumeStore = useResumeStore();
</script>

<template>
  <li class="text-info" v-for="profile in resumeStore.basics.profiles" :key="profile.network">
    <a :href="profile.url">
      <v-icon :name="profile.icon['vue']" />
      {{ profile.network }}
    </a>
  </li>
</template>
