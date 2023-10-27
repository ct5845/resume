<script setup lang="ts">
import { useResumeStore } from '@/stores';

const store = useResumeStore();

console.log(store.resume.value);
</script>

<template>
  <h2>Work Experience</h2>
</template>
