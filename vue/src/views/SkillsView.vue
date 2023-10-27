<script setup lang="ts">
import { useResumeStore } from '@/stores';
const store = useResumeStore();
</script>

<template>
  <h2 class="text-5xl m-2 max-w-prose font-extrabold tracking-tighter">Skills</h2>
  <ul class="p-2 max-w-prose">
    <div class="divider">Languages</div>
    <li v-for="skill in store.skills.languages.primary" :key="skill">
      <span class="badge badge-lg mb-1 text-lg font-semibold badge-secondary">{{ skill }}</span>
    </li>
    <div class="flex flex-row flex-wrap">
      <li v-for="skill in store.skills.languages.secondary" :key="skill">
        <span class="badge badge-neutral mr-2">{{ skill }}</span>
      </li>
      <li v-for="skill in store.skills.languages.tertiary" :key="skill">
        <span class="badge badge-sm badge-ghost mr-2">{{ skill }}</span>
      </li>
    </div>
    <div class="divider">Frameworks</div>
    <li v-for="skill in store.skills.frameworks.primary" :key="skill">
      <span class="badge badge-lg mb-1 text-lg font-semibold badge-accent">{{ skill }}</span>
    </li>
    <div class="flex flex-row flex-wrap">
      <li v-for="skill in store.skills.frameworks.secondary" :key="skill">
        <span class="badge badge-neutral mr-2">{{ skill }}</span>
      </li>
      <li v-for="skill in store.skills.frameworks.tertiary" :key="skill">
        <span class="badge badge-sm badge-ghost mr-2">{{ skill }}</span>
      </li>
    </div>
    <div class="divider">Tools/Other</div>
    <div class="flex flex-row flex-wrap">
      <li v-for="skill in store.skills.tools.primary" :key="skill">
        <span class="badge badge-neutral mr-2">{{ skill }}</span>
      </li>
      <li v-for="skill in store.skills.tools.secondary" :key="skill">
        <span class="badge badge-neutral mr-2">{{ skill }}</span>
      </li>
    </div>
  </ul>
</template>
