<script setup lang="ts">
import { useResumeStore } from '@/stores';
const store = useResumeStore();
</script>

<template>
  <h2 class="text-5xl m-2 max-w-prose font-extrabold tracking-tighter">Interests</h2>
  <ul class="p-2">
    <li v-for="interest in store.interests" :key="interest.name">
      <h3 class="text-2xl mb-2 font-bold">{{ interest.name }}</h3>
      <ul>
        <li v-for="item in interest.keywords" :key="item">
          <p class="mb-2 max-w-prose" v-html="item"></p>
        </li>
      </ul>
    </li>
  </ul>
</template>
