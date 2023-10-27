<script setup lang="ts">
import type { Work } from '@/core';
defineProps<{ experience: Work }>();
</script>

<template>
  <h3 class="text-3xl max-w-prose text-primary font-bold">{{ experience.position }}</h3>
  <h4 class="text-2xl max-w-prose text-secondary flex flex-row justify-between">
    <span>{{ experience.name }}</span>
    <span class="text-accent">
      {{ experience.startDate }} - {{ experience.endDate ?? 'Present' }}
    </span>
  </h4>
  <ul class="my-4 pl-6 list-disc">
    <li class="max-w-prose" v-for="highlight in experience.highlights" :key="highlight">
      {{ highlight }}
    </li>
  </ul>
</template>
