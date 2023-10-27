<script setup lang="ts">
import type { Education } from '@/core';
defineProps<{ experience: Education }>();
</script>

<template>
  <h3 class="text-xl text-primary">{{ experience.institution }}</h3>
  <h4 class="text-lg">
    <span>{{ experience.studyType }}</span>
  </h4>
</template>
