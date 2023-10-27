<script setup lang="ts">
import WorkExperience from '@/components/WorkExperience.vue';
import { useResumeStore } from '@/stores';
const store = useResumeStore();
</script>

<template>
  <h2 class="text-5xl m-2 font-extrabold tracking-tighter max-w-prose">Work Experience</h2>
  <ul class="max-w-prose p-2">
    <li v-for="experience in store.work" :key="experience.id">
      <WorkExperience :experience="experience" />
    </li>
  </ul>
</template>
