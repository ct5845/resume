<script setup lang="ts">
import EducationExperience from '@/components/EducationExperience.vue';
import { useResumeStore } from '@/stores';
const store = useResumeStore();
</script>

<template>
  <h2 class="text-5xl m-2 max-w-prose font-extrabold tracking-tighter">Education</h2>
  <ul class="max-w-prose">
    <li class="p-2" v-for="experience in store.education" :key="experience.startDate">
      <EducationExperience :experience="experience" />
    </li>
  </ul>
</template>
